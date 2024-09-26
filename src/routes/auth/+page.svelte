<script lang="ts">
	export let form;
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { EyeClosed, GithubLogo } from 'svelte-radix';
	import { Input } from '$lib/components/ui/input';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Alert from '$lib/components/ui/alert';
	import { Label } from '$lib/components/ui/label';
</script>

<!-- <form method="POST" action="?/signin">
	<input name="email" placeholder="email" type="email" value={form?.data?.email ?? ""} />
	<input name="password" placeholder="password" type="password" />
	<button style="margin-top: 12px;">Login</button>
</form>
<form method="POST" action="?/oauth">
	<button style="margin-top: 12px;" name="provider" value="github">Login with GitHub</button>
</form>
<form method="POST" action="?/anon">
	<button style="margin-top: 12px;">Login Anonymously</button>
</form>
 -->

<!-- <a href="/auth/signup">Don't have an account? Signup</a> -->

<div class="flex h-dvh w-full flex-col items-center justify-center gap-4">
	<Card.Root class="w-full max-w-sm">
		<Card.Header class="space-y-1">
			<Card.Title class="text-2xl">Log in to Voe.dk</Card.Title>
			<Card.Description>Enter your email and password to log in</Card.Description>
		</Card.Header>
		<Card.Content class="grid gap-4">
			<div class="grid grid-cols-1 gap-6">
				<form method="POST" action="?/oauth" class="w-full">
					<button
						class="inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md border border-input bg-background p-2 px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
						name="provider"
						value="github"
					>
						<GithubLogo class="mr-2 h-4 w-4" />
						GitHub
					</button>
				</form>
			</div>
			<form method="POST" action="?/signin_email">
				<div class="relative">
					<div class="relative flex justify-center text-xs uppercase">
						<span class="bg-card px-2 py-2 text-muted-foreground"> Or continue with </span>
					</div>
				</div>
				<div class="mb-4 grid gap-2">
					<Label for="email">Email</Label>
					<Input name="email" placeholder="email" type="email" value={form?.data?.email ?? ''} />
				</div>
				<div class="mb-4 grid gap-2">
					<Label for="password">Password</Label>
					<Input name="password" placeholder="password" type="password" />
				</div>
				<div class="w-full">
					{#if form?.error}
						<Alert.Root variant="destructive" class=" mb-4 w-full">
							<Alert.Title>{form.error}</Alert.Title>
						</Alert.Root>
					{/if}
				</div>
				<button
					class="inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
					>Log in</button
				>
			</form>
		</Card.Content>
	</Card.Root>
</div>
