import style from 'styles/Card.module.scss'

type CardProps = Required<{
  children: React.ReactNode
}>

const Card = ({ children }: CardProps) => {
  return (
    <div className={style.wrapper}>
      <div className={style.card}>{children}</div>
    </div>
  )
}

export default Card
