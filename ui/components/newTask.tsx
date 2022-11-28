import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useState } from 'react'

import { createTask, Task } from 'api/task'
import style from 'styles/NewTask.module.scss'

type NewTaskProps = Required<{
  onClose: () => void
}>

const NewTask = ({ onClose }: NewTaskProps) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleClick = async () => {
    const task: Task = {
      title: title,
      description: description
    }

    await createTask(task)
    onClose()
  }

  return (
    <div className={style.wrapper}>
      <TextField
        label="Title"
        required={true}
        value={title}
        onChange={(e) => {
          setTitle(e.target.value)
        }}
        size="small"
        margin="normal"
        className={style.title}
      />
      <TextField
        label="Description"
        multiline={true}
        value={description}
        onChange={(e) => {
          setDescription(e.target.value)
        }}
        className={style.description}
      />
      <Button
        variant="contained"
        className={style.button}
        onClick={handleClick}
      >
        Add
      </Button>
    </div>
  )
}

export default NewTask
