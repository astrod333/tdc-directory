"use server";

import "server-only";
// import { createClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

type FilterData = {
	categories: string[];
	labels: string[];
	tags: string[];
};

type CategoryData = {
	name: string;
};

type LabelData = {
	name: string;
};

type TagData = {
	name: string;
};


// Mocking filter data since API doesn't expose it directly yet
// We could fetch all posts and aggregate, but that's expensive.
// For now, returning hardcoded or empty, or we could try to implement a tag fetcher if API has it.
// API docs showed `GET /api/posts` has tags.
// Let's just return empty for now to unblock build, and maybe fetch tags from `api.posts.list` if we want to be fancy later.

async function getFilters(): Promise<FilterData> {
	// TODO: Implement proper aggregation or metadata endpoint
	return { categories: ["Web", "Mobile", "AI"], labels: [], tags: ["react", "nextjs", "typescript"] };
}

export const getCachedFilters = unstable_cache(
	async (): Promise<FilterData> => {
		const { categories, labels, tags } = await getFilters();
		return { categories, labels, tags };
	},
	["product-filters"],
	{ tags: [`product_filters`], revalidate: 9000 },
);
