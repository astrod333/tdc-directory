"use server";

import "server-only";
import { revalidatePath, revalidateTag } from "next/cache";
import { api } from "@/lib/api-client";
import { schema } from "./schema";

export type FormState = {
	message: string;
	fields?: Record<string, string>;
	issues: string[];
};

// Main function to handle the form submission
export async function onSubmitToolAction(
	prevState: FormState,
	formData: FormData,
): Promise<FormState> {
	const data = Object.fromEntries(formData.entries());
	const parsed = schema.safeParse(data);

	if (!parsed.success) {
		console.error("Form validation failed");
		const fields: Record<string, string> = {};
		for (const key of Object.keys(data)) {
			fields[key] = data[key].toString();
		}
		return {
			message: "Invalid form data",
			fields,
			issues: parsed.error.issues.map((issue) => issue.message),
		};
	}

	try {
		// Auth check happens in API usually, but we can check session here if needed.
		// For now relying on API to reject if not authenticated.

		let logoUrl = "";
		const logoFile = formData.get("images") as File;
		if (logoFile && logoFile.size > 0) {
			// TODO: Implement file upload to API when endpoint is available.
			// For now, logging and setting a placeholder or leaving empty.
			console.log("File upload not supported by API yet. File:", logoFile.name);
			logoUrl = "https://placehold.co/400?text=Logo";
		}

		// Prepare Post data
		const postData = {
			type: "project" as const,
			title: parsed.data.codename,
			content: parsed.data.description,
			tags: [...parsed.data.categories], // Using categories as tags for now
			projectData: {
				full_name: parsed.data.fullName,
				email: parsed.data.email,
				twitter_handle: parsed.data.twitterHandle,
				product_website: parsed.data.productWebsite,
				codename: parsed.data.codename,
				punchline: parsed.data.punchline,
				logo_src: logoUrl,
				categories: parsed.data.categories,
				labels: ["unlabeled"],
				description: parsed.data.description, // duplicated in content but kept for structure compatibility
			},
		};

		console.log("Inserting product data via API", postData);
		await api.posts.create(postData);

		revalidatePath("/");
		revalidatePath("/");
		// revalidateTag("product-filters"); // Commenting out suspicious API usage causing type error
		// Or if required:
		// revalidateTag("product-filters", "seconds");
		// I'll try commenting it out first or using 1 arg if I can confirm type.
		// But since build failed, let's look at the original code again.
		// Original: revalidateTag("product-filters", "seconds");
		// So I will revert to that.
		revalidateTag("product-filters", "seconds");

		console.log("Product data successfully inserted");

		return { message: "Tool submitted successfully", issues: [] };
	} catch (error: any) {
		console.error(
			`Submission failed: ${error.message || "Unknown error occurred"}`,
		);
		return {
			message: `Submission failed: ${error.message || "Unknown error occurred"}`,
			issues: [error.message || "Unknown error occurred"],
		};
	}
}
