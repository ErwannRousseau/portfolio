import type { SchemaTypeDefinition } from "sanity";

import blockContent from "./schemas/objects/blockContent";
import duration from "./schemas/objects/duration";
import localizedBlockContent from "./schemas/objects/localizedBlockContent";
import localizedString from "./schemas/objects/localizedString";
import tags from "./schemas/objects/tags";
import post from "./schemas/post";
import projects from "./schemas/projects";
import home from "./schemas/singletons/home";
import skills from "./schemas/skills";
import works from "./schemas/works";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    home,
    projects,
    works,
    skills,
    post,
    // Objects
    localizedString,
    localizedBlockContent,
    blockContent,
    tags,
    duration,
  ],
};
