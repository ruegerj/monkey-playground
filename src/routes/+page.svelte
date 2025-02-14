<script lang="ts">
	import { onMount } from 'svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import Prism from 'prismjs';
	import type { PageProps } from './$types';
	import { applyAction, enhance } from '$app/forms';
	import MonkeyGrammar from '$lib/monkey/grammar';
	import { Button } from '$lib/components/ui/button';

	let { form }: PageProps = $props();
	let value = $state('');
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let CodeJar = $state() as any; // nasty workaround due to dynamic import
	let compileCodeForm = $state<HTMLFormElement>();

	Prism.languages['monkey-lang'] = MonkeyGrammar;

	onMount(async () => {
		// import component on mount since it requires a window obj to be present upon initialization (would fail for ssr)
		({ CodeJar } = await import('@novacbn/svelte-codejar'));
	});

	const highlight = (code: string, syntax: string) =>
		Prism.highlight(code, Prism.languages[syntax], syntax);

	const handleCompileCode: SubmitFunction = ({ formData }) => {
		formData.append('code', value);
		return ({ result }) => applyAction(result);
	};
</script>

<form method="POST" action="?/compile" bind:this={compileCodeForm} use:enhance={handleCompileCode}>
	{#if CodeJar}
		<CodeJar bind:value syntax="monkey-lang" {highlight} />
		{#if !form?.success && form?.error}
			<p class="text-red-400">{form.error}</p>
		{/if}
	{:else}
		<!-- in case JS is not enabled -->
		<pre><code>{value}</code></pre>
	{/if}

	<Button variant="default" disabled={!value} on:click={() => compileCodeForm?.requestSubmit()}
		>Compile</Button
	>
</form>

{#if form?.success}
	<div class="mt-2">
		<pre><code>{form.result}</code></pre>
	</div>
{/if}
