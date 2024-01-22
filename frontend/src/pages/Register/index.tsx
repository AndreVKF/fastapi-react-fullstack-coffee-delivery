import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '../../components/Button'
import { AuthFormLogo } from '../../components/AuthFormLogo'
import { Input } from '../../components/Input'
import { InputWrapper, RegisterContainer, RegisterForm } from './styles'
import { useAuthContext } from '../../contexts/AuthContext'
import { toast } from 'react-toastify'

const registerFormValidationSchema = zod
  .object({
    username: zod.string().max(20),
    email: zod.string().email('Favor inserir um email válido!'),
    password: zod.string().min(4).max(20),
    confirm_password: zod.string().min(4).max(20),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords não batem!',
    path: ['password'],
  })

export type RegisterFormValidationFormType = zod.infer<
  typeof registerFormValidationSchema
>

export const Register = () => {
  const { handleRegister } = useAuthContext()
  const navigate = useNavigate()

  const methods = useForm<RegisterFormValidationFormType>({
    resolver: zodResolver(registerFormValidationSchema),
  })

  const {
    handleSubmit,
    formState: { errors },
  } = methods

  function handleRegisterSubmit(data: RegisterFormValidationFormType) {
    const { username, email, password } = data

    handleRegister({ username, email, password })
    navigate('/')
  }

  if (Object.keys(errors).length > 0) {
    toast.error('Preencha todos os campos')
  }

  return (
    <RegisterContainer>
      <AuthFormLogo />
      <FormProvider {...methods}>
        <RegisterForm onSubmit={handleSubmit(handleRegisterSubmit)}>
          <h1>Register</h1>
          <InputWrapper>
            <Input type="text" placeholder="username surname" id="username" />
            <Input type="email" placeholder="email@email.com" id="email" />
            <Input type="password" placeholder="********" id="password" />
            <Input
              type="password"
              placeholder="********"
              id="confirm_password"
            />
          </InputWrapper>
          <Button text="REGISTER" />
        </RegisterForm>
      </FormProvider>

      <span>
        Já possui um cadastro ?<Link to={'/'}> Login</Link>
      </span>
    </RegisterContainer>
  )
}
