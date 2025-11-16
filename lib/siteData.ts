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

  const contentModule: { default: SiteContent } = await import("@/data/siteContent.json");
  clientCache = contentModule.default;
  return clientCache;
};
