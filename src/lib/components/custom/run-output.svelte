<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';

	interface Props {
		output: string;
		successful: boolean;
		error: string;
	}

	let { output, successful, error }: Props = $props();
</script>

<Tabs.Root value="output">
	<Tabs.List>
		<Tabs.Trigger value="output">Output</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="output">
		<div class="px-2" data-test="code-output">
			{#if successful}
				<pre class="whitespace-pre-wrap">{output}</pre>
			{:else if error}
				<p class="text-red-400">{error}</p>
			{:else}
				<pre
					class="whitespace-pre-wrap italic text-muted-foreground">Run code to see its output here...</pre>
			{/if}
		</div>
	</Tabs.Content>
</Tabs.Root>
