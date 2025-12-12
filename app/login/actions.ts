"use server";

import { redirect } from "next/navigation";
import { api } from "@/lib/api-client";

export async function signInWithGithub() {
	const { authUrl } = await api.auth.getGithubUrl();
	if (authUrl) redirect(authUrl);
}

// Deprecated actions (kept empty or removed if verified unused, removing for now)

