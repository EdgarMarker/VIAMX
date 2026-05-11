/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMG, Block, SEO, SLUG } from "../sanity/types";

export const DEFAULTS = {
  STRING: "",
  NUMBER: 0,
  IMAGE: {
    _type: "image" as const,
    media: { url: "https://picsum.photos/id/1/1440/900" },
    alt: { altText: "Image Example" },
  },
  SEO: {
    string_titleSeo: "",
    text_descSeo: "",
    text_keySeo: "",
  },
  SLUG: {
    _type: "slug" as const,
    current: "",
  },
};

export const safeString = (value: unknown): string =>
  typeof value === "string" ? value.trim() : DEFAULTS.STRING;

export const safeNumber = (value: unknown): number => {
  if (typeof value === "number") return value;
  const parsed = Number(value);
  return isNaN(parsed) ? DEFAULTS.NUMBER : parsed;
};


export const safeImage = (value?: Partial<IMG>): IMG => ({
  ...DEFAULTS.IMAGE,
  _type: "image",
  media: { url: value?.media?.url || DEFAULTS.IMAGE.media.url },
  alt: { altText: safeString(value?.alt?.altText) },
});

export const safeSlug = (value?: Partial<SLUG>): SLUG => ({
  _type: "slug",
  current: safeString(value?.current),
});

export const safeSEO = (value?: Partial<SEO>): SEO => ({
  string_titleSeo: safeString(value?.string_titleSeo),
  text_descSeo: safeString(value?.text_descSeo),
  text_keySeo: safeString(value?.text_keySeo),
});


const transformBlock = (node: any): any => {
  if (!node) return null;

  // Imágenes
  if (node?._type === "image") {
    return safeImage(node);
  }

  // Blocks
  if (node?._type === "block") {
    return {
      ...node,
      style: node?.style || "normal",
      markDefs: Array.isArray(node?.markDefs) ? node.markDefs : [],
      children: Array.isArray(node?.children)
        ? node.children.map((child: any) => ({
            ...child,
            _type: child?._type || "span",
            // ✅ NO uses safeString aquí (no trim)
            text: typeof child?.text === "string" ? child.text : "",
            marks: Array.isArray(child?.marks) ? child.marks : [],
          }))
        : [],
    };
  }

  return node;
};

export const safeBlockText = (blocks: unknown): any[] => {
  if (!Array.isArray(blocks)) return []; // <-- importante: NO regreses un block dummy

  return blocks
    .map(transformBlock)
    .filter(Boolean);
};


export const safeArray = <T, R>(
  items: T[] | unknown,
  mapper: (item: T) => R,
): R[] => {
  return Array.isArray(items) ? items.map(mapper) : [];
};


export function safeReference<T>(
  value: unknown,
  mapper: (raw: any) => T
): T | null {
  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    return mapper(value);
  }
  return null;
}