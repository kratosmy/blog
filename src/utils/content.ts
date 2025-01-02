import { getCollection } from "astro:content";
import groupBy from "lodash/groupBy";
import keys from "lodash/keys";
import { DateTime } from "luxon";

export const getAllPosts = async (
  locale: string,
  tag: string,
) => {
  const allPosts = await getCollection("posts");
  const filteredPosts = allPosts
    .map((i) => ({
      ...i.data,
      url: `/posts/${i.slug}/`,
    }))
    .filter((d) => {
      if (!d) return false;
      if (tag) {
        return d.date && !d.isDraft && d.tags && d.tags.includes(tag);
      }
      return !d.isDraft && d.date;
    })
    .sort((a, b) => {
      return (
        DateTime.fromJSDate(b.date).toMillis() -
        DateTime.fromJSDate(a.date).toMillis()
      );
    });

  return {
    posts: filteredPosts,
    tags: new Set(
      filteredPosts
        .filter((i) => i.tags)
        .map((i) => i.tags)
        .flat(),
    ),
  };
};
