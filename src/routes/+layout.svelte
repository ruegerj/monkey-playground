<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
	import { GithubAuthBtn, ThemeToggleBtn, UserMenu } from '$lib/components/custom';

	let { data, children } = $props();
	let logoutForm = $state<HTMLFormElement>();

	function logout() {
		logoutForm?.requestSubmit();
	}
</script>

<svelte:head>
	<title>Monkey Playground</title>
</svelte:head>

<nav class="border-b">
	<div class="flex h-16 items-center px-4">
		<h2 class="font-semi-bold text-2xl tracking-tight">Monkey Playground</h2>
		<div class="ml-auto flex items-center space-x-4">
			<ThemeToggleBtn />
			{#if data.user}
				<UserMenu user={data.user} {logout} />
			{:else}
				<GithubAuthBtn />
			{/if}
		</div>
	</div>
</nav>

<main>
	{@render children()}
</main>

<form hidden method="POST" action="/logout" bind:this={logoutForm}></form>

<ModeWatcher />
<Toaster />
