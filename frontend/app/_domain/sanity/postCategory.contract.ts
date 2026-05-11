import { getSanityClient } from "@/app/common/lib/sanity/sanity-client";
import { SEO, SLUG } from "./types";
import { safeString, safeSEO, safeSlug } from "../utils/safe";

export interface PostCategoryInterface {
  general: {
    string_category_name: string;
    slug: SLUG;
  };
  seo: SEO;
}

export const mapPostCategory = (raw: any): PostCategoryInterface => ({
  general: {
    string_category_name: safeString(raw?.general?.string_category_name),
    slug: safeSlug(raw?.general?.slug),
  },
  seo: safeSEO(raw?.seo),
});

export const POSTCATEGORY_FIELDS = `
  general {
    string_category_name,
    slug
  },
  seo {
    string_titleSeo,
    text_descSeo,
    text_keySeo
  }
`;

export const getPostCategories = async (): Promise<PostCategoryInterface[]> => {
  const query = `*[_type == "postCategory"] { ${POSTCATEGORY_FIELDS} }`;
  const data = await getSanityClient().fetch(query);
  return Array.isArray(data) ? data.map(mapPostCategory) : [];
};

export const getPostCategoryBySlug = async (slug: string): Promise<PostCategoryInterface | null> => {
  const query = `*[_type == "postCategory" && slug.current == $slug][0] { ${POSTCATEGORY_FIELDS} }`;
  const data = await getSanityClient().fetch(query, { slug });
  return data ? mapPostCategory(data) : null;
};
