import WarningRoundedIcon from '@mui/icons-material/WarningRounded'
import { Button, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { login } from 'api/user'
import style from 'styles/Login.module.scss'

const Login = () => {
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleLogin = async () => {
    const user = await login(username, password)
    if (user) {
      setError(false)
      router.push('/')
    } else {
      setError(true)
    }
  }

  return (
    <div className={style.wrapper}>
      <div className={style.card}>
        <div className={`${style.error} ${!error && style.hidden}`}>
          <WarningRoundedIcon className={style.icon} />
          Invalid username or password
        </div>
        <TextField
          label="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`${style.username} ${style.input}`}
        />
        <TextField
          label="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`${style.password} ${style.input}`}
        />
        <Button
          variant="contained"
          onClick={handleLogin}
          className={style.button}
        >
          Login
        </Button>
      </div>
    </div>
  )
}

export default Login
