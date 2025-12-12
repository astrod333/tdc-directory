
import { cookies } from "next/headers";

const API_BASE_URL = "http://10.8.0.2:5000/api";

export type APIError = {
    success: boolean;
    message: string;
};

export type Post = {
    _id: string;
    type: "timeline" | "flex" | "idea" | "project";
    title: string;
    content: string;
    tags: string[];
    projectData?: any;
    createdAt: string;
    author: {
        _id: string;
        username: string;
        avatar?: string;
    };
    likes: any[];
    comments: any[];
};

export type User = {
    _id: string;
    username: string;
    email: string;
    githubUsername: string;
    role: "user" | "moderator" | "admin";
    stats?: any;
};

async function getAuthToken() {
    const cookieStore = await cookies();
    return cookieStore.get("auth_token")?.value;
}

export async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const token = await getAuthToken();

    const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
        signal: AbortSignal.timeout(15000), // Increase timeout to 15s due to high latency
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API Error: ${response.statusText}`);
    }

    // Handle 204 No Content
    if (response.status === 204) {
        return {} as T;
    }

    return response.json();
}

export const api = {
    auth: {
        getGithubUrl: () => apiFetch<{ authUrl: string }>("/auth/github"),
        me: () => apiFetch<User>("/auth/me"),
        logout: () => apiFetch("/auth/logout", { method: "POST" }),
    },
    posts: {
        list: (params?: { type?: string; tag?: string; page?: number; limit?: number; sortBy?: string }) => {
            const searchParams = new URLSearchParams();
            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined) searchParams.append(key, value.toString());
                });
            }
            return apiFetch<Post[]>(`/posts?${searchParams.toString()}`);
        },
        get: (id: string) => apiFetch<Post>(`/posts/${id}`),
        create: (data: Partial<Post>) => apiFetch<Post>("/posts", {
            method: "POST",
            body: JSON.stringify(data),
        }),
        update: (id: string, data: Partial<Post>) => apiFetch<Post>(`/posts/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
        }),
        like: (id: string) => apiFetch(`/posts/${id}/like`, { method: "POST" }),
    },
    users: {
        list: () => apiFetch<User[]>("/users"),
    }
};
