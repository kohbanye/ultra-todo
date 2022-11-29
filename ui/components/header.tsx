import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from 'styles/Header.module.scss'

const Header = () => {
  const router = useRouter()

  return (
    <div className={styles.wrapper}>
      <Link href="/">
        <div className={styles.logo}>Ultra ToDo</div>
      </Link>
      <div
        className={styles.user}
        onClick={() => {
          router.push('/user')
        }}
      >
        <AccountCircleIcon className={styles.icon} />
      </div>
    </div>
  )
}

export default Header
