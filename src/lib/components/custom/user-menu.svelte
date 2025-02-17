<script lang="ts">
	import IconLogOut from 'virtual:icons/lucide/logOut';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Avatar from '$lib/components/ui/avatar';
	import type { SessionValidationResult } from '$lib/server/auth';

	interface Props {
		user: SessionValidationResult['user'];
		logout: () => void;
	}

	let { user, logout }: Props = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="outline" builders={[builder]} class="relative h-8 w-8 rounded-full">
			<Avatar.Root data-test="user-avatar" class="h-8 w-8">
				<Avatar.Image
					data-test="user-avatar-img"
					src={user?.avatarUrl}
					alt="user avatar profile picture"
				/>
				<Avatar.Fallback>AN</Avatar.Fallback>
			</Avatar.Root>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content data-test="user-menu" class="w-56" align="end">
		<DropdownMenu.Label>
			<div class="flex flex-col space-y-1">
				<p class="text-sm font-medium leading-none" data-test="user-menu-username">
					{user?.username}
				</p>
				<p class="text-xs leading-none text-muted-foreground">via GitHub</p>
			</div>
		</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Item class="cursor-pointer" data-test="user-menu-sign-out-btn" on:click={logout}>
			Sign out
			<DropdownMenu.Shortcut>
				<IconLogOut />
			</DropdownMenu.Shortcut>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
