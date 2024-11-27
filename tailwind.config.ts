import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config = {
  darkMode: ["class"],
  content: ["./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      lineHeight: {
        4: "0.9rem",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
        serif: ["var(--font-subjectivity-serif)"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        badge: {
          DEFAULT: "rgba(var(--badge)/0.12)",
          border: "rgba(var(--badge)/0.24)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      typography: (theme: (path: string) => string) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.primary"),
            "--tw-prose-headings": theme("colors.primary"),
            "--tw-prose-bold": theme("colors.primary"),
            "--tw-prose-quote-borders": theme("colors.slate.300"),
            "--tw-prose-quotes": theme("colors.muted.foreground"),
            "--tw-prose-code": theme("colors.primary"),
            code: {
              "&::before, &::after": {
                display: "none",
              },
            },
            blockquote: {
              fontWeight: 400,
            },
          },
        },
      }),
    },
    keyframes: {
      "fade-out": {
        to: { opacity: "0" },
      },
    },
    animation: {
      "fade-out": "fade-out 300ms ease",
    },
  },
  plugins: [animate, typography],
} satisfies Config;

export default config;
