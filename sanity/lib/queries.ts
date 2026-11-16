import { defineQuery } from "next-sanity";

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{"name": coalesce(name, "Anonymous"), picture},
`;

export const heroQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) [0] {
    content,
    ${postFields}
  }
`);

export const moreStoriesQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`);

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content,
    ${postFields}
  }
`);

export const allPostQuery = defineQuery(`
*[ _type == "project" ]{
        _id,
        _type,
        _createdAt,
        _updatedAt,
        _rev,
        name,
        medium,
        rank,
        vimeo,
        content,
        "slug": slug.current,
        "tags": tags[]->{ _id, title, "slug": slug.current },
        orientation,
        year,
        role,
        "cover": coalesce(cover, thumbnail.blurhash){
          "url": asset->url,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height,
          "lqip": asset->metadata.lqip,
          alt
        },
        program,
        date
      } | order(date desc)
`);

export const projectMetaQuery = defineQuery(`
*[_type == "project" && (slug.current == $slug || _id == $slug)][0]{
  name,
  "slug": slug.current,
  "description": pt::text(content),
  "image": coalesce(cover, thumbnail.blurhash).asset->url
}
`);

export const infoQuery = defineQuery(`
* [_type == "info"] {...}
`);

export const tagQuery = defineQuery(`
*[ _type == "tag" ]{
    _id,
    title,
    slug,
  }
`);
