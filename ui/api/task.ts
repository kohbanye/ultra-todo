import instance from './axios'

export interface Task {
  id: number
  title: string
  description: string
  done: boolean
  createdAt: Date
  updatedAt: Date
}

export const getTask = async (id: number): Promise<Task | null> => {
  let task: Task | null = null
  try {
    const { data } = await instance.get(`/task/${id}`)
    task = data.data
  } catch (error) {
    console.error(error)
  }

  return task
}

export const createTask = async (task: Task): Promise<Task | null> => {
  let createdTask: Task | null = null
  try {
    const { data } = await instance.post('/task', task)
    createdTask = data.data
  } catch (error) {
    console.error(error)
  }

  return createdTask
}

export const updateTask = async (task: Task): Promise<Task | null> => {
  let updatedTask: Task | null = null
  try {
    const { data } = await instance.put(`/task/${task.id}`, task)
    updatedTask = data.data
  } catch (error) {
    console.error(error)
  }

  return updatedTask
}

export const deleteTask = async (id: number): Promise<Task | null> => {
  let task: Task | null = null
  try {
    const { data } = await instance.delete(`/task/${id}`)
    task = data.data
  } catch (error) {
    console.error(error)
  }

  return task
}

export const getTasks = async (): Promise<Task[]> => {
  let tasks: Task[] = []
  try {
    const { data } = await instance.get('/tasks')
    tasks = data.data
  } catch (error) {
    console.error(error)
  }

  return tasks
}
