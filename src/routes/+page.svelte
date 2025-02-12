<script lang="ts">
	import Prism from 'prismjs';
	import { enhance } from '$app/forms';
	import MonkeyGrammar from '$lib/monkey/grammar';
	import GithubAuthBtn from '$lib/components/ui/github-auth-btn.svelte';
	import ThemeToggleBtn from '$lib/components/ui/theme-toggle-btn.svelte';
	import { Button } from '$lib/components/ui/button';

	import type { PageProps } from './$types';
	import { onMount } from 'svelte';

	let { data }: PageProps = $props();

	let value = $state('');
	let CodeJar = $state();

	Prism.languages['monkey-lang'] = MonkeyGrammar;

	const highlight = (code: string, syntax: string) =>
		Prism.highlight(code, Prism.languages[syntax], syntax);

	onMount(async () => {
		({ CodeJar } = await import('@novacbn/svelte-codejar'));
	});
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

<form method="POST" use:enhance>
	<textarea name="code"> </textarea>

	{#if CodeJar}
		<CodeJar bind:value syntax="monkey-lang" {highlight} />
	{:else}
		<pre><code>{value}</code></pre>
	{/if}

	<Button variant="outline" formaction="?/compile">Compile</Button>
</form>
