<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import type { RunResult } from '$lib/server/compiler';
	import { Separator } from '../ui/separator';

	interface Props {
		output?: RunResult;
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
			{#if successful && output?.successful}
				{#if output.std_output.length}
					<pre class="whitespace-pre-wrap">{output.std_output}</pre>
					<Separator class="my-2" />
				{/if}
				<pre class="whitespace-pre-wrap">{output.result}</pre>
			{:else if error}
				<p class="text-red-400">{error}</p>
			{:else if output && !output.successful}
				<p class="text-red-400">{output.result}</p>
			{:else}
				<pre
					class="whitespace-pre-wrap italic text-muted-foreground">Run code to see its output here...</pre>
			{/if}
		</div>
	</Tabs.Content>
</Tabs.Root>
