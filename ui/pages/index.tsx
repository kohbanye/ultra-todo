import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useEffect, useState } from 'react'
import Modal from 'react-modal'

import { getTasks, Task } from 'api/task'
import NewTask from 'components/newTask'
import TaskList from 'components/taskList'
import style from 'styles/Home.module.scss'

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasks()

      setTasks(tasks)
    }

    fetchTasks()
  }, [])

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
        ariaHideApp={false}
        className={style.modal}
        overlayClassName={style.overlay}
      >
        <NewTask onClose={handleCloseModal} />
      </Modal>
      <TaskList tasks={tasks} />
    </div>
  )
}

export default Home
