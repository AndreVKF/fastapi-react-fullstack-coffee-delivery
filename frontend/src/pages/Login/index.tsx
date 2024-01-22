import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Button } from '../../components/Button'
import { AuthFormLogo } from '../../components/AuthFormLogo'
import { Input } from '../../components/Input'
import { InputWrapper, LoginContainer, LoginForm } from './styles'
import { useAuthContext } from '../../contexts/AuthContext'
import { toast } from 'react-toastify'

const loginFormValidationSchema = zod.object({
  email: zod.string().email('Favor inserir um email válido!'),
  password: zod.string().min(4).max(20),
})

export type LoginFormValidationFormType = zod.infer<
  typeof loginFormValidationSchema
>

export const Login = () => {
  const { handleLogin } = useAuthContext()

  const methods = useForm<LoginFormValidationFormType>({
    resolver: zodResolver(loginFormValidationSchema),
  })

  const {
    handleSubmit,
    formState: { errors },
  } = methods

  function handleLoginSubmit(data: LoginFormValidationFormType) {
    handleLogin(data)
  }

  if (Object.keys(errors).length > 0) {
    toast.error('Preencha todos os campos')
  }

  return (
    <LoginContainer>
      <AuthFormLogo />
      <FormProvider {...methods}>
        <LoginForm onSubmit={handleSubmit(handleLoginSubmit)}>
          <h1>Login</h1>
          <InputWrapper>
            <Input type="email" placeholder="email@email.com" id="email" />
            <Input type="password" placeholder="********" id="password" />
          </InputWrapper>
          <Button text="LOGIN" />
        </LoginForm>
      </FormProvider>

      <span>
        Não possui cadastro ?<Link to={'/register'}> Registrar</Link>
      </span>
    </LoginContainer>
  )
}
