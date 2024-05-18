"use client";

import { useTheme } from "next-themes";

import { Button, Icons } from "@/components/ui";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      <Icons.Sun
        size={20}
        className="dark:-rotate-90 rotate-0 scale-100 dark:scale-0"
      />
      <Icons.Moon
        size={20}
        className="absolute rotate-90 scale-0 dark:rotate-0 dark:scale-100"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
