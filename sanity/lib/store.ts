import * as queryStore from "@sanity/react-loader";

import type { Locale } from "@/i18n.config";
import { i18n } from "@/i18n.config";
import type { HOME_QUERYResult } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { token } from "@/sanity/lib/token";
import { HOME_QUERY } from "./queries";

queryStore.setServerClient(client.withConfig({ token }));

export const { loadQuery } = queryStore;

export function loadHomePage(lang: Locale) {
  return loadQuery<HOME_QUERYResult>(HOME_QUERY, {
    lang,
    defaultLocale: i18n.defaultLocale,
  });
}
