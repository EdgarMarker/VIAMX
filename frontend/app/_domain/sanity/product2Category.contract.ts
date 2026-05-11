import { getSanityClient } from "@/app/common/lib/sanity/sanity-client";
import { SEO, SLUG } from "./types";
import { safeString, safeSEO, safeSlug } from "../utils/safe";

export interface Product2CategoryInterface {
    general: {
        string_category_name: string;
        slug: SLUG;
    };
    seo: SEO;
}

export const mapProduct2Category = (raw: any): Product2CategoryInterface => ({
    general: {
        string_category_name: safeString(raw?.general?.string_category_name),
        slug: safeSlug(raw?.general?.slug),
    },
    seo: safeSEO(raw?.seo),
});

export const PRODUCT2CATEGORY_FIELDS = `
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

export const getProduct2Categories = async (): Promise<Product2CategoryInterface[]> => {
    const query = `*[_type == "product2Category"] { ${PRODUCT2CATEGORY_FIELDS} }`;
    const data = await getSanityClient().fetch(query);
    return Array.isArray(data) ? data.map(mapProduct2Category) : [];
};

export const getProduct2CategoryBySlug = async (slug: string): Promise<Product2CategoryInterface | null> => {
    const query = `*[_type == "product2Category" && slug.current == $slug][0] { ${PRODUCT2CATEGORY_FIELDS} }`;
    const data = await getSanityClient().fetch(query, { slug });
    return data ? mapProduct2Category(data) : null;
};
