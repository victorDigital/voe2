<script lang="ts">
	export let text: string;
	export let lang: string;

	// create a hash of the text must only contain letters and numbers and be less than 32 characters
	const hash = (text: string) => {
		let hash = 0;
		for (let i = 0; i < text.length; i++) {
			const chr = text.charCodeAt(i);
			hash = (hash << 5) - hash + chr;
			hash |= 0;
		}
		return Math.abs(hash).toString(36).slice(0, 32);
	};

	const contentHash = hash(text);

	import { codeToHtml } from 'shiki';
	import katex from 'katex';
	import mermaid from 'mermaid';
	import * as HoverCard from '$lib/components/ui/hover-card';
	import { onMount } from 'svelte';

	let ready = false;
	onMount(() => {
		ready = true;
	});

	async function codeBlockRenderer({ code, lang }: { code: string; lang: string }) {
		const html = await codeToHtml(code, {
			lang: lang,
			theme: 'catppuccin-latte'
		});
		return html;
	}

	async function expressionRenderer(expr: string) {
		return katex.renderToString(expr, {
			displayMode: true,
			output: 'htmlAndMathml',
			throwOnError: false
		});
	}

	async function mermaidRenderer(expr: string) {
		mermaid.initialize({
			theme: 'neutral',
			securityLevel: 'loose'
		});
		return await mermaid.mermaidAPI.render('mermaid-' + contentHash, expr);
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="/katex/katex.min.css" />
</svelte:head>

{#if lang === 'latex'}
	{#await expressionRenderer(text) then value}
		<HoverCard.Root>
			<HoverCard.Trigger class="no-underline"
				><div class="my-3">{@html value}</div></HoverCard.Trigger
			>
			<HoverCard.Content class="w-screen max-w-md break-all">
				<p class="font-mono text-sm">{text}</p>
			</HoverCard.Content>
		</HoverCard.Root>
	{/await}
{:else if lang === 'mermaid'}
	{#if ready}
		{#await mermaidRenderer(text) then html}
			<div>
				{@html html.svg}
			</div>
		{/await}
	{:else}
		<p>Loading...</p>
	{/if}
{:else}
	{#await codeBlockRenderer({ code: text, lang: lang })}
		<pre class="my-6 bg-white text-black dark:bg-black dark:text-white"><code>{text}</code></pre>
	{:then html}
		{@html html}
	{:catch error}
		<pre class="my-6 bg-white text-black dark:bg-black dark:text-white"><code>{text}</code></pre>
	{/await}
{/if}
