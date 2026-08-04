import rss from '@astrojs/rss'
import MarkdownIt from 'markdown-it'
import { listPostsForRss } from '../utils/content'

export const prerender = true

const parser = new MarkdownIt()

export async function GET(context) {
  const blog = await listPostsForRss()
  const items = blog.map((post) => {
    const content = post.body ? parser.render(post.body) : ''
    return {
      title: post.data.title ?? post.slug,
      description: post.data.title ?? '',
      link: post.link,
      pubDate: new Date(post.data.date),
      content,
    }
  })

  return rss({
    title: "Kratos's blog",
    description: 'A place to write down my tech life.',
    site: context.site ?? 'https://kratosmy.github.io',
    items,
  })
}
