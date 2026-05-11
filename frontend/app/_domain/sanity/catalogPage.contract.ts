import { getSanityClient } from "@/app/common/lib/sanity/sanity-client";
import { IMG, Block, SEO } from "./types";
import { safeString, safeImage, safeNumber, safeBlockText, safeSEO, safeArray } from "../utils/safe";

export interface CatalogPageInterface {
  producto: {
    obj_producto_hero: {
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
    rich_producto_title: Block[];
    obj_producto_seo: SEO;
  };
  servicio: {
    obj_servicio_hero: {
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
    rich_servicio_title: Block[];
    obj_servicio_seo: SEO;
  };
}

export const mapCatalogPage = (raw: any): CatalogPageInterface => ({
  producto: {
    obj_producto_hero: {
      string_hero_h1: safeString(raw?.producto?.obj_producto_hero?.string_hero_h1),
      rich_hero_title: safeBlockText(raw?.producto?.obj_producto_hero?.rich_hero_title),
      img_hero_banner: safeImage(raw?.producto?.obj_producto_hero?.img_hero_banner),
      string_hero_cta: safeString(raw?.producto?.obj_producto_hero?.string_hero_cta),
      arr_hero_metrics_list: safeArray(raw?.producto?.obj_producto_hero?.arr_hero_metrics_list, (item: any) => ({
        string_hero_metrics_item_prefix: safeString(item?.string_hero_metrics_item_prefix),
        number_hero_metrics_item_value: safeNumber(item?.number_hero_metrics_item_value),
        string_hero_metrics_item_suffix: safeString(item?.string_hero_metrics_item_suffix),
        string_hero_metrics_item_label: safeString(item?.string_hero_metrics_item_label),
      })),
    },
    rich_producto_title: safeBlockText(raw?.producto?.rich_producto_title),
    obj_producto_seo: safeSEO(raw?.producto?.obj_producto_seo),
  },
  servicio: {
    obj_servicio_hero: {
      string_hero_h1: safeString(raw?.servicio?.obj_servicio_hero?.string_hero_h1),
      rich_hero_title: safeBlockText(raw?.servicio?.obj_servicio_hero?.rich_hero_title),
      img_hero_banner: safeImage(raw?.servicio?.obj_servicio_hero?.img_hero_banner),
      string_hero_cta: safeString(raw?.servicio?.obj_servicio_hero?.string_hero_cta),
      arr_hero_metrics_list: safeArray(raw?.servicio?.obj_servicio_hero?.arr_hero_metrics_list, (item: any) => ({
        string_hero_metrics_item_prefix: safeString(item?.string_hero_metrics_item_prefix),
        number_hero_metrics_item_value: safeNumber(item?.number_hero_metrics_item_value),
        string_hero_metrics_item_suffix: safeString(item?.string_hero_metrics_item_suffix),
        string_hero_metrics_item_label: safeString(item?.string_hero_metrics_item_label),
      })),
    },
    rich_servicio_title: safeBlockText(raw?.servicio?.rich_servicio_title),
    obj_servicio_seo: safeSEO(raw?.servicio?.obj_servicio_seo),
  },
});

export const CATALOGPAGE_FIELDS = `
  producto {
    obj_producto_hero {
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
    rich_producto_title,
    obj_producto_seo {
      string_titleSeo,
      text_descSeo,
      text_keySeo
    }
  },
  servicio {
    obj_servicio_hero {
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
    rich_servicio_title,
    obj_servicio_seo {
      string_titleSeo,
      text_descSeo,
      text_keySeo
    }
  }
`;

export const getCatalogPage = async (): Promise<CatalogPageInterface> => {
  const query = `*[_type == "catalogPage"][0] { ${CATALOGPAGE_FIELDS} }`;
  const data = await getSanityClient().fetch(query);
  return mapCatalogPage(data);
};

export const getCatalogProductSEO = async () => {
  const page = await getCatalogPage();
  return { seo: page.producto.obj_producto_seo };
};

export const getCatalogProduct2SEO = async () => {
  const page = await getCatalogPage();
  return { seo: page.servicio.obj_servicio_seo };
};
