import instance from 'api/axios'

export interface User {
  username: string
  password: string
}

export interface UserResponse {
  id: number
  username: string
}

export const login = async (
  username: string,
  password: string
): Promise<any | null> => {
  try {
    const { data } = await instance.post('/login', { username, password })
    localStorage.setItem('token', data.token)
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

export const register = async (
  username: string,
  password: string
): Promise<any | null> => {
  try {
    await instance.post('/register', { username, password })
    const res = await login(username, password)
    return res
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getMe = async (): Promise<UserResponse | null> => {
  try {
    const { data } = await instance.get('/auth/users/me')
    return data.data as UserResponse
  } catch (error) {
    console.error(error)
    return null
  }
}
