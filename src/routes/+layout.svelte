<svelte:options runes={true} />

<script>
	import PageFooter from '$lib/custComp/PageFooter.svelte';

	let { children } = $props();
	import '../app.css';
</script>

<svelte:head>
	<title>Victor Østergaard</title>
</svelte:head>

<div class="flex flex-col gap-1.5 bg-foreground p-1">
	<div class="min-h-screen overflow-hidden rounded-2xl bg-background p-3">
		{@render children()}
	</div>
	<div class="overflow-hidden rounded-2xl bg-background">
		<PageFooter />
	</div>
</div>
