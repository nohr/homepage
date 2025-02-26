import { type SchemaTypeDefinition } from "sanity";
import { postType } from "./postType";
import { tagType } from "./tagType";
import { blockContentType } from "./blockContentType";
import infoType from "./infoType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, tagType, blockContentType, infoType],
};
