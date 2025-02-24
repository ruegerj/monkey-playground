<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import { Button } from '$lib/components/ui/button';
	import IconPlus from 'virtual:icons/lucide/plus';
	import type { Snippet as SvelteSnippet } from 'svelte';
	import type { Snippet } from '$lib/server/router/snippet';
	import { formatDate } from '$lib/date';

	interface Props {
		children: SvelteSnippet<[]>;
		snippets: Snippet[];
	}

	let { snippets, children }: Props = $props();
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
		<div class="flex-grow overflow-scroll">
			{#each snippets as snippet}
				<Button variant="link" class="block" href={'/' + snippet.id} onclick={close}>
					{snippet.name}
				</Button>
			{/each}
		</div>
		<Sheet.Footer>
			<Button href="/new" onclick={close}>
				<IconPlus />
				New
			</Button>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
