<script lang="ts">
	import * as FormPrimitive from 'formsnap';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils.js';
	import type { ClassValue } from 'clsx';

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	type $$Props = HTMLAttributes<HTMLSpanElement>;
	let className: ClassValue | undefined | null = undefined;
	export { className as class };
</script>

<FormPrimitive.Description
	class={cn('text-sm text-muted-foreground', className)}
	{...$$restProps}
	let:descriptionAttrs
>
	<slot {descriptionAttrs} />
</FormPrimitive.Description>
