export const load = async ({ locals: { getSession, supabase }, cookies }) => {
	const session = await getSession();

	//get the 3 nmost recent posts
	const { data: posts, error } = await supabase
		.from('posts')
		.select('*')
		.filter('visible', 'eq', true)
		.order('created_at', { ascending: false })
		.limit(3);

	if (error) {
		return { session, cookies: cookies.getAll() };
	}

	return { session, cookies: cookies.getAll(), posts };
};
