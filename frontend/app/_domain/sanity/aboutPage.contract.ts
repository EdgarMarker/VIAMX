import { getSanityClient } from "@/app/common/lib/sanity/sanity-client";
import { IMG, Block, SEO } from "./types";
import { safeString, safeImage, safeNumber, safeBlockText, safeSEO, safeArray } from "../utils/safe";

export interface AboutPageInterface {
  hero: {
    string_hero_h1: string;
    rich_hero_title: Block[];
    img_hero_banner: IMG;
    string_hero_cta: string;
  };
  intro: {
    rich_intro_sectionTitle: Block[];
    img_intro_sectionImage: IMG;
  };
  values: {
    rich_values_sectionTitle: Block[];
    img_values_sectionImage: IMG;
    arr_values_valuesList: {
      string_values_valueTitle: string;
      textarea_values_valueDescription: string;
      icon_values_valueIcon: IMG;
    }[];
  };
  ourTeam: {
    rich_ourTeam_sectionTitle: Block[];
    arr_ourTeam_list: {
      string_ourTeam_name: string;
      string_ourTeam_position: string;
      string_ourTeam_phone: string;
      string_ourTeam_email: string;
      img_ourTeam_image: IMG;
    }[];
  };
  results: {
    rich_results_sectionTitle: Block[];
    arr_results_list: {
      string_results_list_item_prefix: string;
      number_results_list_item_value: number;
      string_results_list_item_suffix: string;
      string_results_list_item_label: string;
      img_results_list_item_icon: IMG;
    }[];
  };
  faqs: {
    rich_faqs_sectionTitle: Block[];
    arr_faqs_list: {
      string_faqs_question: string;
      rich_faqs_answer: Block[];
    }[];
  };
  seo: SEO;
}

export const mapAboutPage = (raw: any): AboutPageInterface => ({
  hero: {
    string_hero_h1: safeString(raw?.hero?.string_hero_h1),
    rich_hero_title: safeBlockText(raw?.hero?.rich_hero_title),
    img_hero_banner: safeImage(raw?.hero?.img_hero_banner),
    string_hero_cta: safeString(raw?.hero?.string_hero_cta),
  },
  intro: {
    rich_intro_sectionTitle: safeBlockText(raw?.intro?.rich_intro_sectionTitle),
    img_intro_sectionImage: safeImage(raw?.intro?.img_intro_sectionImage),
  },
  values: {
    rich_values_sectionTitle: safeBlockText(raw?.values?.rich_values_sectionTitle),
    img_values_sectionImage: safeImage(raw?.values?.img_values_sectionImage),
    arr_values_valuesList: safeArray(raw?.values?.arr_values_valuesList, (item: any) => ({
      string_values_valueTitle: safeString(item?.string_values_valueTitle),
      textarea_values_valueDescription: safeString(item?.textarea_values_valueDescription),
      icon_values_valueIcon: safeImage(item?.icon_values_valueIcon),
    })),
  },
  ourTeam: {
    rich_ourTeam_sectionTitle: safeBlockText(raw?.ourTeam?.rich_ourTeam_sectionTitle),
    arr_ourTeam_list: safeArray(raw?.ourTeam?.arr_ourTeam_list, (item: any) => ({
      string_ourTeam_name: safeString(item?.string_ourTeam_name),
      string_ourTeam_position: safeString(item?.string_ourTeam_position),
      string_ourTeam_phone: safeString(item?.string_ourTeam_phone),
      string_ourTeam_email: safeString(item?.string_ourTeam_email),
      img_ourTeam_image: safeImage(item?.img_ourTeam_image),
    })),
  },
  results: {
    rich_results_sectionTitle: safeBlockText(raw?.results?.rich_results_sectionTitle),
    arr_results_list: safeArray(raw?.results?.arr_results_list, (item: any) => ({
      string_results_list_item_prefix: safeString(item?.string_results_list_item_prefix),
      number_results_list_item_value: safeNumber(item?.number_results_list_item_value),
      string_results_list_item_suffix: safeString(item?.string_results_list_item_suffix),
      string_results_list_item_label: safeString(item?.string_results_list_item_label),
      img_results_list_item_icon: safeImage(item?.img_results_list_item_icon),
    })),
  },
  faqs: {
    rich_faqs_sectionTitle: safeBlockText(raw?.faqs?.rich_faqs_sectionTitle),
    arr_faqs_list: safeArray(raw?.faqs?.arr_faqs_list, (item: any) => ({
      string_faqs_question: safeString(item?.string_faqs_question),
      rich_faqs_answer: safeBlockText(item?.rich_faqs_answer),
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
    string_hero_cta,
  },
  intro {
    rich_intro_sectionTitle,
    "img_intro_sectionImage": img_intro_sectionImage {
      "media": asset->{url},
      "alt": altText
    }
  },
  values {
    rich_values_sectionTitle,
    "img_values_sectionImage": img_values_sectionImage {
      "media": asset->{url},
      "alt": altText
    },
    arr_values_valuesList[] {
      string_values_valueTitle,
      textarea_values_valueDescription,
      "icon_values_valueIcon": icon_values_valueIcon {
        "media": asset->{url},
        "alt": altText
      }
    }
  },
  ourTeam {
    rich_ourTeam_sectionTitle,
    arr_ourTeam_list[] {
      string_ourTeam_name,
      string_ourTeam_position,
      string_ourTeam_phone,
      string_ourTeam_email,
      "img_ourTeam_image": img_ourTeam_image {
        "media": asset->{url},
        "alt": altText
      }
    }
  },
  results {
    rich_results_sectionTitle,
    "arr_results_list": arr_results_list_list[] {
      string_results_list_item_prefix,
      number_results_list_item_value,
      string_results_list_item_suffix,
      string_results_list_item_label,
      "img_results_list_item_icon": img_results_list_item_icon {
        "media": asset->{url},
        "alt": altText
      }
    }
  },
  faqs {
    rich_faqs_sectionTitle,
    arr_faqs_list[] {
      string_faqs_question,
      rich_faqs_answer
    }
  },
  seo {
    string_titleSeo,
    text_descSeo,
    text_keySeo
  }
`;


export const getAboutPage = async (): Promise<AboutPageInterface> => {
  const query = `* [_type == "aboutPage"][0] { ${ABOUTPAGE_FIELDS} } `;
  const data = await getSanityClient().fetch(query);
  return mapAboutPage(data);
};


