import Link from 'next/link'

import styles from './styles.module.scss'

export const Header = () => {
  return (
    <div className={styles.container}>
      <p>joyetgeorge.</p>
      <div className={styles.links}>
        <Link href="/blogs">/blogs</Link>
        <Link href="/about">/about</Link>
        <Link href="/contact">/contact</Link>
      </div>
    </div>
  )
}
