import { Fail } from '$lib/utils';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { getSession }, cookies }) => {
	const session = await getSession();

	return { session, cookies: cookies.getAll() };
};

export const actions = {
	uploadimg: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const file = formData.get('picture') as File;

		console.log('file:', file);

		if (!file) return Fail({ message: 'Please select a file' });

		const { data, error } = await supabase.storage
			.from('images')
			.upload(`images/${Date.now() + '-' + Math.floor(Math.random() * 1000)}`, file);

		if (error) return Fail(error);

		console.log('data:', data);

		return data.fullPath;
	},
	upload: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const heading = formData.get('heading') as string;
		const subheading = formData.get('subheading') as string;
		const slug = formData.get('slug') as string;
		const body = formData.get('body') as string;
		const images = formData.get('images') as string; // stringified json array of links

		//create new row in the pages table with the data

		const { data, error } = await supabase.from('posts').insert([
			{
				heading,
				subheading,
				slug,
				body,
				images
			}
		]);

		console.log('data:', data, error, heading, subheading, slug, body, images);

		if (error) return Fail(error);

		return '/' + slug;
	}
};
