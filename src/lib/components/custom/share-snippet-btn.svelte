<script lang="ts">
	import IconShare from 'virtual:icons/lucide/share';
	import IconCopy from 'virtual:icons/lucide/copy';
	import IconCheck from 'virtual:icons/lucide/check';
	import * as Dialog from '$lib/components/ui/dialog';
	import type { Snippet } from '$lib/server/router/snippet';
	import { Button, buttonVariants } from '../ui/button';
	import { Input } from '../ui/input';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	interface Props {
		snippet: Snippet | undefined;
	}

	const { snippet }: Props = $props();
	let shareLink = $state('');
	let showCopyInfo = $state(false);

	onMount(() => {
		shareLink = window.location.origin + '/' + snippet?.id;
	});

	async function copyLinkToClipboard() {
		showCopyInfo = false;
		await navigator.clipboard.writeText(shareLink);
		showCopyInfo = true;
		setTimeout(() => (showCopyInfo = false), 2000);
	}
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'secondary' })}>
		<IconShare />
		<span class="hidden md:inline">Share</span>
	</Dialog.Trigger>
	<Dialog.Content class="gap-2">
		<Dialog.Header>
			<Dialog.Title>Share Snippet</Dialog.Title>
			<Dialog.Description>Copy the link below for sharing the script with others</Dialog.Description
			>
		</Dialog.Header>
		<div class="flex flex-row gap-2">
			<Input readonly value={shareLink} />
			<Button onclick={copyLinkToClipboard}>
				<IconCopy />
				<span class="hidden md:inline">Copy</span>
			</Button>
		</div>
		{#if showCopyInfo}
			<i class="text-sm text-muted-foreground" transition:fade>
				Copied to clipboard
				<IconCheck class="inline" />
			</i>
		{/if}
	</Dialog.Content>
</Dialog.Root>
