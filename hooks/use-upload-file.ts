import * as React from "react";
import { toast } from "sonner";
// import { createClient } from "@/db/supabase/client";

import { getErrorMessage } from "@/lib/error";

interface UseUploadFileProps {
	defaultUploadedFiles?: any[];
}

export function useUploadFile(
	_bucket: string,
	{ defaultUploadedFiles = [] }: UseUploadFileProps = {},
) {
	// const supabase = createClient();
	const [uploadedFiles, setUploadedFiles] =
		React.useState<any[]>(defaultUploadedFiles);
	const [progresses, setProgresses] = React.useState<Record<string, number>>(
		{},
	);
	const [isUploading, setIsUploading] = React.useState(false);

	async function uploadFiles(files: File[]) {
		setIsUploading(true);
		try {
			const uploadPromises = files.map(async (file) => {
				console.log("uploadPromises", file.name);

				// Mock upload for now as API upload endpoint is missing
				// In real implementation we would POST to /api/upload
				console.warn("File upload simulation - API endpoint needed");

				await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay

				return {
					name: file.name,
					url: "https://placehold.co/400?text=" + encodeURIComponent(file.name)
				};
			});

			const results = await Promise.all(uploadPromises);
			setUploadedFiles((prev) => (prev ? [...prev, ...results] : results));
		} catch (err) {
			toast.error(getErrorMessage(err));
		} finally {
			setProgresses({});
			setIsUploading(false);
		}
	}

	return {
		uploadedFiles,
		progresses,
		uploadFiles,
		isUploading,
	};
}
