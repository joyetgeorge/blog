import Link from 'next/link'
import React, { ComponentPropsWithoutRef } from 'react'
import styles from './styles.module.scss'

type HeadingProps = ComponentPropsWithoutRef<'h1'>
type ParagraphProps = ComponentPropsWithoutRef<'p'>
type ListProps = ComponentPropsWithoutRef<'ul'>
type ListItemProps = ComponentPropsWithoutRef<'li'>
type AnchorProps = ComponentPropsWithoutRef<'a'>
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>

const components = {
  h1: (props: HeadingProps) => <h1 className={styles.h1} {...props} />,
  h2: (props: HeadingProps) => <h2 className={styles.h2} {...props} />,
  h3: (props: HeadingProps) => <h3 className={styles.h3} {...props} />,
  h4: (props: HeadingProps) => <h4 className={styles.h4} {...props} />,
  p: (props: ParagraphProps) => <p className={styles.paragraph} {...props} />,
  ol: (props: ListProps) => <ol className={styles.ol} {...props} />,
  ul: (props: ListProps) => <ul className={styles.ul} {...props} />,
  li: (props: ListItemProps) => <li className={styles.li} {...props} />,
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className={styles.em} {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className={styles.strong} {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className = styles.anchor
    if (href?.startsWith('/')) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      )
    }
    if (href?.startsWith('#')) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      )
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    )
  },
  code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
    const codeHTML = children as string
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
  },
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <table>
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote className={styles.blockquote} {...props} />
  ),
}

declare global {
  type MDXProvidedComponents = typeof components
}

export function useMDXComponents(): MDXProvidedComponents {
  return components
}
