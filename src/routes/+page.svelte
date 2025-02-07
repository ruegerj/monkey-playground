<script lang="ts">
	import { enhance } from '$app/forms';
	import GithubAuthBtn from '../components/github-auth-btn.svelte';
	import { Button } from '$lib/components/ui/button';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<h1>Welcome {data.user ? data.user.username : 'anon'}</h1>

{#if !data.user}
	<GithubAuthBtn />
{/if}
{#if data.user}
	<img src={data.user.avatarUrl} alt="avatar" width="100" height="100" />

	<form method="POST" use:enhance>
		<Button variant="outline">Sign out</Button>
	</form>
{/if}
