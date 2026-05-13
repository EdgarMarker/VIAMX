import { getSanityClient } from "@/app/common/lib/sanity/sanity-client";
import { IMG, Block, SEO } from "./types";
import { safeString, safeImage, safeBlockText, safeSEO } from "../utils/safe";

export interface BlogPageInterface {
  hero: {
    string_hero_h1: string;
    rich_hero_title: Block[];
    img_hero_banner: IMG;
    string_hero_cta: string;
  };
  post: {
    rich_blog_title: Block[];
  };
  seo: SEO;
}

export const mapBlogPage = (raw: any): BlogPageInterface => ({
  hero: {
    string_hero_h1: safeString(raw?.hero?.string_hero_h1),
    rich_hero_title: safeBlockText(raw?.hero?.rich_hero_title),
    img_hero_banner: safeImage(raw?.hero?.img_hero_banner),
    string_hero_cta: safeString(raw?.hero?.string_hero_cta),
  },
  post: {
    rich_blog_title: safeBlockText(raw?.post?.rich_blog_title),
  },
  seo: safeSEO(raw?.seo),
});

export const BLOGPAGE_FIELDS = `
  hero {
    string_hero_h1,
    rich_hero_title,
    "img_hero_banner": img_hero_banner {
      "media": asset->{url},
      "alt": altText
    },
    string_hero_cta
  },
  post {
    rich_blog_title
  },
  seo {
    string_titleSeo,
    text_descSeo,
    text_keySeo
  }
`;

export const getBlogPage = async (): Promise<BlogPageInterface> => {
  const query = `*[_type == "blogPage"][0] { ${BLOGPAGE_FIELDS} }`;
  const data = await getSanityClient().fetch(query);
  return mapBlogPage(data);
};
