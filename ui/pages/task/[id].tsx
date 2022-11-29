import DeleteIcon from '@mui/icons-material/Delete'
import { Button, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { deleteTask, getTask, Task, updateTask } from 'api/task'
import style from 'styles/TaskPage.module.scss'

const TaskPage = () => {
  const router = useRouter()
  const [task, setTask] = useState<Task>()

  useEffect(() => {
    const fetchTasks = async () => {
      const id = parseInt(router.query.id as string)
      const task = await getTask(id)

      if (task) setTask(task)
    }

    fetchTasks()
  }, [router.query.id])

  const handleUpdate = async () => {
    await updateTask(task!)
    router.push('/')
  }
  const handleDelete = async () => {
    await deleteTask(task!.id!)
    router.push('/')
  }

  return (
    <div className={style.wrapper}>
      <div className={style.delete} onClick={handleDelete}>
        <DeleteIcon className={style.icon} />
        Delete
      </div>
      <TextField
        label="title"
        variant="standard"
        value={task?.title || ''}
        onChange={(e) => {
          setTask({ ...task, title: e.target.value })
        }}
        InputProps={{ style: { fontSize: '1.8rem' } }}
        className={style.title}
      ></TextField>
      <TextField
        label="description"
        variant="outlined"
        multiline
        InputLabelProps={{ shrink: true }}
        value={task?.description || ''}
        onChange={(e) => {
          setTask({ ...task, title: task!.title, description: e.target.value })
        }}
        className={style.description}
      ></TextField>
      <Button
        variant="contained"
        className={style.button}
        onClick={handleUpdate}
      >
        Update
      </Button>
    </div>
  )
}

export default TaskPage
