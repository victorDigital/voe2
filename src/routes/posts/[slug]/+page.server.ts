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
		return {
			status: 404,
			error: new Error('Not found')
		};
	}

	return { session, cookies: cookies.getAll(), post };
};
