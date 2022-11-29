import instance from 'api/axios'

export interface User {
  username: string
  password: string
}

export const login = async (
  username: string,
  password: string
): Promise<void> => {
  try {
    const { data } = await instance.post('/login', { username, password })
    localStorage.setItem('token', data.token)
  } catch (error) {
    console.error(error)
  }
}
