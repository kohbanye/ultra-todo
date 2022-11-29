import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Link from 'next/link'

import styles from 'styles/Header.module.scss'

const Header = () => {
  return (
    <div className={styles.wrapper}>
      <Link href="/">
        <div className={styles.logo}>Ultra ToDo</div>
      </Link>
      <Link href="/user" className={styles.user}>
        <AccountCircleIcon className={styles.icon} />
      </Link>
    </div>
  )
}

export default Header
