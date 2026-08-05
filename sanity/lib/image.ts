import { getImageDimensions } from "@sanity/asset-utils";
import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

import { dataset, projectId } from "../env";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});

type ImageSource = {
  asset?: {
    _ref?: string;
  };
};

export const urlForImage = (source: ImageSource | null | undefined) => {
  if (!source?.asset?._ref) {
    return undefined;
  }

  return imageBuilder
    .image(source as SanityImageSource)
    .auto("format")
    .fit("max");
};

export const getSanityImageDimensions = (
  source: ImageSource | null | undefined,
) => {
  const reference = source?.asset?._ref;

  return reference ? getImageDimensions(reference) : undefined;
};

export function urlForOpenGraphImage(image: ImageSource | null | undefined) {
  return urlForImage(image)?.width(1200).height(627).fit("crop").url();
}
