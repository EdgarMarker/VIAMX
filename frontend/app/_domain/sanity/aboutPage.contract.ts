import { getSanityClient } from "@/app/common/lib/sanity/sanity-client";
import { IMG, Block, SEO } from "./types";
import { safeString, safeImage, safeBlockText, safeSEO, safeArray } from "../utils/safe";

export interface AboutPageInterface {
  hero: {
    string_hero_h1: string;
    rich_hero_title: Block[];
    img_hero_banner: IMG;
    img_hero_banner2: IMG;
    string_hero_cta: string;
  };
  quote: {
    rich_quote_quote: Block[];
  };
  about: {
    rich_about_title: Block[];
    textarea_about_p: string;
    textarea_about_p2: string;
  };
  ourHistory: {
    rich_ourHistory_title: Block[];
    img_ourHistory_banner: IMG;
  };
  ourValues: {
    rich_ourValues_title: Block[];
    arr_ourValues_values: {
      string_ourValues_h2: string;
      textarea_ourValues_p: string;
    }[];
  };
  seo: SEO;
}

export const mapAboutPage = (raw: any): AboutPageInterface => ({
  hero: {
    string_hero_h1: safeString(raw?.hero?.string_hero_h1),
    rich_hero_title: safeBlockText(raw?.hero?.rich_hero_title),
    img_hero_banner: safeImage(raw?.hero?.img_hero_banner),
    img_hero_banner2: safeImage(raw?.hero?.img_hero_banner2),
    string_hero_cta: safeString(raw?.hero?.string_hero_cta),
  },
  quote: {
    rich_quote_quote: safeBlockText(raw?.quote?.rich_quote_quote),
  },
  about: {
    rich_about_title: safeBlockText(raw?.about?.rich_about_title),
    textarea_about_p: safeString(raw?.about?.textarea_about_p),
    textarea_about_p2: safeString(raw?.about?.textarea_about_p2),
  },
  ourHistory: {
    rich_ourHistory_title: safeBlockText(raw?.ourHistory?.rich_ourHistory_title),
    img_ourHistory_banner: safeImage(raw?.ourHistory?.img_ourHistory_banner),
  },
  ourValues: {
    rich_ourValues_title: safeBlockText(raw?.ourValues?.rich_ourValues_title),
    arr_ourValues_values: safeArray(raw?.ourValues?.arr_ourValues_values, (item: any) => ({
      string_ourValues_h2: safeString(item?.string_ourValues_h2),
      textarea_ourValues_p: safeString(item?.textarea_ourValues_p),
    })),
  },
  seo: safeSEO(raw?.seo),
});

export const ABOUTPAGE_FIELDS = `
  hero {
    string_hero_h1,
    rich_hero_title,
    "img_hero_banner": img_hero_banner {
      "media": asset->{url},
      "alt": altText
    },
    "img_hero_banner2": img_hero_banner2 {
      "media": asset->{url},
      "alt": altText
    },
    string_hero_cta
  },
  quote {
    rich_quote_quote
  },
  about {
    rich_about_title,
    textarea_about_p,
    textarea_about_p2
  },
  ourHistory {
    rich_ourHistory_title,
    "img_ourHistory_banner": img_ourHistory_banner {
      "media": asset->{url},
      "alt": altText
    }
  },
  ourValues {
    rich_ourValues_title,
    arr_ourValues_values[] {
      string_ourValues_h2,
      textarea_ourValues_p
    }
  },
  seo {
    string_titleSeo,
    text_descSeo,
    text_keySeo
  }
`;

export const getAboutPage = async (): Promise<AboutPageInterface> => {
  const query = `*[_type == "aboutPage"][0] { ${ABOUTPAGE_FIELDS} }`;
  const data = await getSanityClient().fetch(query);
  return mapAboutPage(data);
};
