import { promises as fs } from 'fs'
import path from 'path'
import Link from 'next/link'
import { compileMDX } from 'next-mdx-remote/rsc'

import styles from './styles.module.scss'
import { DateTime } from 'luxon'

type Frontmatter = {
  title: string
  description: string
  date: string
}

const Page = async () => {
  const filenames = await fs.readdir(path.join(process.cwd(), 'src/content'))

  const blogs = await Promise.all(
    filenames.map(async (filename) => {
      const content = await fs.readFile(
        path.join(process.cwd(), 'src/content', filename),
        'utf-8'
      )
      const { frontmatter } = await compileMDX<Frontmatter>({
        source: content,
        options: {
          parseFrontmatter: true,
        },
      })
      return {
        filename,
        slug: filename.replace('.mdx', ''),
        ...frontmatter,
      }
    })
  )

  return (
    <div className={styles.container}>
      {blogs.map(({ title, slug, date }, idx) => {
        return (
          <Link href={`blogs/${slug}`} key={idx} className={styles.link}>
            <div className={styles.content}>
              <p className={styles.date}>
                {DateTime.fromISO(date).toFormat('MMM dd yyyy')}
              </p>
              <p className={styles.title}>{title}</p>
            </div>
            <p className={styles.views}>983 views</p>
          </Link>
        )
      })}
    </div>
  )
}

export default Page
