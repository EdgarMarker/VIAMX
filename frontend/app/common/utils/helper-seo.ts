import type { Metadata } from "next";
import type { SEO } from "@/app/_domain/sanity/types";

/**
 * Generates a Next.js Metadata object from a SEO contract object.
 * This is the refined version of the previous createMetadata.
 * 
 * @param seo - The SEO data from the contract
 * @returns Metadata object for Next.js
 */
export const createMetadata = (seo?: SEO): Metadata => {
  return {
    title: seo?.string_titleSeo || "Marker",
    description: seo?.text_descSeo || "",
    keywords: seo?.text_keySeo || "",
    // You can add more default fields here like openGraph, twitter, etc.
  };
};

/**
 * A helper to simplify metadata generation in Next.js Server Components.
 * 
 * @example
 * export async function generateMetadata() {
 *   return getPageMetadata(getAboutPage);
 * }
 * 
 * @param fetcher - The async function that retrieves the page data (must include a 'seo' field)
 * @returns A promise that resolves to Next.js Metadata
 */
export async function getPageMetadata<T extends { seo: SEO }>(
  fetcher: () => Promise<T | null | undefined>
): Promise<Metadata> {
  try {
    const data = await fetcher();
    return createMetadata(data?.seo);
  } catch (error) {
    console.error("[SEO Helper] Error generating metadata:", error);
    return createMetadata();
  }
}
