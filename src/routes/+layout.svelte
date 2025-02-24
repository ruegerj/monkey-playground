<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
	import { GithubAuthBtn, ThemeToggleBtn, UserMenu } from '$lib/components/custom';
	import { Button } from '$lib/components/ui/button/';
	import IconMenu from 'virtual:icons/lucide/menu';
	import { SnippetSidebar } from '$lib/components/custom/';
	import { page } from '$app/state';

	let { data, children } = $props();
	let logoutForm = $state<HTMLFormElement>();
	let signedIn = $derived(data.user != null);

	function logout() {
		logoutForm?.requestSubmit();
	}
</script>

<svelte:head>
	<title>Monkey Playground</title>
</svelte:head>

<div class="flex h-full flex-col overflow-hidden">
	<nav class="border-b">
		<div class="flex h-16 items-center px-4">
			{#if signedIn}
				<SnippetSidebar currentSnippetId={page.data?.snippet?.id} snippets={data.snippets}>
					<Button variant="ghost">
						<IconMenu />
					</Button>
				</SnippetSidebar>
			{/if}
			<h2 class="font-semi-bold ml-2 text-2xl tracking-tight">Monkey Playground</h2>
			<div class="ml-auto flex items-center space-x-4">
				<ThemeToggleBtn />
				{#if signedIn}
					<UserMenu user={data.user} {logout} />
				{:else}
					<GithubAuthBtn />
				{/if}
			</div>
		</div>
	</nav>

	<main class="flex-auto overflow-hidden">
		{@render children()}
	</main>

	<form hidden method="POST" action="/logout" bind:this={logoutForm}></form>
</div>

<ModeWatcher />
<Toaster />
