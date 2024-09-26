<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { PageData } from './$types';
	import type * as Monaco from 'monaco-editor/esm/vs/editor/editor.api';
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import type { UploadData } from '$lib/types/app';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	export let data: PageData;

	let editor: Monaco.editor.IStandaloneCodeEditor;
	let monaco: typeof Monaco;
	let editorContainer: HTMLElement;

	let heading = '';
	let subheading = '';
	let Slug = '';
	let images: string[] = [];
	let body = `# Welcome to the code editor!\nwrite your *Markdown* here`;

	onMount(async () => {
		// Import our 'monaco.ts' file here
		// (onMount() will only be executed in the browser, which is what we want)
		monaco = (await import('./monaco')).default;

		// Your monaco instance is ready, let's display some code!
		const editor = monaco.editor.create(editorContainer, {
			value: body,
			automaticLayout: true,
			theme: 'vs',
			language: 'markdown',
			wrappingStrategy: 'advanced',
			wordWrap: 'on'
		});
		const model = monaco.editor.createModel(body, 'markdown');
		editor.onDidChangeModelContent(() => {
			body = editor.getValue();
		});
		editor.setModel(model);
	});

	onDestroy(() => {
		monaco?.editor.getModels().forEach((model) => model.dispose());
		editor?.dispose();
	});

	let fileEl: HTMLInputElement;

	function uploadImg() {
		const form = new FormData();
		if (!fileEl) return;
		if (!fileEl.files) return;
		form.append('picture', fileEl.files[0]);
		fetch('?/uploadimg', {
			method: 'POST',
			body: form
		})
			.then((res) => res.json())
			.then((data: UploadData) => {
				console.log(data);
				if (!data || !data.data) return;
				images = [
					...images,
					'https://pifglcszaerhxmwpmjub.supabase.co/storage/v1/object/public/' +
						(JSON.parse(data.data)[0] ?? '')
				];
			})
			.catch((err) => console.error(err));
	}

	function uploadData() {
		const form = new FormData();
		form.append('heading', heading);
		form.append('subheading', subheading);
		form.append('body', body);
		form.append('slug', Slug);
		form.append('images', JSON.stringify(images));
		fetch('?/upload', {
			method: 'POST',
			body: form
		})
			.then((res) => res.json())
			.then((data) => goto('/posts' + JSON.parse(data.data)[0]))
			.catch((err) => console.error(err));
	}
</script>

<div class="mb-3 grid w-full max-w-sm items-center gap-1.5">
	<Label for="heading">Heading</Label>
	<Input bind:value={heading} placeholder="Heading" />
</div>

<div class="mb-3 grid w-full max-w-sm items-center gap-1.5">
	<Label for="subheading">Subheading</Label>
	<Input bind:value={subheading} placeholder="Subheading" />
</div>

<div class="mb-3 grid w-full max-w-sm items-center gap-1.5">
	<Label for="slug">Slug</Label>
	<Input bind:value={Slug} placeholder="Slug" />
</div>

<form
	action="?/uploadimg"
	method="post"
	enctype="multipart/form-data"
	use:enhance
	on:submit|preventDefault={uploadImg}
>
	<div class="mb-6 grid w-full max-w-sm items-center gap-1.5">
		<Label for="picture">Pictures</Label>
		{#each images as link}
			<img src={link} alt="cover img" class="h-20 w-20" />
		{/each}
		<input
			id="picture"
			name="picture"
			type="file"
			bind:this={fileEl}
			class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
		/>
		<Button type="submit">Upload</Button>
	</div>
</form>

<div class="h-[40rem]" bind:this={editorContainer}></div>

<Button class="mt-6 w-full" size="lg" on:click={uploadData}>Publish</Button>
