import { connection } from "next/server";
import { Suspense } from "react";
import { Spacing } from "../ui/spacing";
import LocaleSwitcher from "../utils/locale-switcher";

async function Copyright() {
  // TODO: Cache Components adoption. Added to unblock the build: remove this connection() to re-trigger the error and review the fix options.
  await connection();
  return <span>© {new Date().getFullYear()} · Erwann Rousseau</span>;
}

export default function Footer() {
  return (
    <>
      <Spacing size="md" />
      <footer className="px-4 text-secondary-foreground text-sm">
        <div className="flex justify-between">
          <Suspense fallback={<span>© Erwann Rousseau</span>}>
            <Copyright />
          </Suspense>
          <LocaleSwitcher />
        </div>
        <Spacing size="sm" />
      </footer>
    </>
  );
}
