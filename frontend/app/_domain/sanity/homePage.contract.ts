import { getSanityClient } from "@/app/common/lib/sanity/sanity-client";
import { IMG, Block, SEO } from "./types";
import { safeString, safeImage, safeNumber, safeBlockText, safeSEO, safeArray } from "../utils/safe";
import { mapProduct, PRODUCT_FIELDS, ProductInterface } from "./product.contract";
import { mapPost, POST_FIELDS, PostInterface } from "./post.contract";
import { mapTestimonial, TESTIMONIAL_FIELDS, TestimonialInterface } from "./testimonial.contract";
import { CloudCog } from "lucide-react";

export interface HomePageInterface {
  hero: {
    string_hero_h1: string;
    rich_hero_title: Block[];
    img_hero_banner: IMG;
    string_hero_cta: string;
  };
  recentProduct: {
    rich_recentProduct_sectionTitle: Block[];
    arr_ref_recentProduct_Productos: ProductInterface[];
  };
  recentPosts: {
    rich_recentPosts_sectionTitle: Block[];
    arr_ref_recentPosts_posts: PostInterface[];
  };
  testy: {
    rich_testy_testyTitle: Block[];
    arr_ref_testy_testyList: TestimonialInterface[];
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
  seo: SEO;
}

export const mapHomePage = (raw: any): HomePageInterface => ({
  hero: {
    string_hero_h1: safeString(raw?.hero?.string_hero_h1),
    rich_hero_title: safeBlockText(raw?.hero?.rich_hero_title),
    img_hero_banner: safeImage(raw?.hero?.img_hero_banner),
    string_hero_cta: safeString(raw?.hero?.string_hero_cta),
  },
  recentProduct: {
    rich_recentProduct_sectionTitle: safeBlockText(raw?.recentProduct?.rich_recentProduct_sectionTitle),
    arr_ref_recentProduct_Productos: safeArray(raw?.recentProduct?.arr_ref_recentProduct_Productos, mapProduct),
  },
  recentPosts: {
    rich_recentPosts_sectionTitle: safeBlockText(raw?.recentPosts?.rich_recentPosts_sectionTitle),
    arr_ref_recentPosts_posts: safeArray(raw?.recentPosts?.arr_ref_recentPosts_posts, mapPost),
  },
  testy: {
    rich_testy_testyTitle: safeBlockText(raw?.testy?.rich_testy_testyTitle),
    arr_ref_testy_testyList: safeArray(raw?.testy?.arr_ref_testy_testyList, mapTestimonial),
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
    string_hero_cta,
    arr_hero_metrics_list[] {
      string_hero_metrics_item_prefix,
      number_hero_metrics_item_value,
      string_hero_metrics_item_suffix,
      string_hero_metrics_item_label
    }
  },
  recentProduct {
    rich_recentProduct_sectionTitle,
    "arr_ref_recentProduct_Productos": arr_ref_recentProduct_Productos[]->{ ${PRODUCT_FIELDS} }
  },
  recentPosts {
    rich_recentPosts_sectionTitle,
    "arr_ref_recentPosts_posts": arr_ref_recentPosts_posts[]->{ ${POST_FIELDS} }
  },
  testy {
    rich_testy_testyTitle,
    "arr_ref_testy_testyList": arr_ref_testy_testyList[]->{ ${TESTIMONIAL_FIELDS} }
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

