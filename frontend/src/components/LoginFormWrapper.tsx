import { ReactElement } from 'react'
import styled from 'styled-components'

interface LoginFormWrapperProps {
  children: ReactElement
}

export const LoginFormWrapper = ({ children }: LoginFormWrapperProps) => {
  return <LoginFormContainer>{children}</LoginFormContainer>
}

const LoginFormContainer = styled.div`
  height: 100vh;

  display: grid;
  place-content: center;
`
