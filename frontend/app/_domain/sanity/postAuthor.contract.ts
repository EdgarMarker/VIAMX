import { getSanityClient } from "@/app/common/lib/sanity/sanity-client";
import { IMG } from "./types";
import { safeString, safeImage } from "../utils/safe";

export interface PostAuthorInterface {
  string_author_name: string;
  string_author_position: string;
  textarea_author_bio: string;
  img_author_picture: IMG;
}

export const mapPostAuthor = (raw: any): PostAuthorInterface => ({
  string_author_name: safeString(raw?.string_author_name),
  string_author_position: safeString(raw?.string_author_position),
  textarea_author_bio: safeString(raw?.textarea_author_bio),
  img_author_picture: safeImage(raw?.img_author_picture),
});

export const POSTAUTHOR_FIELDS = `
  string_author_name,
  string_author_position,
  textarea_author_bio,
  "img_author_picture": img_author_picture {
    "media": asset->{url},
    "alt": altText
  }
`;

export const getPostAuthors = async (): Promise<PostAuthorInterface[]> => {
  const query = `*[_type == "postAuthor"] { ${POSTAUTHOR_FIELDS} }`;
  const data = await getSanityClient().fetch(query);
  return Array.isArray(data) ? data.map(mapPostAuthor) : [];
};

export const getPostAuthorBySlug = async (slug: string): Promise<PostAuthorInterface | null> => {
  const query = `*[_type == "postAuthor" && slug.current == $slug][0] { ${POSTAUTHOR_FIELDS} }`;
  const data = await getSanityClient().fetch(query, { slug });
  return data ? mapPostAuthor(data) : null;
};
