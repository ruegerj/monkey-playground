<script lang="ts">
	import IconGithub from 'virtual:icons/mdi/github';
	import { Button } from '$lib/components/ui/button';
</script>

<Button data-test="gh-sign-in-btn" href="/login/github" variant="outline">
	Sign in
	<IconGithub class="ml-2" />
</Button>
