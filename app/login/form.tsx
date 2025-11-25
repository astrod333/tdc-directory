"use client";

import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { handleResetPassword, signIn, signUp } from "./actions";
import { ResetPassword } from "./reset-password";
import { SubmitButton } from "./submit-button";

export function LoginForm() {
	const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

	return (
		<div className="w-full flex flex-col items-center justify-center gap-2">
			{/* Tab Buttons */}
			<div className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
				<button
					type="button"
					onClick={() => setActiveTab("login")}
					className={cn(
						"inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
						activeTab === "login" && "bg-background text-foreground shadow",
					)}
				>
					Login
				</button>
				<button
					type="button"
					onClick={() => setActiveTab("signup")}
					className={cn(
						"inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
						activeTab === "signup" && "bg-background text-foreground shadow",
					)}
				>
					Sign Up
				</button>
			</div>

			{/* Login Form */}
			{activeTab === "login" && (
				<Card className="mx-auto w-[20rem] md:w-[24rem] mt-2">
					<CardHeader>
						<CardTitle className="text-2xl">Login</CardTitle>
						<CardDescription>
							Enter your information below to login to your account
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form className="grid gap-4" id="login-form">
							<div className="grid gap-2">
								<Label htmlFor="login-email">Email</Label>
								<Input
									id="login-email"
									name="email"
									placeholder="you@example.com"
									required
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="login-password">Password</Label>
								<Input
									id="login-password"
									type="password"
									required
									name="password"
									placeholder="••••••••"
								/>
							</div>

							<SubmitButton
								formAction={signIn}
								className="button-secondary rounded-md px-4 py-2 text-foreground mb-2"
								pendingText="Signing In..."
							>
								Login
							</SubmitButton>
						</form>
					</CardContent>
					<CardFooter>
						<ResetPassword handleResetPassword={handleResetPassword} />
					</CardFooter>
				</Card>
			)}

			{/* Sign Up Form */}
			{activeTab === "signup" && (
				<Card className="mx-auto w-[20rem] md:w-[24rem] mt-2">
					<CardHeader>
						<CardTitle className="text-2xl">Sign Up</CardTitle>
						<CardDescription>
							Enter your information below to create an account
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form className="grid gap-4" id="signup-form">
							<div className="grid gap-2">
								<Label htmlFor="signup-email">Email</Label>
								<Input
									id="signup-email"
									name="email"
									placeholder="you@example.com"
									required
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="signup-password">Password</Label>
								<Input
									id="signup-password"
									type="password"
									required
									name="password"
									placeholder="••••••••"
								/>
							</div>

							<SubmitButton
								formAction={signUp}
								className="button-secondary rounded-md px-4 py-2 text-foreground mb-2"
								pendingText="Signing Up..."
							>
								Sign Up
							</SubmitButton>
						</form>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
