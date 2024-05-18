import { Spacing } from "./ui";
import LocaleSwitcher from "./utils/locale-switcher";

export default function Footer() {
  return (
    <footer className="text-secondary-foreground text-sm">
      <div className="flex justify-between">
        <span>© {new Date().getFullYear()} · Erwann Rousseau</span>
        <LocaleSwitcher />
      </div>
      <Spacing size="sm" />
    </footer>
  );
}
