import type { Product } from "~/types/intake-form/checkout";
import productsList from "./productsList.json";

// --- PRODUCT DATA ---
// This is the master list of all available products.
export const products: Product[] = productsList as Product[];

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getPopularProducts(): Product[] {
  return products.filter((product) => product.popular);
}

// --- CATEGORY LABELS ---
// Mapping of category keys to display names
export const categoryLabels: Record<string, string> = {
  "weight-loss": "Weight Loss",
  "sexual health": "Sexual",
  "wellness": "Wellness",
  "hair": "Hair",
  "skin": "Skin",
  "energy": "Energy",
  // Add more category mappings as needed
};

// --- UTILITY FUNCTION ---
/**
 * Gets all unique categories that have at least one product
 * @returns Array of category strings that exist in the products array
 */
export function getAvailableCategories(): string[] {
  const categories = new Set<string>();
  products.forEach((product) => {
    if (product.category) {
      categories.add(product.category);
    }
  });
  return Array.from(categories);
}