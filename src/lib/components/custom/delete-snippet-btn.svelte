<script lang="ts">
	import IconTrash from 'virtual:icons/lucide/trash';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { buttonVariants } from '../ui/button';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';

	interface Props {
		snippetId: string;
		class?: string;
		onDeleted?: () => void;
	}

	let { snippetId, class: clazz, onDeleted: onDelete }: Props = $props();
	let open = $state(false);
	let deleteForm = $state<HTMLFormElement>();

	const handleDeleteSnippet: SubmitFunction = () => {
		open = false;
		return async ({ result, update }) => {
			await update({ reset: false, invalidateAll: true });
			if (result.type === 'error' || result.type === 'failure') {
				toast.error('Failed to delete snippet');
			}
			if (result.type === 'success' || result.type === 'redirect') {
				toast.success('Snippet deleted successfully');
				onDelete?.();
			}
		};
	};
</script>

<AlertDialog.Root bind:open>
	<AlertDialog.Trigger class={buttonVariants({ variant: 'outline' }) + ' ' + clazz}>
		<IconTrash />
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Do you really want to delete this snippet?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete your code snippet and thus make
				it inaccessible for people you shared it with.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action onclick={() => deleteForm?.requestSubmit()}>Delete</AlertDialog.Action>
		</AlertDialog.Footer>
		<form
			hidden
			method="POST"
			action={`/${snippetId}?/deleteSnippet`}
			bind:this={deleteForm}
			use:enhance={handleDeleteSnippet}
		></form>
	</AlertDialog.Content>
</AlertDialog.Root>
