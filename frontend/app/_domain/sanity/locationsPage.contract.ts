import { getSanityClient } from "@/app/common/lib/sanity/sanity-client";
import { Block, SEO } from "./types";
import { safeString, safeBlockText, safeSEO, safeArray } from "../utils/safe";

export interface LocationsPageInterface {
  hero: {
    string_hero_h1: string;
    rich_hero_title: Block[];
    string_hero_cta: string;
  };
  intro: {
    rich_intro_title: Block[];
    textarea_intro_p: string;
    textarea_intro_p2: string;
  };
  faqs: {
    rich_faqs_title: Block[];
    arr_faqs_list: {
      string_faqs_h3: string;
      textarea_faqs_p: string;
    }[];
  };
  seo: SEO;
}

export const mapLocationsPage = (raw: any): LocationsPageInterface => ({
  hero: {
    string_hero_h1: safeString(raw?.hero?.string_hero_h1),
    rich_hero_title: safeBlockText(raw?.hero?.rich_hero_title),
    string_hero_cta: safeString(raw?.hero?.string_hero_cta),
  },
  intro: {
    rich_intro_title: safeBlockText(raw?.intro?.rich_intro_title),
    textarea_intro_p: safeString(raw?.intro?.textarea_intro_p),
    textarea_intro_p2: safeString(raw?.intro?.textarea_intro_p2),
  },
  faqs: {
    rich_faqs_title: safeBlockText(raw?.faqs?.rich_faqs_title),
    arr_faqs_list: safeArray(raw?.faqs?.arr_faqs_list, (item: any) => ({
      string_faqs_h3: safeString(item?.string_faqs_h3),
      textarea_faqs_p: safeString(item?.textarea_faqs_p),
    })),
  },
  seo: safeSEO(raw?.seo),
});

export const LOCATIONSPAGE_FIELDS = `
  hero {
    string_hero_h1,
    rich_hero_title,
    "img_hero_banner": img_hero_banner {
      "media": asset->{url},
      "alt": altText
    },
    string_hero_cta
  },
  intro {
    rich_intro_title,
    textarea_intro_p,
    textarea_intro_p2
  },
  faqs {
    rich_faqs_title,
    arr_faqs_list[] {
      string_faqs_h3,
      textarea_faqs_p
    }
  },
  seo {
    string_titleSeo,
    text_descSeo,
    text_keySeo
  }
`;

export const getLocationsPage = async (): Promise<LocationsPageInterface> => {
  const query = `*[_type == "locationsPage"][0] { ${LOCATIONSPAGE_FIELDS} }`;
  const data = await getSanityClient().fetch(query);
  return mapLocationsPage(data);
};
