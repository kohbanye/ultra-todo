import Image from 'next/image'

import styles from 'styles/Header.module.scss'

const Header = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>Ultra ToDo</div>
      <div className={styles.avatar}>
        <Image src="/sample.png" alt="" width="30" height="30"></Image>
      </div>
    </div>
  )
}

export default Header
