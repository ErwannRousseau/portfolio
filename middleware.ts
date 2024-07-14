// middleware.ts
import { createI18nMiddleware } from "next-international/middleware";
import type { NextRequest } from "next/server";
import { i18n } from "./i18n.config";

const I18nMiddleware = createI18nMiddleware({
  locales: i18n.locales,
  defaultLocale: i18n.defaultLocale,
});

export function middleware(request: NextRequest) {
  return I18nMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|studio|robots.txt).*)",
  ],
};
