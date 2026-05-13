import { getSanityClient } from "@/app/common/lib/sanity/sanity-client";
import { Block, SEO } from "./types";
import { safeBlockText, safeSEO } from "../utils/safe";

export interface CatalogPageInterface {
  Desarrollo: {
    rich_Desarrollo_title: Block[];
    obj_Desarrollo_seo: SEO;
  };
}

export const mapCatalogPage = (raw: any): CatalogPageInterface => ({
  Desarrollo: {
    rich_Desarrollo_title: safeBlockText(raw?.Desarrollo?.rich_Desarrollo_title),
    obj_Desarrollo_seo: safeSEO(raw?.Desarrollo?.obj_Desarrollo_seo),
  },
});

export const CATALOGPAGE_FIELDS = `
  Desarrollo {
    rich_Desarrollo_title,
    obj_Desarrollo_seo {
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
  return { seo: page.Desarrollo.obj_Desarrollo_seo };
};

export const getCatalogProduct2SEO = async () => {
  const page = await getCatalogPage();
  return { seo: page.Desarrollo.obj_Desarrollo_seo };
};
