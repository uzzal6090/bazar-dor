import type { Category, Product } from "@/types/bazardor";

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

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`, {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  const products = await getProducts();

  return products.filter((product) => product.category === category);
}

export async function getCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  const categories = await getCategories();

  return categories.find((category) => category.slug === slug) ?? null;
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | null> {
  const products = await getProducts();

  return products.find((product) => product.slug === slug) ?? null;
}