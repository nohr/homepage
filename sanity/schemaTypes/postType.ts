import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const postType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "rank",
      type: "number",
    }),
    defineField({
      name: "thumbnail",
      type: "object",
      fields: [
        defineField({
          name: "video",
          type: "file",
          title: "Video",
        }),
        defineField({
          name: "blurhash",
          type: "image",
          title: "Blurhash",
        }),
      ],
    }),
    defineField({
      name: "vimeo",
      title: "Vimeo id",
      type: "string",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          name: "Image",
          title: "Image",
          type: "image",
        },
      ],
    }),
    defineField({
      name: "videos",
      title: "Videos",
      type: "array",
      of: [
        {
          name: "VideoObject",
          title: "Video Object",
          type: "object",
          fields: [
            {
              name: "url",
              title: "url",
              type: "file",
            },
            {
              type: "string",
              name: "alt",
              title: "Alt text",
            },
            {
              type: "boolean",
              name: "mobile",
              title: "Mobile",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "url",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "medium",
      type: "string",
    }),
    defineField({
      name: "program",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "tag" } })],
    }),
    defineField({
      name: "date",
      type: "datetime",
    }),
    defineField({
      name: "content",
      type: "blockContent",
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});
