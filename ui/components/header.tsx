import Link from 'next/link'

import styles from 'styles/Header.module.scss'

const Header = () => {
  return (
    <div className={styles.wrapper}>
      <Link href="/">
        <div className={styles.logo}>Ultra ToDo</div>
      </Link>
      <div className={styles.avatar}>
        {/* <Image src="/sample.png" alt="" width="30" height="30"></Image> */}
      </div>
    </div>
  )
}

export default Header
