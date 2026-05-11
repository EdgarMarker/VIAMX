import { getSanityClient } from "@/app/common/lib/sanity/sanity-client";
import { IMG, Block, SEO } from "./types";
import { safeString, safeImage, safeNumber, safeBlockText, safeSEO, safeArray } from "../utils/safe";

export interface ContactPageInterface {
  hero: {
    string_hero_h1: string;
    rich_hero_title: Block[];
    img_hero_banner: IMG;
    string_hero_cta: string;
    arr_hero_metrics_list: {
      string_hero_metrics_item_prefix: string;
      number_hero_metrics_item_value: number;
      string_hero_metrics_item_suffix: string;
      string_hero_metrics_item_label: string;
    }[];
  };
  intro: {
    rich_intro_sectionTitle: Block[];
  };
  seo: SEO;
}

export const mapContactPage = (raw: any): ContactPageInterface => ({
  hero: {
    string_hero_h1: safeString(raw?.hero?.string_hero_h1),
    rich_hero_title: safeBlockText(raw?.hero?.rich_hero_title),
    img_hero_banner: safeImage(raw?.hero?.img_hero_banner),
    string_hero_cta: safeString(raw?.hero?.string_hero_cta),
    arr_hero_metrics_list: safeArray(raw?.hero?.arr_hero_metrics_list, (item: any) => ({
      string_hero_metrics_item_prefix: safeString(item?.string_hero_metrics_item_prefix),
      number_hero_metrics_item_value: safeNumber(item?.number_hero_metrics_item_value),
      string_hero_metrics_item_suffix: safeString(item?.string_hero_metrics_item_suffix),
      string_hero_metrics_item_label: safeString(item?.string_hero_metrics_item_label),
    })),
  },
  intro: {
    rich_intro_sectionTitle: safeBlockText(raw?.intro?.rich_intro_sectionTitle),
  },
  seo: safeSEO(raw?.seo),
});

export const CONTACTPAGE_FIELDS = `
  hero {
    string_hero_h1,
    rich_hero_title,
    "img_hero_banner": img_hero_banner {
      "media": asset->{url},
      "alt": altText
    },
    string_hero_cta,
    arr_hero_metrics_list[] {
      string_hero_metrics_item_prefix,
      number_hero_metrics_item_value,
      string_hero_metrics_item_suffix,
      string_hero_metrics_item_label
    }
  },
  intro {
    rich_intro_sectionTitle
  },
  seo {
    string_titleSeo,
    text_descSeo,
    text_keySeo
  }
`;

export const getContactPage = async (): Promise<ContactPageInterface> => {
  const query = `*[_type == "contactPage"][0] { ${CONTACTPAGE_FIELDS} }`;
  const data = await getSanityClient().fetch(query);
  return mapContactPage(data);
};


