<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import { GithubLogo, Mix } from 'svelte-radix';
	import * as Card from '$lib/components/ui/card';
	import Separator from '$lib/components/ui/separator/separator.svelte';

	export let data;
</script>

<div class="flex h-72 w-full flex-col items-center justify-center">
	<h1 class="text-4xl font-bold md:text-7xl">Victor Østergaard</h1>
	<h2 class="text-xl md:text-3xl">Full-stack web developer</h2>
	<div class="mt-3 flex justify-center gap-6">
		<Button href="https://github.com/victorDigital" target="_blank" class="gap-2">
			<GithubLogo class="h-5 w-5" />
			<span>GitHub</span>
		</Button>
		<Button href="/projects" class="gap-2" variant="outline">
			<Mix class="h-5 w-5" />
			<span>Projects</span>
		</Button>
	</div>
</div>

<div class="relative min-h-screen">
	<div
		class="absolute inset-0 h-full w-full bg-background bg-[radial-gradient(#a8a29e_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_70%,#000_60%,transparent_100%)]"
	></div>
	<div class="relative z-10 flex flex-col items-center gap-6 p-4 pt-20 md:pt-64">
		<Card.Root
			class="flex max-w-7xl flex-col-reverse justify-between overflow-hidden bg-background sm:w-2/3 xl:w-full xl:flex-row"
		>
			<div class="xl:w-1/2">
				<Card.Header>
					<Card.Title>Hi There 👋</Card.Title>
				</Card.Header>
				<Card.Content>
					<p class="text-sm">
						I'm a passionate web developer who is passionate about creating user-friendly and modern
						websites. I have experience with a wide range of technologies and I am always ready to
						learn new things. I have over 3 years of experience teaching technology, math and
						programming to young people and therefore have a good understanding of communicating
						complex topics in an easy-to-understand way. As well as several years of professional
						experience with web development, SEO and many other technologies.
					</p>
				</Card.Content>
			</div>
			<div class="xl:w-1/2">
				<enhanced:img src="/static/landing.png" alt="me and my tools" />
			</div>
		</Card.Root>
		<Card.Root class="w-full max-w-7xl">
			<Card.Header>
				<Card.Title>Read the blog</Card.Title>
				<Card.Description>My most recent posts</Card.Description>
			</Card.Header>
			<Card.Content>
				{#if data.posts}
					{#each data.posts as post, i}
						{#if 0 != i}
							<Separator />
						{/if}
						<a class="flex w-full justify-between py-4" href={'/posts/' + post.slug}>
							<span>{post.heading}</span>
							<span>{new Date(post.created_at).toLocaleDateString()}</span>
						</a>
					{/each}
				{:else}
					<p>No posts yet</p>
				{/if}
			</Card.Content>
		</Card.Root>
	</div>
</div>
