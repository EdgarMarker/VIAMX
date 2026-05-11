import { getSanityClient } from "@/app/common/lib/sanity/sanity-client";
import { safeString } from "../utils/safe";

export interface TestimonialInterface {
  textarea_testimonial_content: string;
  string_testimonial_authorName: string;
  string_testimonial_authorLocation: string;
  grade: string;
}

export const mapTestimonial = (raw: any): TestimonialInterface => ({
  textarea_testimonial_content: safeString(raw?.textarea_testimonial_content),
  string_testimonial_authorName: safeString(raw?.string_testimonial_authorName),
  string_testimonial_authorLocation: safeString(raw?.string_testimonial_authorLocation),
  grade: safeString(raw?.grade),
});

export const TESTIMONIAL_FIELDS = `
  textarea_testimonial_content,
  string_testimonial_authorName,
  string_testimonial_authorLocation,
  grade
`;

export const getTestimonials = async (): Promise<TestimonialInterface[]> => {
  const query = `*[_type == "testimonial"] { ${TESTIMONIAL_FIELDS} }`;
  const data = await getSanityClient().fetch(query);
  return Array.isArray(data) ? data.map(mapTestimonial) : [];
};

