<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import { Button } from '$lib/components/ui/button';
	import IconPlus from 'virtual:icons/lucide/plus';
	import type { Snippet as SvelteSnippet } from 'svelte';
	import type { Snippet } from '$lib/server/router/snippet';
	import { relativeTime } from '$lib/date';
	import { Separator } from '$lib/components/ui/separator';
	import DeleteSnippetBtn from './delete-snippet-btn.svelte';

	interface Props {
		children: SvelteSnippet<[]>;
		currentSnippetId: string | null;
		snippets: Snippet[];
	}

	let { snippets, currentSnippetId, children }: Props = $props();
	let open = $state(false);

	function close() {
		open = false;
	}
</script>

<Sheet.Root bind:open>
	<Sheet.Trigger>
		{@render children?.()}
	</Sheet.Trigger>
	<Sheet.Content class="flex flex-col" side={'left'}>
		<Sheet.Header>
			<Sheet.Title>My snippets</Sheet.Title>
		</Sheet.Header>
		{#if snippets.length}
			<div class="flex-grow overflow-y-auto">
				{#each snippets as snippet, i}
					<div
						class="flex flex-row justify-between rounded-sm px-4 py-2"
						class:bg-secondary={snippet.id === currentSnippetId}
					>
						<div>
							<Button
								variant="link"
								class="block h-auto whitespace-normal break-all px-0 py-0 text-left"
								href={'/' + snippet.id}
								onclick={close}
							>
								{snippet.name}
							</Button>
							<i class="text-sm text-muted-foreground no-underline"
								>{relativeTime(snippet.updatedAt)}</i
							>
						</div>
						<DeleteSnippetBtn snippetId={snippet.id} onDeleted={close} />
					</div>
					{#if i < snippets.length - 1}
						<Separator class="my-2" />
					{/if}
				{/each}
			</div>
		{:else}
			<div class="flex flex-grow flex-col justify-center text-center text-sm text-muted-foreground">
				<i>Wow such empty... </i>
				<span>Save your code to create your first snippet</span>
			</div>
		{/if}
		<Sheet.Footer>
			<Button href="/new" onclick={close}>
				<IconPlus />
				New
			</Button>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
