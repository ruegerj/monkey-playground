<script lang="ts">
	import { onMount } from 'svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import Prism from 'prismjs';
	import type { PageProps } from './$types';
	import { applyAction, enhance } from '$app/forms';
	import MonkeyGrammar from '$lib/monkey/grammar';
	import GithubAuthBtn from '$lib/components/ui/github-auth-btn.svelte';
	import ThemeToggleBtn from '$lib/components/ui/theme-toggle-btn.svelte';
	import { Button } from '$lib/components/ui/button';

	let { data, form }: PageProps = $props();
	let value = $state('');
	let CodeJar = $state();
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

<ThemeToggleBtn />

<h1>Welcome {data.user ? data.user.username : 'anon'}</h1>

{#if data.user}
	<img src={data.user.avatarUrl} alt="avatar" width="100" height="100" />

	<form method="POST" use:enhance>
		<Button variant="outline" formaction="?/signout">Sign out</Button>
	</form>
{:else}
	<GithubAuthBtn />
{/if}

<form method="POST" action="?/compile" bind:this={compileCodeForm} use:enhance={handleCompileCode}>
	{#if CodeJar}
		<CodeJar bind:value syntax="monkey-lang" {highlight} />
	{:else}
		<!-- in case JS is not enabled -->
		<pre><code>{value}</code></pre>
	{/if}

	<Button variant="outline" on:click={() => compileCodeForm?.requestSubmit()}>Compile</Button>
</form>

{#if form?.success}
	<div class="mt-2">
		<pre><code>{form.result}</code></pre>
	</div>
{/if}
