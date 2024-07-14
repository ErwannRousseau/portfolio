import { Icons, Spacing, buttonVariants } from "@/components/ui";
import { ThemeToggle } from "@/components/utils/theme-toggle";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Nav from "./nav";

export default async function Header() {
  return (
    <header className="p-4">
      <div className="flex items-baseline">
        <h2 className="max-[415px]:text-lg">erwannrousseau.dev</h2>
        <div className="flex-1" />
        <ul className="flex gap-2">
          <Link
            target="_blank"
            href="https://github.com/ErwannRousseau"
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "p-0",
            )}
          >
            <Icons.Github size={20} />
          </Link>
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/erwannrousseauwebdev/"
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "p-0",
            )}
          >
            <Icons.LinkedIn size={20} />
          </Link>
          <ThemeToggle />
        </ul>
      </div>
      <Spacing size="xs" />
      <Nav />
    </header>
  );
}
