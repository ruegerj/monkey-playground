<script lang="ts">
	import { onMount } from 'svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import Prism from 'prismjs';
	import IconPlay from 'virtual:icons/lucide/play';
	import IconLoader from 'virtual:icons/lucide/loader-circle';
	import type { PageProps } from './$types';
	import { applyAction, enhance } from '$app/forms';
	import MonkeyGrammar from '$lib/monkey/grammar';
	import { Button } from '$lib/components/ui/button';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Tooltip from '$lib/components/ui/tooltip';

	let { form, data }: PageProps = $props();
	let code = $state('');
	let isLoading = $state(false);
	let isCodeNotEmpty = $derived(code.trim().length > 0);
	let canCodeBeRan = $derived(isCodeNotEmpty && data.user != null && !isLoading);
	let runBtnTooltip = $derived(
		!data.user ? 'Sign in to run code' : !isCodeNotEmpty ? 'Write some code in order to run it' : ''
	);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let CodeJar = $state() as any; // nasty workaround due to dynamic import
	let compileCodeForm = $state<HTMLFormElement>();

	Prism.languages['monkey-lang'] = MonkeyGrammar;

	const highlight = (code: string, syntax: string) =>
		Prism.highlight(code, Prism.languages[syntax], syntax);

	const handleCompileCode: SubmitFunction = ({ formData }) => {
		if (code.trim().length <= 0) {
			return;
		}
		formData.append('code', code);
		isLoading = true;
		return async ({ result }) => {
			await applyAction(result);
			isLoading = false;
		};
	};

	onMount(async () => {
		// import component on mount since it requires a window obj to be present upon initialization (would fail for ssr)
		({ CodeJar } = await import('@novacbn/svelte-codejar'));
	});
</script>

<div class="flex h-full flex-col overflow-hidden px-4 pb-4">
	<div class="ml-auto py-2">
		<Tooltip.Root>
			<Tooltip.Trigger>
				<Button
					variant="default"
					disabled={!canCodeBeRan}
					on:click={() => compileCodeForm?.requestSubmit()}
				>
					{#if isLoading}
						<IconLoader class="spin mr-1" />
					{:else}
						<IconPlay class="mr-1" />
					{/if}
					Run
				</Button>
			</Tooltip.Trigger>
			{#if !canCodeBeRan}
				<Tooltip.Content side="bottom">
					<p>{runBtnTooltip}</p>
				</Tooltip.Content>
			{/if}
		</Tooltip.Root>
	</div>

	<div
		class="flex flex-grow flex-col space-y-3 overflow-hidden rounded-sm border md:flex-row md:space-y-0"
	>
		<div class="flex h-1/2 w-full flex-col overflow-scroll border-r p-2 md:h-full md:w-1/2">
			<h3 class="tracking-light space-y-1.5 p-2 pb-6 text-lg font-semibold leading-none">Code</h3>
			<form
				class="flex-auto cursor-text px-2"
				method="POST"
				action="?/compile"
				bind:this={compileCodeForm}
				use:enhance={handleCompileCode}
			>
				{#if CodeJar}
					<CodeJar class="h-full" bind:value={code} syntax="monkey-lang" {highlight} />
				{:else}
					<!-- in case JS is not enabled -->
					<pre><code>{code}</code></pre>
				{/if}
			</form>
		</div>
		<div class="h-1/2 w-full overflow-scroll border-l p-2 md:h-full md:w-1/2">
			<Tabs.Root value="output">
				<Tabs.List>
					<Tabs.Trigger value="output">Output</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="output">
					<div class="px-2">
						{#if form?.success}
							<pre class="whitespace-pre-wrap">{form?.result}</pre>
						{:else if form?.error}
							<p class="text-red-400">{form.error}</p>
						{:else}
							<pre
								class="whitespace-pre-wrap italic text-muted-foreground">Run code to see its output here...</pre>
						{/if}
					</div>
				</Tabs.Content>
			</Tabs.Root>
		</div>
	</div>
</div>
