import AddCircleIcon from '@mui/icons-material/AddCircle'
import { GetServerSideProps } from 'next'
import { useState } from 'react'
import Modal from 'react-modal'

import { getTasks, Task } from 'api/task'
import NewTask from 'components/newTask'
import TaskList from 'components/taskList'
import style from 'styles/Home.module.scss'

type HomeProps = Required<{
  tasks: Task[]
}>

const Home = (props: HomeProps) => {
  const [tasks, setTasks] = useState(props.tasks)
  const [showModal, setShowModal] = useState(false)

  const handleOpenModal = () => {
    setShowModal(true)
  }
  const handleCloseModal = async () => {
    setTasks(await getTasks())
    setShowModal(false)
  }

  return (
    <div className={style.wrapper}>
      <div onClick={handleOpenModal}>
        <AddCircleIcon className={style.icon} />
      </div>
      <Modal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        className={style.modal}
        overlayClassName={style.overlay}
      >
        <NewTask onClose={handleCloseModal} />
      </Modal>
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
