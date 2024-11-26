import { Icons, Spacing, buttonVariants } from "@/components/ui";
import { ThemeToggle } from "@/components/utils/theme-toggle";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Nav from "./nav";

export default async function Header() {
  return (
    <header className="p-4">
      <div className="flex items-baseline">
        <h2 className="font-semibold text-2xl max-[415px]:text-lg">
          erwannrousseau.dev
        </h2>
        <div className="flex-1" />
        <div className="flex gap-2">
          <Link
            target="_blank"
            href="https://github.com/ErwannRousseau"
            className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
          >
            <Icons.Github size={20} />
          </Link>
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/erwannrousseauwebdev/"
            className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
          >
            <Icons.LinkedIn size={20} />
          </Link>
          <ThemeToggle />
        </div>
      </div>
      <Spacing size="xs" />
      <Nav />
    </header>
  );
}
