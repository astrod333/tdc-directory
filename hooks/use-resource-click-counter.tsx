"use client";

import { useCallback } from "react";
import { incrementClickCount as incrementAction } from "@/app/actions/product";

const useResourceCounter = () => {
	// We reuse the server action which now calls API
	const incrementViewCount = useCallback(async (id: string) => {
		await incrementAction(id);
		console.log("View count incremented via API action");
	}, []);

	const incrementClickCount = useCallback(async (id: string) => {
		await incrementAction(id);
		console.log("Click count incremented via API action");
	}, []);

	return {
		incrementViewCount,
		incrementClickCount,
	};
};

export default useResourceCounter;
