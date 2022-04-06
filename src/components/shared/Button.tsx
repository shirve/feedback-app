import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  version?: string
  type?: 'button' | 'submit' | 'reset' | undefined
  isDisabled?: boolean
}

const Button = ({
  children,
  version = 'primary',
  type = 'button',
  isDisabled = false,
}: Props) => {
  return (
    <button type={type} disabled={isDisabled} className={`btn btn-${version}`}>
      {children}
    </button>
  )
}

export default Button
