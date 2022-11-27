import { GetServerSideProps } from 'next'

import { getTasks, Task } from 'api/task'
import TaskList from 'components/taskList'
import style from 'styles/Home.module.scss'

type HomeProps = Required<{
  tasks: Task[]
}>

const Home = ({ tasks }: HomeProps) => {
  return (
    <div className={style.wrapper}>
      <TaskList tasks={tasks} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      tasks: await getTasks()
    }
  }
}

export default Home
