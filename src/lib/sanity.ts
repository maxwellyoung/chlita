import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "9uid5kyv",
  dataset: "production",
  apiVersion: "2024-02-29",
  useCdn: false,
  perspective: "published",
});
