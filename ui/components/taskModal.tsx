import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import style from 'styles/TaskModal.module.scss'

import { Task } from 'api/task'

type TaskModalProps = Required<{
  task: Task
  isOpen: boolean
  onClose: () => void
}>

const TaskModal = (props: TaskModalProps) => {
  const [showModal, setShowModal] = useState(props.isOpen)
  useEffect(() => {
    setShowModal(props.isOpen)
  }, [props.isOpen])

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={props.onClose}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      ariaHideApp={false}
      className={style.modal}
      overlayClassName={style.overlay}
    >
      <div>{props.task.title}</div>
      <div>{props.task.description}</div>
    </Modal>
  )
}

export default TaskModal
