import { fault, formatError, success } from '$lib/utils';
import { AuthUserSchema } from '$lib/validationSchema';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { AuthApiError } from '@supabase/supabase-js';
import { invalid } from '@sveltejs/kit';
import { ZodError } from 'zod';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		const { request } = event;
		const { supabaseClient: supabase } = await getSupabase(event);

		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		try {
			AuthUserSchema.parse({ email, password });
		} catch (err) {
			if (err instanceof ZodError) {
				const errors = formatError(err);
				return invalid(400, { errors, email });
			}
		}

		const { error } = await supabase.auth.signUp({
			email,
			password
		});

		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return invalid(400, fault('Invalid credentials.', { email }));
			}

			return invalid(500, fault('Server error. Try again later.', { email }));
		}

		return success('Please check your email for a magic link to log into the website.');
	}
};
