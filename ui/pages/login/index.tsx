import { Button, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { login } from 'api/user'
import style from 'styles/Login.module.scss'

const Login = () => {
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    await login(username, password)

    router.push('/')
  }

  return (
    <div className={style.wrapper}>
      <div className={style.card}>
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
