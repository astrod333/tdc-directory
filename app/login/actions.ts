"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/db/supabase/server";

export async function signIn(formData: FormData) {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const supabase = await createClient();
	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});
	if (error) return redirect(`/login?message=${error.message}`);
	return redirect("/submit");
}

export async function signUp(formData: FormData) {
	const origin = (await headers()).get("origin");
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const supabase = await createClient();
	const { error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: `${origin}/auth/callback`,
		},
	});
	if (error) return redirect("/login?message=Error signing up");
	const { error: err } = await supabase.auth.signInWithPassword({
		email,
		password,
	});
	if (err) return redirect(`/login?message=${err.message}`);
	return redirect("/submit");
}

export async function handleResetPassword(formData: FormData) {
	const origin = (await headers()).get("origin");
	const email = formData.get("email") as string;
	const supabase = await createClient();
	const { error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: `${origin}/auth/callback?next=/login/password`,
	});
	if (error) return redirect(`/login?message=${error.message}`);
	return redirect("/login?message=Check email to reset password");
}
