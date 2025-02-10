<script lang="ts">
	import { enhance } from '$app/forms';
	import GithubAuthBtn from '../components/github-auth-btn.svelte';
	import { Button } from '$lib/components/ui/button';

	import type { PageProps } from './$types';
	import ThemeToggleBtn from '../components/theme-toggle-btn.svelte';

	let { data, form }: PageProps = $props();
</script>

<ThemeToggleBtn />

<h1>Welcome {data.user ? data.user.username : 'anon'}</h1>

{#if !data.user}
	<GithubAuthBtn />
{/if}
{#if data.user}
	<img src={data.user.avatarUrl} alt="avatar" width="100" height="100" />

	<form method="POST" use:enhance>
		<Button variant="outline" formaction="?/signout">Sign out</Button>
	</form>
{/if}

<form method="POST" use:enhance>
	<textarea name="code"> </textarea>

	<Button variant="outline" formaction="?/compile">Compile</Button>
</form>
