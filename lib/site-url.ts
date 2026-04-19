const DEFAULT_SITE_URL = "https://www.medlinediagnosticlabs.com"

export function getSiteUrl() {
  const configuredSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL).trim().replace(/\/+$/, "")

  if (/^https?:\/\/medlinediagnosticlabs\.com$/i.test(configuredSiteUrl)) {
    return DEFAULT_SITE_URL
  }

  return configuredSiteUrl || DEFAULT_SITE_URL
}

