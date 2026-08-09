import { cacheLife } from "next/cache";
import { Spacing } from "../ui/spacing";
import LocaleSwitcher from "../utils/locale-switcher";

async function getCurrentYear() {
  "use cache";
  cacheLife("max");
  return new Date().getFullYear();
}

export default async function Footer() {
  return (
    <>
      <Spacing size="md" />
      <footer className="px-4 text-secondary-foreground text-sm">
        <div className="flex justify-between">
          <span>© {await getCurrentYear()} · Erwann Rousseau</span>
          <LocaleSwitcher />
        </div>
        <Spacing size="sm" />
      </footer>
    </>
  );
}
