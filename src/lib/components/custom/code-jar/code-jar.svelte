<script lang="ts">
	import Prism from 'prismjs';
	import MonkeyGrammar from '$lib/monkey/grammar';
	import { codejar } from './code-jar.action';

	interface Props {
		class: string;
		code: string;
		enabled?: boolean;
	}

	let { class: clazz, code = $bindable(), enabled }: Props = $props();

	const monkeySyntax = 'monkey-lang';
	Prism.languages[monkeySyntax] = MonkeyGrammar;

	let container = $state<HTMLPreElement>();

	function highlight(text: string, syntax: string): string {
		return Prism.highlight(text, Prism.languages[syntax], syntax);
	}

	function onCodeUpdate(newValue: string) {
		code = newValue;
	}
</script>

<pre
	class="{'language-' + monkeySyntax} {clazz ?? ''}"
	bind:this={container}
	use:codejar={{
		value: code,
		syntax: monkeySyntax,
		editorEnabled: enabled ?? true,
		highlight: highlight,
		onUpdate: onCodeUpdate
	}}>{@html highlight(code, monkeySyntax)}</pre>
