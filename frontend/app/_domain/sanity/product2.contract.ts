import { getSanityClient } from "@/app/common/lib/sanity/sanity-client";
import { IMG, Block, SEO, SLUG } from "./types";
import { safeString, safeImage, safeBlockText, safeSEO, safeSlug, safeReference, safeArray } from "../utils/safe";
import { mapProduct2Category, PRODUCT2CATEGORY_FIELDS, Product2CategoryInterface } from "./product2Category.contract";
import { mapAmenity, AMENITY_FIELDS, AmenityInterface } from "./amenity.contract";

export interface Product2Interface {
  general: {
    string_general_title: string;
    slug: SLUG;
    ref_general_category: Product2CategoryInterface | null;
    date: string;
    textarea_general_cardExcerpt: string;
    img_general_primaryImg: IMG;
  };
  intro: {
    rich_intro_description: Block[];
    img_intro_img: IMG;
  };
  models: {
    rich_models_title: Block[];
    arr_models_list: {
      string_models_modelName: string;
      rich_models_modelDescription: Block[];
      img_models_modelImg: IMG;
    }[];
  };
  amenities: {
    rich_amenities_title: Block[];
    arr_ref_amenities_amenityList: AmenityInterface[];
  };
  gallery: {
    rich_gallery_title: Block[];
    list_gallery: IMG[];
  };
  dividers: {
    img_divider1_dividerImg: IMG;
    img_divider2_dividerImg: IMG;
    img_divider3_dividerImg: IMG;
  };
  video: {
    bool_video_hasVideo: boolean;
    string_video_url: string;
    img_video_fallbackImg: IMG | null;
  };
  seo: SEO;
}

const safeImageOrNull = (img: any) => {
  // si no hay url real, regresa null (no placeholder)
  if (!img?.media?.url) return null;
  return safeImage(img);
};

export const mapProduct2 = (raw: any): Product2Interface => ({
  general: {
    string_general_title: safeString(raw?.general?.string_general_title),
    slug: safeSlug(raw?.general?.slug),
    ref_general_category: safeReference(raw?.general?.ref_general_category, mapProduct2Category),
    date: safeString(raw?.general?.date),
    textarea_general_cardExcerpt: safeString(raw?.general?.textarea_general_cardExcerpt),
    img_general_primaryImg: safeImage(raw?.general?.img_general_primaryImg),
  },
  intro: {
    rich_intro_description: safeBlockText(raw?.intro?.rich_intro_description),
    img_intro_img: safeImage(raw?.intro?.img_intro_img),
  },
  models: {
    rich_models_title: safeBlockText(raw?.models?.rich_models_title),
    arr_models_list: safeArray(raw?.models?.arr_models_list, (item: any) => ({
      string_models_modelName: safeString(item?.string_models_modelName),
      rich_models_modelDescription: safeBlockText(item?.rich_models_modelDescription),
      img_models_modelImg: safeImage(item?.img_models_modelImg),
    })),
  },
  amenities: {
    rich_amenities_title: safeBlockText(raw?.amenities?.rich_amenities_title),
    arr_ref_amenities_amenityList: safeArray(raw?.amenities?.arr_ref_amenities_amenityList, mapAmenity),
  },
  gallery: {
    rich_gallery_title: safeBlockText(raw?.gallery?.rich_gallery_title),
    list_gallery: safeArray(raw?.gallery?.list_gallery, safeImage),
  },
  dividers: {
    img_divider1_dividerImg: safeImage(raw?.dividers?.img_divider1_dividerImg),
    img_divider2_dividerImg: safeImage(raw?.dividers?.img_divider2_dividerImg),
    img_divider3_dividerImg: safeImage(raw?.dividers?.img_divider3_dividerImg),
  },
  video: {
    bool_video_hasVideo: Boolean(raw?.video?.bool_video_hasVideo),
    string_video_url: safeString(raw?.video?.string_video_url),
    img_video_fallbackImg: safeImageOrNull(raw?.video?.img_video_fallbackImg),
  },
  seo: safeSEO(raw?.seo),
});

export const PRODUCT2_FIELDS = `
  general {
    string_general_title,
    slug,
    "ref_general_category": ref_general_category->{ ${PRODUCT2CATEGORY_FIELDS} },
    date,
    textarea_general_cardExcerpt,
    "img_general_primaryImg": img_general_primaryImg {
      "media": asset->{url},
      "alt": altText
    }
  },
  intro {
    rich_intro_description,
    "img_intro_img": img_intro_img {
      "media": asset->{url},
      "alt": altText
    }
  },
  models {
    rich_models_title,
    arr_models_list[] {
      string_models_modelName,
      rich_models_modelDescription,
      "img_models_modelImg": img_models_modelImg {
        "media": asset->{url},
        "alt": altText
      }
    }
  },
  amenities {
    rich_amenities_title,
    "arr_ref_amenities_amenityList": arr_ref_amenities_amenityList[]->{ ${AMENITY_FIELDS} }
  },
  gallery {
    rich_gallery_title,
    list_gallery[] {
      "media": asset->{url},
      "alt": altText
    }
  },
  dividers {
    "img_divider1_dividerImg": img_divider1_dividerImg {
      "media": asset->{url},
      "alt": altText
    },
    "img_divider2_dividerImg": img_divider2_dividerImg {
      "media": asset->{url},
      "alt": altText
    },
    "img_divider3_dividerImg": img_divider3_dividerImg {
      "media": asset->{url},
      "alt": altText
    }
  },
  video {
    bool_video_hasVideo,
    string_video_url,
    "img_video_fallbackImg": img_video_fallbackImg {
       "media": asset->{url},
       "alt": altText
    }
  },
  seo {
    string_titleSeo,
    text_descSeo,
    text_keySeo
  }
`;


export const getProducts2 = async (): Promise<Product2Interface[]> => {
  const query = `*[_type == "product2"] { ${PRODUCT2_FIELDS} }`;
  const data = await getSanityClient().fetch(query);
  return Array.isArray(data) ? data.map(mapProduct2) : [];
};

export const getProduct2BySlug = async (slug: string): Promise<Product2Interface | null> => {
  const query = `*[_type == "product2" && slug.current == ${slug}][0] { ${PRODUCT2_FIELDS} }`;
  const data = await getSanityClient().fetch(query);
  return data ? mapProduct2(data) : null;
};
