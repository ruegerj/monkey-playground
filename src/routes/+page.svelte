<script lang="ts">
	import GithubAuthBtn from '../components/github-auth-btn.svelte';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<h1>Welcome {data.user ? data.user.username : 'anon'}</h1>

{#if !data.user}
	<GithubAuthBtn />
{/if}
