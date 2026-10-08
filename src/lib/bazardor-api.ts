import type { Category } from "@/types/bazardor";

const BASE_URL = "https://api.api-store.workers.dev/api/bazardor";

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/categories`, {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}