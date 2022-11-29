import { Button, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { register } from 'api/user'
import Card from 'components/card'
import style from 'styles/Register.module.scss'

const Register = () => {
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async () => {
    const res = await register(username, password)
    if (res) {
      router.push('/')
    }
  }

  return (
    <Card>
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
        onClick={handleRegister}
        className={style.button}
      >
        Sign Up
      </Button>
    </Card>
  )
}

export default Register
