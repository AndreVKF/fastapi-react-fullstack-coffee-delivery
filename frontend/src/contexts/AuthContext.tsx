import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import { api } from '../api'
import { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'react-toastify'

interface AuthContextProviderProps {
  children: ReactNode
}

interface HandleLoginProps {
  email: string
  password: string
}

interface HandleRegisterProps {
  username: string
  email: string
  password: string
}

interface AuthContextProps {
  isAuthenticated: boolean
  userId: string | null
  handleLogin: ({ email, password }: HandleLoginProps) => void
  handleRegister: ({ username, email, password }: HandleRegisterProps) => void
  handleLogout: () => void
}

interface setAuthRoutineProps {
  userId: string
  token: string
  token_type: string
}

const AuthContext = createContext({} as AuthContextProps)
const localStorageKey = import.meta.env.VITE_LOCAL_STORAGE

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  function setAuthRoutine({ userId, token, token_type }: setAuthRoutineProps) {
    api.defaults.headers.common.Authorization = `${token_type} ${token}`
    setIsAuthenticated(true)
    setUserId(userId)
    localStorage.setItem(localStorageKey, token)
  }

  function setRemoveAuthRotine() {
    delete api.defaults.headers.common.Authorization
    setIsAuthenticated(false)
    setUserId(null)
    localStorage.removeItem(localStorageKey)
  }

  function handleLogin({ email, password }: HandleLoginProps) {
    api
      .post('/auth', {
        email,
        password,
      })
      .then((res: AxiosResponse) => {
        const { token, token_type, userId } = res.data
        setAuthRoutine({ token, token_type, userId })
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((err: AxiosError | any) => {
        const errorMessage = err.response?.data?.detail

        if (errorMessage) {
          toast.error(errorMessage)
        }
      })
  }

  function handleRegister({ username, email, password }: HandleRegisterProps) {
    api
      .post('/users', {
        username,
        email,
        password,
      })
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          handleLogin({ email, password })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleLogout() {
    setRemoveAuthRotine()
  }

  useEffect(() => {
    function refreshLogin(token: string) {
      api
        .get(`/auth/${token}`)
        .then((res: AxiosResponse) => {
          const { token, token_type, userId } = res.data
          setAuthRoutine({ token, token_type, userId })
        })
        .catch((err: unknown) => {
          setRemoveAuthRotine()
          console.log(err)
        })
    }

    const token = localStorage.getItem(localStorageKey)
    if (!token) return

    refreshLogin(token)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userId,
        handleLogin,
        handleRegister,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}
