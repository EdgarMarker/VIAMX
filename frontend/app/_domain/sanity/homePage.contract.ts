import { getSanityClient } from "@/app/common/lib/sanity/sanity-client";
import { IMG, Block, SEO } from "./types";
import { safeString, safeImage, safeNumber, safeBlockText, safeSEO, safeArray, safeReference } from "../utils/safe";
import { mapTestimonial, TESTIMONIAL_FIELDS, TestimonialInterface } from "./testimonial.contract";

export interface HomePageInterface {
  hero: {
    string_hero_h1: string;
    rich_hero_title: Block[];
    img_hero_banner: IMG;
    string_hero_cta: string;
  };
  intro: {
    rich_intro_title: Block[];
  };
  about: {
    rich_about_title: Block[];
    textarea_about_p1: string;
    textarea_about_p2: string;
    arr_about_coldNumbers_list: {
      string_about_coldNumbers_item_prefix: string;
      number_about_coldNumbers_item_value: number;
      string_about_coldNumbers_item_suffix: string;
      string_about_coldNumbers_item_label: string;
      img_about_coldNumbers_item_icon: IMG;
    }[];
    img_about_banner: IMG;
    rich_about_title2: Block[];
    textarea_about_p3: string;
    textarea_about_p4: string;
  };
  ourMethod: {
    rich_ourMethod_title: Block[];
    img_ourMethod_banner: IMG;
    arr_ourMethod_list: {
      string_ourMethod_h2: string;
      textarea_ourMethod_p: string;
    }[];
  };
  testy: {
    rich_testy_testyTitle: Block[];
    arr_ref_testy_testyList: TestimonialInterface[];
  };
  seo: SEO;
}

export const mapHomePage = (raw: any): HomePageInterface => ({
  hero: {
    string_hero_h1: safeString(raw?.hero?.string_hero_h1),
    rich_hero_title: safeBlockText(raw?.hero?.rich_hero_title),
    img_hero_banner: safeImage(raw?.hero?.img_hero_banner),
    string_hero_cta: safeString(raw?.hero?.string_hero_cta),
  },
  intro: {
    rich_intro_title: safeBlockText(raw?.intro?.rich_intro_title),
  },
  about: {
    rich_about_title: safeBlockText(raw?.about?.rich_about_title),
    textarea_about_p1: safeString(raw?.about?.textarea_about_p1),
    textarea_about_p2: safeString(raw?.about?.textarea_about_p2),
    arr_about_coldNumbers_list: safeArray(raw?.about?.arr_about_coldNumbers_list, (item: any) => ({
      string_about_coldNumbers_item_prefix: safeString(item?.string_about_coldNumbers_item_prefix),
      number_about_coldNumbers_item_value: safeNumber(item?.number_about_coldNumbers_item_value),
      string_about_coldNumbers_item_suffix: safeString(item?.string_about_coldNumbers_item_suffix),
      string_about_coldNumbers_item_label: safeString(item?.string_about_coldNumbers_item_label),
      img_about_coldNumbers_item_icon: safeImage(item?.img_about_coldNumbers_item_icon),
    })),
    img_about_banner: safeImage(raw?.about?.img_about_banner),
    rich_about_title2: safeBlockText(raw?.about?.rich_about_title2),
    textarea_about_p3: safeString(raw?.about?.textarea_about_p3),
    textarea_about_p4: safeString(raw?.about?.textarea_about_p4),
  },
  ourMethod: {
    rich_ourMethod_title: safeBlockText(raw?.ourMethod?.rich_ourMethod_title),
    img_ourMethod_banner: safeImage(raw?.ourMethod?.img_ourMethod_banner),
    arr_ourMethod_list: safeArray(raw?.ourMethod?.arr_ourMethod_list, (item: any) => ({
      string_ourMethod_h2: safeString(item?.string_ourMethod_h2),
      textarea_ourMethod_p: safeString(item?.textarea_ourMethod_p),
    })),
  },
  testy: {
    rich_testy_testyTitle: safeBlockText(raw?.testy?.rich_testy_testyTitle),
    arr_ref_testy_testyList: safeArray(raw?.testy?.arr_ref_testy_testyList, mapTestimonial),
  },
  seo: safeSEO(raw?.seo),
});

export const HOMEPAGE_FIELDS = `
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
    rich_intro_title
  },
  about {
    rich_about_title,
    textarea_about_p1,
    textarea_about_p2,
    "arr_about_coldNumbers_list": arr_about_coldNumbers_list[] {
      string_about_coldNumbers_item_prefix,
      number_about_coldNumbers_item_value,
      string_about_coldNumbers_item_suffix,
      string_about_coldNumbers_item_label,
      "img_about_coldNumbers_item_icon": img_about_coldNumbers_item_icon {
        "media": asset->{url},
        "alt": altText
      }
    },
    "img_about_banner": img_about_banner {
      "media": asset->{url},
      "alt": altText
    },
    rich_about_title2,
    textarea_about_p3,
    textarea_about_p4
  },
  ourMethod {
    rich_ourMethod_title,
    "img_ourMethod_banner": img_ourMethod_banner {
      "media": asset->{url},
      "alt": altText
    },
    arr_ourMethod_list[] {
      string_ourMethod_h2,
      textarea_ourMethod_p
    }
  },
  testy {
    rich_testy_testyTitle,
    "arr_ref_testy_testyList": arr_ref_testy_testyList[]->{ ${TESTIMONIAL_FIELDS} }
  },
  seo {
    string_titleSeo,
    text_descSeo,
    text_keySeo
  }
`;

export const getHomePage = async (): Promise<HomePageInterface> => {
  const query = `*[_type == "homePage"][0] { ${HOMEPAGE_FIELDS} }`;
  const data = await getSanityClient().fetch(query);
  return mapHomePage(data);
};
