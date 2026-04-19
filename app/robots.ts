import type { MetadataRoute } from "next"
import { getSiteUrl } from "@/lib/site-url"

const siteUrl = getSiteUrl()

export default function robots(): MetadataRoute.Robots {
  const host = new URL(siteUrl).host

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin-login", "/login", "/patient", "/customer", "/api"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host,
  }
}
