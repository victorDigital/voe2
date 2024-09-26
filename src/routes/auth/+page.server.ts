import { redirect } from '@sveltejs/kit';
import { type Provider } from '@supabase/supabase-js';
import { Fail } from '$lib/utils.js';

export const load = async ({ locals: { getSession } }) => {
	const session = await getSession();
	console.log('session:', session);

	/* User is already logged in. */
	if (session) redirect(303, '/');
};

export const actions = {
	signin_email: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!email || !password)
			return Fail({ message: 'Please enter an email and password' }, { email });

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error) return Fail(error, { email });

		/* Login successful, redirect. */
		redirect(303, '/');
	},
	oauth: async ({ request, url, locals: { supabase } }) => {
		const formData = await request.formData();
		const provider = formData.get('provider') as Provider;

		/**
		 * Sign-in will not happen yet, because we're on the server-side,
		 * but we need the returned url.
		 */
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: `${url.origin}/auth/callback?next=/app`
			}
		});

		if (error) return Fail(error);

		/* Now authorize sign-in on browser. */
		if (data.url) redirect(303, data.url);
	},
	signout: async ({ locals: { supabase } }) => {
		await supabase.auth.signOut();
		redirect(303, '/');
	}
};
