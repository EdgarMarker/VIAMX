import { getSanityClient } from "@/app/common/lib/sanity/sanity-client";
import { IMG, Block, SEO, SLUG } from "./types";
import { safeString, safeImage, safeBlockText, safeSEO, safeSlug, safeReference } from "../utils/safe";
import { mapPostCategory, POSTCATEGORY_FIELDS, PostCategoryInterface } from "./postCategory.contract";
import { mapPostAuthor, POSTAUTHOR_FIELDS, PostAuthorInterface } from "./postAuthor.contract";

export interface PostInterface {
  general: {
    string_general_title: string;
    slug: SLUG;
    ref_general_category: PostCategoryInterface | null;
    date: string;
    ref_general_author: PostAuthorInterface | null;
    textarea_general_cardExcerpt: string;
    img_general_primaryImg: IMG;
  };
  page: {
    rich_page_content: Block[];
  };
  seo: SEO;
}

export const mapPost = (raw: any): PostInterface => ({
  general: {
    string_general_title: safeString(raw?.general?.string_general_title),
    slug: safeSlug(raw?.general?.slug),
    ref_general_category: safeReference(raw?.general?.ref_general_category, mapPostCategory),
    date: safeString(raw?.general?.date),
    ref_general_author: safeReference(raw?.general?.ref_general_author, mapPostAuthor),
    textarea_general_cardExcerpt: safeString(raw?.general?.textarea_general_cardExcerpt),
    img_general_primaryImg: safeImage(raw?.general?.img_general_primaryImg),
  },
  page: {
    rich_page_content: safeBlockText(raw?.page?.rich_page_content),
  },
  seo: safeSEO(raw?.seo),
});

export const POST_FIELDS = `
  general {
    string_general_title,
    slug,
    "ref_general_category": ref_general_category->{ ${POSTCATEGORY_FIELDS} },
    date,
    "ref_general_author": ref_general_author->{ ${POSTAUTHOR_FIELDS} },
    textarea_general_cardExcerpt,
    "img_general_primaryImg": img_general_primaryImg {
      "media": asset->{url},
      "alt": altText
    }
  },
  page {
    rich_page_content[]{
      ...,
      _type == "image" => {
        "media": asset -> { url },
        "alt": altText
      }
    }
  },
  seo {
    string_titleSeo,
    text_descSeo,
    text_keySeo
  }
`;

export const getPosts = async (): Promise<PostInterface[]> => {
  const query = `*[_type == "post"] | order(general.date desc) { ${POST_FIELDS} }`;
  const data = await getSanityClient().fetch(query);
  return Array.isArray(data) ? data.map(mapPost) : [];
};

export const getPostBySlug = async (slug: string): Promise<PostInterface | null> => {
  const query = `*[_type == "post" && general.slug.current == $slug][0] { ${POST_FIELDS} }`;
  const data = await getSanityClient().fetch(query, { slug });
  return data ? mapPost(data) : null;
};