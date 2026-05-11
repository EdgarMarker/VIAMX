import { getSanityClient } from "@/app/common/lib/sanity/sanity-client";
import { SEO, SLUG } from "./types";
import { safeString, safeSEO, safeSlug } from "../utils/safe";

export interface ProductCategoryInterface {
  general: {
    string_category_name: string;
    slug: SLUG;
  };
  seo: SEO;
}

export const mapProductCategory = (raw: any): ProductCategoryInterface => ({
  general: {
    string_category_name: safeString(raw?.general?.string_category_name),
    slug: safeSlug(raw?.general?.slug),
  },
  seo: safeSEO(raw?.seo),
});

export const PRODUCTCATEGORY_FIELDS = `
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

export const getProductCategories = async (): Promise<ProductCategoryInterface[]> => {
  const query = `*[_type == "productCategory"] { ${PRODUCTCATEGORY_FIELDS} }`;
  const data = await getSanityClient().fetch(query);
  return Array.isArray(data) ? data.map(mapProductCategory) : [];
};

export const getProductCategoryBySlug = async (slug: string): Promise<ProductCategoryInterface | null> => {
  const query = `*[_type == "productCategory" && slug.current == $slug][0] { ${PRODUCTCATEGORY_FIELDS} }`;
  const data = await getSanityClient().fetch(query, { slug });
  return data ? mapProductCategory(data) : null;
};
