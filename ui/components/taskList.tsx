import { useState } from 'react'

import { Task } from 'api/task'
import style from 'styles/TaskList.module.scss'

type TaskListProps = Required<{
  tasks: Task[]
}>

const TaskList = (props: TaskListProps) => {
  const [tasks, setTasks] = useState<Task[]>(props.tasks)

  const makeTaskDone = (task: Task) => {
    const newTasks = tasks.map((t) => {
      if (t.id === task.id) {
        return { ...t, done: true }
      }
      return t
    })
    setTasks(newTasks)
  }

  return (
    <div className={style.wrapper}>
      {tasks.map(
        (task) =>
          !task.done && (
            <div key={task.id} className={style.task}>
              <button
                className={style.button}
                onClick={(_) => makeTaskDone(task)}
              ></button>
              {task.title}
            </div>
          )
      )}
    </div>
  )
}

export default TaskList
