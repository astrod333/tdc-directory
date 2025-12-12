"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { signInWithGithub } from "./actions";
import { SubmitButton } from "./submit-button";

export function LoginForm() {
	return (
		<div className="w-full flex flex-col items-center justify-center gap-2">
			<Card className="mx-auto w-[20rem] md:w-[24rem] mt-2">
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>
						Sign in with your GitHub account to continue
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form action={signInWithGithub} className="grid gap-4">
						<SubmitButton
							className="button-secondary rounded-md px-4 py-2 text-foreground mb-2 w-full flex items-center justify-center gap-2"
							pendingText="Redirecting to GitHub..."
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="h-5 w-5"
							>
								<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
								<path d="M9 18c-4.51 2-5-2-7-2" />
							</svg>
							Sign in with GitHub
						</SubmitButton>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}

