import type { MetadataRoute } from "next";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
} from "@/lib/seo/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Kitty Color",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#fffbf7",
    theme_color: "#ff6b9d",
    lang: "en-US",
    categories: ["kids", "entertainment", "games"],
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
