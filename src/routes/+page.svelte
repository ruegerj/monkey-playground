<script lang="ts">
	import { onMount } from 'svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import Prism from 'prismjs';
	import IconPlay from 'virtual:icons/lucide/play';
	import type { PageProps } from './$types';
	import { applyAction, enhance } from '$app/forms';
	import MonkeyGrammar from '$lib/monkey/grammar';
	import { Button } from '$lib/components/ui/button';

	let { form }: PageProps = $props();
	let code = $state('');
	let codeValid = $derived(code.trim().length > 0);
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
		return ({ result }) => applyAction(result);
	};

	onMount(async () => {
		// import component on mount since it requires a window obj to be present upon initialization (would fail for ssr)
		({ CodeJar } = await import('@novacbn/svelte-codejar'));
	});
</script>

<div class="py- flex h-full flex-col overflow-hidden px-4">
	<div class="ml-auto py-2">
		<Button
			variant="default"
			disabled={!codeValid}
			on:click={() => compileCodeForm?.requestSubmit()}
		>
			<IconPlay class="mr-1" />
			Run
		</Button>
	</div>

	<div
		class="flex flex-grow flex-col space-y-3 overflow-hidden md:flex-row md:space-x-3 md:space-y-0"
	>
		<div class="h-1/2 w-full overflow-scroll border md:h-full md:w-1/2">
			<form
				method="POST"
				action="?/compile"
				bind:this={compileCodeForm}
				use:enhance={handleCompileCode}
			>
				{#if CodeJar}
					<CodeJar bind:value={code} syntax="monkey-lang" {highlight} />
					{#if !form?.success && form?.error}
						<p class="text-red-400">{form.error}</p>
					{/if}
				{:else}
					<!-- in case JS is not enabled -->
					<pre><code>{code}</code></pre>
				{/if}
			</form>
		</div>
		<div class="h-1/2 w-full overflow-scroll border md:h-full md:w-1/2">
			{#if form?.success}
				<div>
					<pre><code>{form.result}</code></pre>
				</div>
			{/if}
		</div>
	</div>
</div>
