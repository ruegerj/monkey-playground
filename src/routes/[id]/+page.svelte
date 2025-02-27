<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import IconPlay from 'virtual:icons/lucide/play';
	import IconLoader from 'virtual:icons/lucide/loader-circle';
	import IconSave from 'virtual:icons/lucide/save';
	import type { PageProps } from './$types';
	import { applyAction, enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { superForm } from 'sveltekit-superforms';
	import { snippetFormSchema } from './schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import { ShareSnippetBtn, RunOutput, CodeJar } from '$lib/components/custom';

	let { form, data }: PageProps = $props();
	let code = $state(data.snippet?.code ?? '');
	let isCompiling = $state(false);
	let isCodeNotEmpty = $derived(code.trim().length > 0);
	let canCodeBeRan = $derived(isCodeNotEmpty && data.user != null && !isCompiling);
	let canCodeBeEdited = $derived(!data.snippet?.id || data.user?.id === data.snippet?.userId);
	let canSnippetBeShared = $derived(data.snippet?.id != null && data.user != null);
	let runBtnTooltip = $derived(
		!data.user ? 'Sign in to run code' : !isCodeNotEmpty ? 'Write some code in order to run it' : ''
	);

	const saveForm = superForm(data.saveForm, {
		validators: zodClient(snippetFormSchema),
		resetForm: false,
		clearOnSubmit: 'errors'
	});
	const { form: formData } = saveForm;
	$effect(() => {
		if (data.saveForm) {
			code = data.saveForm.data.code;
		}
	});

	let compileCodeForm = $state<HTMLFormElement>();

	const handleCompileCode: SubmitFunction = ({ formData }) => {
		if (code.trim().length <= 0) {
			return;
		}
		formData.append('code', code);
		isCompiling = true;
		return async ({ result }) => {
			await applyAction(result);
			isCompiling = false;
		};
	};

	const handleSaveSnippet: SubmitFunction = ({ formData }) => {
		if (code.trim().length <= 0) {
			return;
		}
		formData.append('code', code);
		return async ({ result, update }) => {
			await update({ reset: false, invalidateAll: true });
			if (result.type === 'error' || result.type === 'failure') {
				toast.error('Failed to save snippet');
			}
			if (result.type === 'success' || result.type === 'redirect') {
				toast.success('Snippet saved successfully');
			}
		};
	};
</script>

<div class="flex h-full flex-col overflow-hidden px-4 pb-4">
	<div class="flew-row flex">
		{#if data.user}
			<form
				class="flex-reverse flex w-full py-2 pr-2"
				method="POST"
				action="?/saveSnippet"
				use:enhance={handleSaveSnippet}
			>
				<div class="flex flex-grow flex-col space-y-0">
					<Form.Field form={saveForm} name="name">
						<Form.Control>
							{#snippet children({ props })}
								<Input
									{...props}
									bind:value={$formData.name}
									disabled={isCompiling}
									placeholder="Give your snippet a name..."
									autocomplete="off"
									data-1p-ignore
									data-lpignore="true"
									data-protonpass-ignore="true"
								/>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field form={saveForm} name="code">
						<Form.FieldErrors />
					</Form.Field>
				</div>
				<Form.Button variant="secondary" class="ml-2" disabled={isCompiling}>
					<IconSave />
					<span class="hidden md:inline">Save</span>
				</Form.Button>
			</form>
		{/if}
		{#if canSnippetBeShared}
			<div class="py-2 pr-2">
				<ShareSnippetBtn snippet={data.snippet} />
			</div>
		{/if}
		<div class="ml-auto py-2">
			<Tooltip.Provider>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Button
							variant="default"
							disabled={!canCodeBeRan}
							data-test="code-run-btn"
							onclick={() => compileCodeForm?.requestSubmit()}
						>
							{#if isCompiling}
								<IconLoader class="spin" />
							{:else}
								<IconPlay />
							{/if}
							<span class="hidden md:inline">Run</span>
						</Button>
					</Tooltip.Trigger>
					{#if !canCodeBeRan}
						<Tooltip.Content side="bottom">
							<p>{runBtnTooltip}</p>
						</Tooltip.Content>
					{/if}
				</Tooltip.Root>
			</Tooltip.Provider>
		</div>
	</div>

	<div class="flex flex-grow flex-col gap-2 overflow-hidden md:flex-row md:space-y-0">
		<div class="flex h-1/2 w-full flex-col overflow-auto rounded-sm border p-2 md:h-full md:w-1/2">
			<h3 class="tracking-light space-y-1.5 p-2 pb-6 text-lg font-semibold leading-none">Code</h3>
			<form
				class="flex-auto cursor-text px-2"
				method="POST"
				action="?/compile"
				data-test="code-editor-form"
				bind:this={compileCodeForm}
				use:enhance={handleCompileCode}
			>
				<CodeJar class="h-full" bind:code enabled={canCodeBeEdited} />
			</form>
		</div>
		<div class="h-1/2 w-full overflow-auto rounded-sm border p-2 md:h-full md:w-1/2">
			<RunOutput
				successful={form?.success ?? false}
				error={form?.error ?? ''}
				output={form?.result ?? ''}
			/>
		</div>
	</div>
</div>
