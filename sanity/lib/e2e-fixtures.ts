import type { Locale } from "@/i18n.config";
import type {
  BLOG_QUERY_RESULT,
  HOME_QUERY_RESULT,
  SLUGS_QUERY_RESULT,
} from "@/sanity.types";

const overview = (text: string) => [
  {
    _type: "block" as const,
    _key: "overview",
    style: "normal" as const,
    markDefs: [],
    children: [
      {
        _type: "span" as const,
        _key: "overview-text",
        marks: [],
        text,
      },
    ],
  },
];

const icon = '<svg aria-hidden="true" viewBox="0 0 1 1"></svg>';

const e2eHomePages = {
  en: {
    _id: "e2e-home",
    title: "Fixture portfolio",
    subtitle: "Full-stack developer",
    overview: overview("A stable fixture for browser smoke tests."),
    profilePicture: null,
    projects: [
      {
        _key: "e2e-project",
        _type: "projects" as const,
        title: "Fixture project",
        description: "An isolated project fixture.",
        link: "https://example.com/fixture-project",
        icon,
      },
    ],
    works: [
      {
        _key: "e2e-work",
        _type: "works" as const,
        title: "Fixture work",
        job: "Software engineer",
        link: "https://example.com/fixture-work",
        icon,
        duration: {
          _type: "duration" as const,
          start: "2024-01-01",
          current: true,
        },
        tags: [
          {
            name: "Fixture",
            color: { _type: "rgbaColor" as const, r: 59, g: 130, b: 246 },
          },
        ],
      },
    ],
    skills: [
      {
        _key: "e2e-skill",
        _type: "skills" as const,
        name: "TypeScript",
        icon,
        color: "59 130 246",
      },
    ],
  },
  fr: {
    _id: "e2e-home",
    title: "Fixture portfolio",
    subtitle: "Développeur full-stack",
    overview: overview("Une donnée stable pour le smoke navigateur."),
    profilePicture: null,
    projects: [
      {
        _key: "e2e-project",
        _type: "projects" as const,
        title: "Fixture project",
        description: "Un projet isolé pour le smoke navigateur.",
        link: "https://example.com/fixture-project",
        icon,
      },
    ],
    works: [
      {
        _key: "e2e-work",
        _type: "works" as const,
        title: "Fixture work",
        job: "Ingénieur logiciel",
        link: "https://example.com/fixture-work",
        icon,
        duration: {
          _type: "duration" as const,
          start: "2024-01-01",
          current: true,
        },
        tags: [
          {
            name: "Fixture",
            color: { _type: "rgbaColor" as const, r: 59, g: 130, b: 246 },
          },
        ],
      },
    ],
    skills: [
      {
        _key: "e2e-skill",
        _type: "skills" as const,
        name: "TypeScript",
        icon,
        color: "59 130 246",
      },
    ],
  },
} satisfies Record<Locale, NonNullable<HOME_QUERY_RESULT>>;

export function loadE2EHomePage(lang: Locale) {
  return { data: e2eHomePages[lang] };
}

export function loadE2EBlogPage() {
  return { data: [] satisfies BLOG_QUERY_RESULT };
}

export function loadE2EPostSlugs() {
  return { data: [] satisfies SLUGS_QUERY_RESULT };
}
