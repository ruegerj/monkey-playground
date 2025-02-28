<script lang="ts">
	import IconTrash from 'virtual:icons/lucide/trash';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { buttonVariants } from '../ui/button';

	interface Props {
		snippetId: string;
		class?: string;
	}

	let { snippetId, class: clazz }: Props = $props();
	let open = $state(false);
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
			<AlertDialog.Action>Delete</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
