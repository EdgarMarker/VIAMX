import { getSanityClient } from "@/app/common/lib/sanity/sanity-client";
import { IMG } from "./types";
import { safeString, safeImage } from "../utils/safe";

export interface AmenityInterface {
  name: string;
  iconSet: string;
  iconName: string;
  customIcon: IMG;
}

export const mapAmenity = (raw: any): AmenityInterface => ({
  name: safeString(raw?.name),
  iconSet: safeString(raw?.iconSet),
  iconName: safeString(raw?.iconName),
  customIcon: safeImage(raw?.customIcon),
});

export const AMENITY_FIELDS = `
  name,
  iconSet,
  iconName,
  "customIcon": customIcon {
    "media": asset->{url},
    "alt": altText
  }
`;

export const getAmenitys = async (): Promise<AmenityInterface[]> => {
  const query = `*[_type == "amenity"] { ${AMENITY_FIELDS} }`;
  const data = await getSanityClient().fetch(query);
  return Array.isArray(data) ? data.map(mapAmenity) : [];
};

export const getAmenityBySlug = async (slug: string): Promise<AmenityInterface | null> => {
  const query = `*[_type == "amenity" && slug.current == $slug][0] { ${AMENITY_FIELDS} }`;
  const data = await getSanityClient().fetch(query, { slug });
  return data ? mapAmenity(data) : null;
};
