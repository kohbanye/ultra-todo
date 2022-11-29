import { AccountCircleOutlined, Edit } from '@mui/icons-material'
import { useEffect, useState } from 'react'

import { getMe, UserResponse } from 'api/user'
import style from 'styles/User.module.scss'

const UserPage = () => {
  const [user, setUser] = useState<UserResponse>()

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getMe()
      if (user) {
        setUser(user)
      }
    }
    fetchUser()
  }, [])

  return (
    <div className={style.wrapper}>
      <div className={style.user}>
        <AccountCircleOutlined className={style.userIcon} />
        <div className={style.username}>{user?.username}</div>
        <Edit className={style.editIcon} />
      </div>
    </div>
  )
}

export default UserPage
