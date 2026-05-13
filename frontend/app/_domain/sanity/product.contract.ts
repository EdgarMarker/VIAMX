import { getSanityClient } from "@/app/common/lib/sanity/sanity-client";
import { IMG, Block, SLUG } from "./types";
import { safeString, safeImage, safeBlockText, safeSlug, safeArray } from "../utils/safe";
import { mapAmenity, AMENITY_FIELDS, AmenityInterface } from "./amenity.contract";

export interface ProductInterface {
  general: {
    string_general_name: string;
    slug: SLUG;
    textarea_general_card_dsc: string;
    img_general_card: IMG;
    img_general_hero: IMG;
    date: string;
  };
  intro: {
    rich_intro_title: Block[];
    textarea_intro_p: string;
    textarea_intro_p2: string;
    arr_intro_gallery: IMG[];
  };
  amenities: {
    rich_amenities_title: Block[];
    arr_ref_amenities_list: AmenityInterface[];
  };
  location: {
    rich_location_title: Block[];
    string_location_maps: string;
    string_location_api: string;
  };
}

export const mapProduct = (raw: any): ProductInterface => ({
  general: {
    string_general_name: safeString(raw?.general?.string_general_name),
    slug: safeSlug(raw?.general?.slug),
    textarea_general_card_dsc: safeString(raw?.general?.textarea_general_card_dsc),
    img_general_card: safeImage(raw?.general?.img_general_card),
    img_general_hero: safeImage(raw?.general?.img_general_hero),
    date: safeString(raw?.general?.date),
  },
  intro: {
    rich_intro_title: safeBlockText(raw?.intro?.rich_intro_title),
    textarea_intro_p: safeString(raw?.intro?.textarea_intro_p),
    textarea_intro_p2: safeString(raw?.intro?.textarea_intro_p2),
    arr_intro_gallery: safeArray(raw?.intro?.arr_intro_gallery, safeImage),
  },
  amenities: {
    rich_amenities_title: safeBlockText(raw?.amenities?.rich_amenities_title),
    arr_ref_amenities_list: safeArray(raw?.amenities?.arr_ref_amenities_list, mapAmenity),
  },
  location: {
    rich_location_title: safeBlockText(raw?.location?.rich_location_title),
    string_location_maps: safeString(raw?.location?.string_location_maps),
    string_location_api: safeString(raw?.location?.string_location_api),
  },
});

export const PRODUCT_FIELDS = `
  general {
    string_general_name,
    slug,
    textarea_general_card_dsc,
    "img_general_card": img_general_card {
      "media": asset->{url},
      "alt": altText
    },
    "img_general_hero": img_general_hero {
      "media": asset->{url},
      "alt": altText
    },
    date
  },
  intro {
    rich_intro_title,
    textarea_intro_p,
    textarea_intro_p2,
    "arr_intro_gallery": arr_intro_gallery[] {
      "media": asset->{url},
      "alt": altText
    }
  },
  amenities {
    rich_amenities_title,
    "arr_ref_amenities_list": arr_ref_amenities_list[]->{ ${AMENITY_FIELDS} }
  },
  location {
    rich_location_title,
    string_location_maps,
    string_location_api
  }
`;

export const getProducts = async (): Promise<ProductInterface[]> => {
  const query = `*[_type == "product"] | order(general.date desc) { ${PRODUCT_FIELDS} }`;
  const data = await getSanityClient().fetch(query);
  return Array.isArray(data) ? data.map(mapProduct) : [];
};

export const getProductBySlug = async (
  slug: string
): Promise<ProductInterface | null> => {
  if (!slug) return null;
  const query = `*[_type == "product" && general.slug.current == $slug][0] { ${PRODUCT_FIELDS} }`;
  const data = await getSanityClient().fetch(query, { slug });
  return data ? mapProduct(data) : null;
};
