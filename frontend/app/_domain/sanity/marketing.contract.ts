import { getSanityClient } from "@/app/common/lib/sanity/sanity-client";
import { safeString } from "../utils/safe";

export interface MarketingInterface {
  meta: {
    string_meta_pixelId: string;
    string_meta_testEventCode: string;
    bool_meta_enableCapi: boolean;
  };
  google: {
    string_google_gtmId: string;
    string_google_apiMapsKey: string;
  };
}

export const mapMarketing = (raw: any): MarketingInterface => ({
  meta: {
    string_meta_pixelId: safeString(raw?.meta?.string_meta_pixelId),
    string_meta_testEventCode: safeString(raw?.meta?.string_meta_testEventCode),
    bool_meta_enableCapi: Boolean(raw?.meta?.bool_meta_enableCapi),
  },
  google: {
    string_google_gtmId: safeString(raw?.google?.string_google_gtmId),
    string_google_apiMapsKey: safeString(raw?.google?.string_google_apiMapsKey),
  },
});

export const MARKETING_FIELDS = `
  meta {
    string_meta_pixelId,
    string_meta_testEventCode,
    bool_meta_enableCapi
  },
  google {
    string_google_gtmId,
    string_google_apiMapsKey
  }
`;

export const getMarketing = async (): Promise<MarketingInterface> => {
  const query = `*[_type == "marketing"][0] { ${MARKETING_FIELDS} }`;
  const data = await getSanityClient().fetch(query);
  return mapMarketing(data);
};
