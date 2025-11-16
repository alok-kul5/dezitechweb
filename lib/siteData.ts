import siteContent from "@/data/siteContent.json";

export type SiteContent = typeof siteContent;

let clientCache: SiteContent | null = null;

export const getSiteContentSync = (): SiteContent => siteContent;

export const loadSiteContent = async (): Promise<SiteContent> => {
  if (typeof window === "undefined") {
    return siteContent;
  }

  if (clientCache) {
    return clientCache;
  }

  const contentModule = await import("@/data/siteContent.json");
  clientCache = (contentModule.default ?? contentModule) as SiteContent;
  return clientCache;
};
