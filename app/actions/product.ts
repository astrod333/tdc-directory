"use server";

import "server-only";
import { revalidatePath } from "next/cache";
// import { createClient } from "@/db/supabase/server";
import { api } from "@/lib/api-client";

export async function getFilters() {
	// API equivalent for metadata not found, aggregating from posts or returning empty for now as per plan
	// Ideally we would fetch all tags/categories. 
	// For now returning empty arrays or we could try to fetch recent posts and aggregate
	// But since `cached_actions` also does this, we might defer or stub.
	// Actually, looking at `cached_actions.ts`, it seems to be the main source for filters? 
	// This function `getFilters` in `product.ts` is also exported.

	// Let's stub it for now or use cached_actions one if possible.
	// The previous implementation fetched distinct categories/labels/tags.

	return { categories: [], labels: [], tags: [] };
}

export async function getProducts(
	searchTerm?: string,
	category?: string,
	label?: string,
	tag?: string,
) {
	try {
		const params: any = { type: 'project' }; // Map Products to Projects
		// API doesn't seem to have generic search for 'codename/description/punchline' OR logic easily exposed in swagger
		// But it has `search` param in `GET /api/posts`.
		if (searchTerm) params.search = searchTerm;
		if (tag) params.tag = tag;
		// Category and Label mapping?
		// The API only has `tag`. We might need to map category/label to tags for now.
		// Or if category is just a tag, pass it as tag?
		// Let's try passing category as tag if tag is not present, or just search.

		// The previous implementation did specific field filtering.
		// We will do best effort with `search` and `tag`.

		const posts = await api.posts.list(params);

		// Transform Posts to Products structure if needed by frontend
		// Frontend expects: { id, codename, description, punchline, categories, labels, tags, logo_src, ... }
		// We need to map `Post` to that structure.

		return posts.map(post => ({
			id: post._id,
			created_at: post.createdAt,
			full_name: post.projectData?.full_name || "",
			email: post.projectData?.email || "",
			twitter_handle: post.projectData?.twitter_handle || "",
			product_website: post.projectData?.product_website || "",
			codename: post.title,
			punchline: post.projectData?.punchline || "",
			description: post.content,
			logo_src: post.projectData?.logo_src || "",
			user_id: post.author?._id || "",
			tags: post.tags || [],
			view_count: post.likes?.length || 0,
			approved: true,
			labels: post.projectData?.labels || [],
			categories: post.projectData?.categories?.[0] || "", // Start with mapping to string if interface requires it, or join.
		}));
	} catch (error) {
		console.error("Error searching resources:", error);
		return [];
	}
}

export async function getProductById(id?: string) {
	if (!id) return [];
	try {
		const post = await api.posts.get(id);
		if (!post) return [];

		// Map to array as previous return type was likely array from `select('*')`
		return [{
			id: post._id,
			created_at: post.createdAt,
			full_name: post.projectData?.full_name || "",
			email: post.projectData?.email || "",
			twitter_handle: post.projectData?.twitter_handle || "",
			product_website: post.projectData?.product_website || "",
			codename: post.title,
			punchline: post.projectData?.punchline || "",
			description: post.content,
			logo_src: post.projectData?.logo_src || "",
			user_id: post.author?._id || "",
			tags: post.tags || [],
			view_count: post.likes?.length || 0,
			approved: true,
			labels: post.projectData?.labels || [],
			categories: post.projectData?.categories?.[0] || "",
		}];
	} catch (error) {
		console.error("Error fetching resources:", error);
		return [];
	}
}

export async function incrementClickCount(id: string) {
	try {
		// Use like as proxy for interest/view since no view endpoint
		await api.posts.like(id);
	} catch (e) {
		console.error("Error incrementing click count", e);
	}
	revalidatePath("/products");
}
