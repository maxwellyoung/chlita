import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://chlita.com", // Update with your domain
      lastModified: new Date(),
    },
  ];
}
