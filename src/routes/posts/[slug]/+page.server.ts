import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { getSession, supabase }, cookies, params }) => {
	const session = await getSession();

	let { slug } = params;

	const { data: post, error } = await supabase
		.from('posts')
		.select('*')
		.filter('visible', 'eq', true)
		.eq('slug', slug)
		.single();

	if (error) {
		console.error('error', error);
	}

	if (!post) {
		throw redirect(302, '/');
	}

	return { session, cookies: cookies.getAll(), post };
};
