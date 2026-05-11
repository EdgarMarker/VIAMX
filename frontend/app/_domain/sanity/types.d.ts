export interface IMG {
  _type: "image";
  media: { url: string };
  alt: { altText: string };
}

export type IconPackage = "lucide" | "custom";

export interface Block {
  _type: "block" | "image";
  children?: Array<{ _type: "span"; text: string; marks?: string[] }>;
  style?: string;
  media?: { url: string };
  alt?: { altText: string };
}

export interface SEO {
  string_titleSeo: string;
  text_descSeo: string;
  text_keySeo: string;
}

export interface SLUG {
  _type: "slug";
  current: string;
}
