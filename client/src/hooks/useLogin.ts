import { useMutation, useQuery, gql } from '@apollo/client'

import { isLoggedInVar } from '../graphql/cache'

const useLogin = () => {
  const [login, { data, loading, error }] = useMutation(
    gql`
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          userId
        }
      }
    `,
    {
      onCompleted: ({ login }) => {
        localStorage.setItem('user', login.userId as string)
        isLoggedInVar(true)
      },
    },
  )

  const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `

  const { data: user } = useQuery(IS_LOGGED_IN)
  return { login, user, loading, error }
}

export default useLogin
