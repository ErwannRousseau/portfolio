import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, useCdn } from "../env";

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  perspective:
    process.env.NODE_ENV === "production" ? "published" : "previewDrafts",
  stega: {
    enabled: false,
    studioUrl: "/studio",
  },
  token: process.env.SANITY_API_TOKEN,
});
