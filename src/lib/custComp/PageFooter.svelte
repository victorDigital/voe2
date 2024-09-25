<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { EnvelopeOpen, GithubLogo } from 'radix-icons-svelte';
</script>

<footer class="colorful-bg relative h-72 p-3 transition-all duration-300 hover:backdrop-blur-xl">
	<p
		class="absolute bottom-[calc(10vw*-1+20px-1vw)] left-[calc(5vw-13px)] z-0 origin-top-left select-none font-bold mix-blend-overlay filter [font-size:calc(4.3vw*3.3)]"
	>
		ØSTERGAARD
	</p>

	<div class="flex flex-wrap justify-center gap-3">
		<Button href="mailto:victor@voe.dk" class="gap-2" variant="ghost">
			<EnvelopeOpen class="h-5 w-5" />
			<span> victor@voe.dk </span>
		</Button>
		<Button href="https://github.com/victorDigital" target="_blank" class="gap-2" variant="ghost">
			<GithubLogo class="h-5 w-5" />
			<span> GitHub </span>
		</Button>
	</div>
</footer>

<style>
	.colorful-bg {
		filter: contrast (130%) brightness (450%);
		background:
			linear-gradient(to bottom right, rgb(105, 207, 255), rgba(255, 116, 248, 0.47)),
			radial-gradient(rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.5)),
			/* random noise svg static with noise */
				url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='n' x='0' y='0' width='100' height='100'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='1' result='t'/%3E%3CfeColorMatrix in='t' type='saturate' values='0' result='c'/%3E%3CfeComposite in='SourceGraphic' in2='c' operator='in'/%3E%3CfeBlend mode='multiply'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)'/%3E%3C/svg%3E");
	}
</style>
