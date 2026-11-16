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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      description: "Used in the project URL: /work/<slug>.",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      type: "number",
      validation: (rule) => rule.integer(),
    }),
    defineField({
      name: "role",
      type: "string",
    }),
    defineField({
      name: "orientation",
      type: "string",
      description: "Shape of the video or image. Replaces rank 3.",
      options: {
        list: [
          { title: "Landscape", value: "landscape" },
          { title: "Portrait", value: "portrait" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "cover",
      title: "Cover image",
      type: "image",
      description: "Shown when the project has no Vimeo id.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "rank",
      title: "Rank (legacy)",
      description: "Legacy: 3 meant portrait. Use Orientation instead.",
      type: "number",
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail (legacy)",
      description: "Legacy: use Cover image instead.",
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
      type: "number",
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
      title: "Medium (legacy)",
      description: "Legacy: use Tags instead.",
      type: "string",
    }),
    defineField({
      name: "program",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "tags",
      description: "Drives the filters in the nav.",
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
