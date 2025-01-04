import type { NextConfig } from 'next'
import createMDX from '@next/mdx'
import rehypeSlug from 'rehype-slug'

const nextConfig: NextConfig = {
  pageExtensions: ['mdx', 'ts', 'tsx'],
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [rehypeSlug],
  },
})

export default withMDX(nextConfig)
