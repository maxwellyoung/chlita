import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "9uid5kyv",
  dataset: "production",
  apiVersion: "2024-02-29",
  useCdn: true,
  perspective: "published",
});

// Helper function to build image URL (if needed)
export function buildImageUrl(ref: string) {
  return `https://cdn.sanity.io/images/${client.config().projectId}/${
    client.config().dataset
  }/${ref}`;
}
