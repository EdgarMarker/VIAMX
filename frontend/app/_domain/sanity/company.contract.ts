import { getSanityClient } from "@/app/common/lib/sanity/sanity-client";
import { IMG, Block } from "./types";
import { safeString, safeImage, safeNumber, safeBlockText, safeArray } from "../utils/safe";

export interface CompanyInterface {
  general: {
    string_general_name: string;
    icon_general_navLogo: IMG;
    string_general_brand: string;
    string_general_slogan: string;
    icon_general_footerLogo: IMG;
  };
  contact: {
    rich_contact_title: Block[];
    textarea_contact_hours: string;
    string_contact_email: string;
    string_contact_phone: string;
    string_contact_line_contact_wa: string;
    string_contact_address: string;
  };
  location: {
    url_location_googleMaps: string;
    number_location_latitude: number;
    number_location_longitude: number;
  };
  social: {
    arr_list: {
      string_social_name: string;
      url_social_url: string;
      icon_social_icon: IMG;
    }[];
  };
  policy: {
    rich_policy_privacyNotice: Block[];
    rich_policy_termsAndConditions: Block[];
  };
}

export const mapCompany = (raw: any): CompanyInterface => ({
  general: {
    string_general_name: safeString(raw?.general?.string_general_name),
    icon_general_navLogo: safeImage(raw?.general?.icon_general_navLogo),
    string_general_brand: safeString(raw?.general?.string_general_brand),
    string_general_slogan: safeString(raw?.general?.string_general_slogan),
    icon_general_footerLogo: safeImage(raw?.general?.icon_general_footerLogo),
  },
  contact: {
    rich_contact_title: safeBlockText(raw?.contact?.rich_contact_title),
    textarea_contact_hours: safeString(raw?.contact?.textarea_contact_hours),
    string_contact_email: safeString(raw?.contact?.string_contact_email),
    string_contact_phone: safeString(raw?.contact?.string_contact_phone),
    string_contact_line_contact_wa: safeString(raw?.contact?.string_contact_line_contact_wa),
    string_contact_address: safeString(raw?.contact?.string_contact_address),
  },
  location: {
    url_location_googleMaps: safeString(raw?.location?.url_location_googleMaps),
    number_location_latitude: safeNumber(raw?.location?.number_location_latitude),
    number_location_longitude: safeNumber(raw?.location?.number_location_longitude),
  },
  social: {
    arr_list: safeArray(raw?.social?.arr_list, (item: any) => ({
      string_social_name: safeString(item?.string_social_name),
      url_social_url: safeString(item?.url_social_url),
      icon_social_icon: safeImage(item?.icon_social_icon),
    })),
  },
  policy: {
    rich_policy_privacyNotice: safeBlockText(raw?.policy?.rich_policy_privacyNotice),
    rich_policy_termsAndConditions: safeBlockText(raw?.policy?.rich_policy_termsAndConditions),
  },
});

export const COMPANY_FIELDS = `
  general {
    string_general_name,
    "icon_general_navLogo": icon_general_navLogo {
      "media": asset->{url},
      "alt": altText
    },
    string_general_brand,
    string_general_slogan,
    "icon_general_footerLogo": icon_general_footerLogo {
      "media": asset->{url},
      "alt": altText
    }
  },
  contact {
    rich_contact_title,
    textarea_contact_hours,
    string_contact_email,
    string_contact_phone,
    string_contact_line_contact_wa,
    string_contact_address
  },
  location {
    url_location_googleMaps,
    number_location_latitude,
    number_location_longitude
  },
  social {
    arr_list[] {
      string_social_name,
      url_social_url,
      "icon_social_icon": icon_social_icon {
        "media": asset->{url},
        "alt": altText
      }
    }
  },
  policy {
    rich_policy_privacyNotice,
    rich_policy_termsAndConditions
  }
`;

export const getCompany = async (): Promise<CompanyInterface> => {
  const query = `*[_type == "company"][0] { ${COMPANY_FIELDS} }`;
  const data = await getSanityClient().fetch(query);
  return mapCompany(data);
};

