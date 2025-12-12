import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
	const requestUrl = new URL(request.url);
	const token = requestUrl.searchParams.get("token");
	const next = requestUrl.searchParams.get("next") || "/submit"; // Default to /submit after login

	if (token) {
		const cookieStore = await cookies();
		cookieStore.set("auth_token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
		});
	}

	return NextResponse.redirect(requestUrl.origin + next);
}

