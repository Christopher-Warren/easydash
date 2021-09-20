import { useMutation, useQuery, gql } from '@apollo/client'

const useLogin = () => {
  const [
    login,
    { data: loginData, loading: loginLoading, error: loginError },
  ] = useMutation(gql`
    mutation($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        userId
      }
    }
  `)
  const {
    data: validateData,
    loading: validateLoading,
    error: validateError,
  } = useQuery(gql`
    query {
      validateToken {
        userId
      }
    }
  `)
  let user
  let error
  const loading = [loginLoading, validateLoading].some((val) => val === true)

  if (!validateError && validateData) {
    user = validateData

    console.log('cookie is valid')
  }

  if (loginData) {
    user = loginData

    console.log('login')
  }

  if (validateError) {
    error = validateError

    // need to handle when session expires
  }

  if (loginError) error = loginError

  return { login, user, loading, error }
}

export default useLogin
