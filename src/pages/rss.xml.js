import rss from '@astrojs/rss'
import { listPostsForRss } from '../utils/content'
import { feedMetadata } from '../utils/publishing'

export const prerender = true

export async function GET(context) {
  return rss({
    ...feedMetadata(context.site),
    items: await listPostsForRss(),
  })
}
