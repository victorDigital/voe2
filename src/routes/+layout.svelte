<svelte:options runes={true} />

<script lang="ts">
	import PageFooter from '$lib/custComp/PageFooter.svelte';
	import { Pencil2, MixerHorizontal, Home, Exit } from 'svelte-radix';

	let { children, data } = $props();
	import '../app.css';
	import Button from '$lib/components/ui/button/button.svelte';

	let isAuthed = data?.session?.user.aud === 'authenticated';
</script>

<svelte:head>
	<title>Victor Østergaard</title>
</svelte:head>

<div class="flex flex-col gap-1.5 bg-foreground p-1">
	{#if isAuthed}
		<div class="my-1 flex w-full items-center justify-start gap-1 px-1">
			<Button size="icon">
				<Home class="h-5 w-5" />
			</Button>
			<Button size="icon" href="/new">
				<Pencil2 class="h-5 w-5" />
			</Button>
			<Button size="icon">
				<MixerHorizontal class="h-5 w-5" />
			</Button>
			<form method="POST" action="auth?/signout">
				<button
					class="inline-flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-md bg-destructive text-sm font-medium text-destructive-foreground ring-offset-background transition-colors hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
				>
					<Exit class="h-5 w-5" />
				</button>
			</form>
		</div>
	{/if}
	<div class="min-h-screen overflow-hidden rounded-2xl bg-background p-3">
		{@render children()}
	</div>
	<div class="overflow-hidden rounded-2xl bg-background">
		<PageFooter />
	</div>
</div>
