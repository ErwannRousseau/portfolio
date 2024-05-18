/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { pageStructure, singletonPlugin } from "@/sanity/plugins/settings";
import { schema } from "@/sanity/schema";
import home from "@/sanity/schemas/singletons/home";
import { colorInput } from "@sanity/color-input";
import { languageFilter } from "@sanity/language-filter";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { languages } from "./i18n.config";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({
      structure: pageStructure([home]),
    }),
    singletonPlugin([home.name]),
    visionTool({ defaultApiVersion: apiVersion }),
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: "/api/draft",
        },
      },
    }),
    languageFilter({
      supportedLanguages: languages.locales,
      defaultLanguages: [languages.defaultLocale],
      apiVersion,
    }),
    colorInput(),
  ],
});
