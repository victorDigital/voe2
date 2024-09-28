<script lang="ts">
	import type { PageData } from './$types';
	import * as Carousel from '$lib/components/ui/carousel';
	import SvelteMarkdown from 'svelte-markdown';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import CodeBlockRenderer from '$lib/custComp/CodeBlockRenderer.svelte';

	export let data: PageData;
	const source = data.post.body;
</script>

<div class="flex flex-col items-center">
	<Carousel.Root
		opts={{
			align: 'center',
			loop: true
		}}
	>
		<Carousel.Content>
			{#if data.post.images}
				{#each JSON.parse(data.post.images) as image}
					<Carousel.Item class="max-w-[56rem]">
						<div class="max-w-[56rem]">
							<img
								fetchpriority="high"
								loading="eager"
								src={image}
								alt={data.post.heading}
								class="aspect-video w-full rounded-md object-cover"
							/>
						</div>
					</Carousel.Item>
				{/each}
			{/if}
		</Carousel.Content>
	</Carousel.Root>

	<div class="px-2">
		<div class="w-full max-w-4xl py-4">
			<h1 class="text-4xl font-bold">{data.post.heading}</h1>
			<h2 class="text-xl">{data.post.subheading}</h2>

			<p>{new Date(data.post.created_at).toLocaleDateString()}</p>
			<Separator />
		</div>

		<main class="prose prose-neutral mb-40 w-full max-w-4xl">
			<SvelteMarkdown renderers={{ code: CodeBlockRenderer }} {source} />
		</main>
	</div>
</div>
