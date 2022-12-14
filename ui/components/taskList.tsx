import Link from 'next/link'
import { useEffect, useState } from 'react'

import { doneTask, Task } from 'api/task'
import style from 'styles/TaskList.module.scss'

type TaskListProps = Required<{
  tasks: Task[]
}>

const TaskList = (props: TaskListProps) => {
  const [tasks, setTasks] = useState<Task[]>(props.tasks)
  useEffect(() => {
    setTasks(props.tasks)
  }, [props.tasks])

  const makeTaskDone = (task: Task) => {
    const newTasks = tasks.map((t) => {
      if (t.id === task.id) {
        return { ...t, done: true }
      }
      return t
    })
    setTasks(newTasks)
    doneTask(task.id!)
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
              <Link href={`/task/${task.id}`} className={style.link}>
                {task.title}
              </Link>
            </div>
          )
      )}
    </div>
  )
}

export default TaskList
