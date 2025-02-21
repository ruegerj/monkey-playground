<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="flex h-full flex-auto flex-col items-center justify-center">
	<pre class="text-muted-foreground">
         .="=.
       _/.-.-.\_     _
      ( ( o o ) )    ))
       |/  "  \|    //
        \'---'/    //
       /`"""`\\  ((
      / /_,_\ \\  \\
      \_\\_'__/ \  ))
       /`  /`~\  |//
      /   /    \  /
  ,--`,--'\/\    /
  '-- "--'  '--'
    </pre>
	<h1>
		<i class="block text-center text-red-400">Monkey says:</i>
		{page.status}: {page.error?.message}
	</h1>
</div>
