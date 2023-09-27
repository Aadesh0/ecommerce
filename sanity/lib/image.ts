import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";

import { dataset, projectId } from "../env";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "NEXT_PUBLIC_SANITY_PROJECT_ID",
  dataset: dataset || "NEXT_PUBLIC_SANITY_DATASET",
});

export const urlForImage = (source: Image) => {
  return imageBuilder?.image(source).auto("format").fit("max");
};
