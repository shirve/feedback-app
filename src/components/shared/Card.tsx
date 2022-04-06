import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  reverse?: boolean
}

const Card = ({ children, reverse = false }: Props) => {
  return (
    <div
      className='card'
      style={{
        backgroundColor: reverse ? 'rgba(0,0,0,0.4)' : '#fff',
        color: reverse ? '#fff' : '#000',
      }}
    >
      {children}
    </div>
  )
}

export default Card
