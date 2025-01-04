import { promises as fs } from 'fs'
import { FC } from 'react'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'

type Props = {
  params: {
    slug: string
  }
}

type Frontmatter = {
  title: string
}

const Page: FC<Props> = async ({ params }) => {
  const content = await fs.readFile(
    path.join(process.cwd(), 'src/content', `${params.slug}.mdx`),
    'utf-8'
  )

  const data = await compileMDX<Frontmatter>({
    source: content,
    options: {
      parseFrontmatter: true,
    },
  })

  return <>{data.content}</>
}

export default Page
