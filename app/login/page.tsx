import { LogoAnimationLink } from "@/components/nav";

import { LoginForm } from "./form";

import { redirect } from "next/navigation";
import { api } from "@/lib/api-client";

export default async function LoginPage({
	searchParams,
}: {
	searchParams: Promise<{ message: string }>;
}) {
	const params = await searchParams;
	let isLoggedIn = false;

	try {
		await api.auth.me();
		isLoggedIn = true;
	} catch (e) {
		// Not logged in
	}

	if (isLoggedIn) {
		redirect("/submit");
	}

	return (
		<div>
			<div className="absolute top-2 left-2 ">
				<LogoAnimationLink />
			</div>
			<div className="w-full flex flex-col items-center justify-center gap-2  pt-24">
				<LoginForm />

				{params?.message && (
					<p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
						{params.message}
					</p>
				)}
			</div>
		</div>
	);
}
