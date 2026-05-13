import { getSanityClient } from "@/app/common/lib/sanity/sanity-client";
import { Block, SEO } from "./types";
import { safeBlockText, safeSEO } from "../utils/safe";

export interface ContactPageInterface {
  intro: {
    rich_intro_sectionTitle: Block[];
  };
  seo: SEO;
}

export const mapContactPage = (raw: any): ContactPageInterface => ({
  intro: {
    rich_intro_sectionTitle: safeBlockText(raw?.intro?.rich_intro_sectionTitle),
  },
  seo: safeSEO(raw?.seo),
});

export const CONTACTPAGE_FIELDS = `
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
