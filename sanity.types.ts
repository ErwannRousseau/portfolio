/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

import type { PortableTextBlock } from "next-sanity";
import type { Image } from "sanity";

export type SanityImagePaletteSwatch = {
  _type: "sanity.imagePaletteSwatch";
  background?: string;
  foreground?: string;
  population?: number;
  title?: string;
};

export type SanityImagePalette = {
  _type: "sanity.imagePalette";
  darkMuted?: SanityImagePaletteSwatch;
  lightVibrant?: SanityImagePaletteSwatch;
  darkVibrant?: SanityImagePaletteSwatch;
  vibrant?: SanityImagePaletteSwatch;
  dominant?: SanityImagePaletteSwatch;
  lightMuted?: SanityImagePaletteSwatch;
  muted?: SanityImagePaletteSwatch;
};

export type SanityImageDimensions = {
  _type: "sanity.imageDimensions";
  height?: number;
  width?: number;
  aspectRatio?: number;
};

export type SanityFileAsset = {
  _id: string;
  _type: "sanity.fileAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  source?: SanityAssetSourceData;
};

export type Geopoint = {
  _type: "geopoint";
  lat?: number;
  lng?: number;
  alt?: number;
};

export type Tags = {
  _id: string;
  _type: "tags";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name: string;
  color: RgbaColor;
};

export type BlockContent = Array<
  | {
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
      listItem?: "bullet";
      markDefs?: Array<{
        href?: string;
        icon?: {
          asset?: {
            _ref: string;
            _type: "reference";
            _weak?: boolean;
            [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
          };
          hotspot?: SanityImageHotspot;
          crop?: SanityImageCrop;
          _type: "image";
        };
        _type: "link";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    }
  | {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt?: string;
      _type: "image";
      _key: string;
    }
  | ({
      _key: string;
    } & Code)
>;

export type Post = {
  _id: string;
  _type: "post";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: LocalizedString;
  subtitle?: LocalizedString;
  slug: Slug;
  mainImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  };
  publishedAt?: string;
  body?: LocalizedBlockContent;
  likeCount: number;
  likedBy: Array<string> | null;
};

export type Slug = {
  _type: "slug";
  current: string;
  source?: string;
};

export type Skills = {
  _type: "skills";
  name?: string;
  icon?: string;
  color?: string;
};

export type Works = {
  _type: "works";
  icon?: string;
  title: string;
  job: string;
  link?: string;
  tags?: Array<Tags>;
  duration: Duration;
};

export type Duration = {
  _type: "duration";
  start: string;
  end?: string;
  current?: boolean;
};

export type Projects = {
  _type: "projects";
  title?: string;
  description?: string;
  link?: string;
  icon?: string;
};

export type Home = {
  _id: string;
  _type: "home";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  subtitle?: string;
  profilePicture?: Image;
  overview?: BlockContent | PortableTextBlock;
  projects?: Array<
    {
      _key: string;
    } & Projects
  >;
  works?: Array<
    {
      _key: string;
    } & Works
  >;
  skills?: Array<
    {
      _key: string;
    } & Skills
  >;
};

export type LocalizedBlockContent = {
  _type: "localizedBlockContent";
  en?: BlockContent;
  fr?: BlockContent;
};

export type SanityImageCrop = {
  _type: "sanity.imageCrop";
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type SanityImageHotspot = {
  _type: "sanity.imageHotspot";
  x?: number;
  y?: number;
  height?: number;
  width?: number;
};

export type SanityImageAsset = {
  _id: string;
  _type: "sanity.imageAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  metadata?: SanityImageMetadata;
  source?: SanityAssetSourceData;
};

export type SanityAssetSourceData = {
  _type: "sanity.assetSourceData";
  name?: string;
  id?: string;
  url?: string;
};

export type SanityImageMetadata = {
  _type: "sanity.imageMetadata";
  location?: Geopoint;
  dimensions?: SanityImageDimensions;
  palette?: SanityImagePalette;
  lqip?: string;
  blurHash?: string;
  hasAlpha?: boolean;
  isOpaque?: boolean;
};

export type LocalizedString = {
  _type: "localizedString";
  en?: string;
  fr?: string;
};

export type Code = {
  _type: "code";
  language: string;
  filename?: string;
  code: string;
  highlightedLines?: Array<number>;
};

export type Color = {
  _type: "color";
  hex?: string;
  alpha?: number;
  hsl?: HslaColor;
  hsv?: HsvaColor;
  rgb?: RgbaColor;
};

export type RgbaColor = {
  _type: "rgbaColor";
  r: number;
  g: number;
  b: number;
  a: number;
};

export type HsvaColor = {
  _type: "hsvaColor";
  h?: number;
  s?: number;
  v?: number;
  a?: number;
};

export type HslaColor = {
  _type: "hslaColor";
  h?: number;
  s?: number;
  l?: number;
  a?: number;
};
export declare const internalGroqTypeReferenceTo: unique symbol;

// Source: sanity/lib/queries.ts
// Variable: HOME_QUERY
// Query: *[_type == "home"][0]{    _id,    title,    "subtitle" : coalesce(      subtitle[$lang],       subtitle[$defaultLocale]    ),    "overview" : coalesce(      overview[$lang],       overview[$defaultLocale]    ),    profilePicture,    projects[]{      ...,       "description" : coalesce(        description[$lang],         description[$defaultLocale]      ),    },    works[]{      ...,      "tags": tags[]->{        "name" : coalesce(          name[$lang],           name[$defaultLocale]        ),        "color" : color.rgb      },      "job" : coalesce(        job[$lang],         job[$defaultLocale]      ),    },    skills  }
export type HOME_QUERYResult = {
  _id: string;
  title: string | null;
  subtitle: string | null;
  overview: BlockContent | null;
  profilePicture: Image;
  projects: Array<Projects> | null;
  works: Array<Works> | null;
  skills: Array<Skills> | null;
} | null;

// Variable: BLOG_QUERY
// Query: *[_type == "post" && defined(slug)]{  "title" : coalesce(    title[$lang],     title[$defaultLocale]  ),  "subtitle": coalesce(    subtitle[$lang],    subtitle[$defaultLocale]  ),  mainImage}
export type BLOG_QUERYResult = Array<{
  title: string | null;
  subtitle: string | null;
  mainImage: Image;
  publishedAt?: string;
  slug: Slug;
}>;

// Variable: POST_QUERY
// Query: *[_type == "post" && slug.current == $slug][0]
export type POST_QUERYResult = {
  _id: string;
  _type: "post";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  subtitle?: string;
  slug?: Slug;
  mainImage: Image;
  publishedAt?: string;
  body?: BlockContent;
  likeCount: number;
  likedBy: Array<string> | null;
} | null;

// Variable: POST_BY_ID_QUERY
// Query: *[_type == "post" && _id == $id]{  likeCount,  likedBy}
export type POST_BY_ID_QUERYResult = {
  likeCount: number;
  likedBy: Array<string> | null;
  slug: Slug;
};

// Variable: SLUGS_QUERY
// Query: *[_type == "post" && defined(slug)].slug.current
export type SLUGS_QUERYResult = Array<string | null>;
