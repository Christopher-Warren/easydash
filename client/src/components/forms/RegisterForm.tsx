import { useState } from 'react'
import { Link } from 'react-router-dom'
import PrimaryButton from '../PrimaryButton'
import FormInput from '../LoginInput'

import { validatePassword } from '../../utils/validatePassword'
import { useMutation, gql } from '@apollo/client'
import LoadingSpinner from '../LoadingSpinner'

const RegisterForm = () => {
  const [error, setError] = useState<string[]>([])

  const [createUser, { data, loading }] = useMutation(gql`
    mutation CreateAccount($email: String!, $password: String!) {
      createUser(userInput: { email: $email, password: $password }) {
        email
      }
    }
  `)

  return (
    <form
      className="relative"
      onSubmit={async (e: any) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)

        const email = formData.get('email')

        const password = formData.get('password')?.toString()
        const password2 = formData.get('password2')?.toString()

        password && password2 && validatePassword(password, password2, setError)

        try {
          await createUser({
            variables: {
              email: email,
              password: password,
            },
          })
        } catch (error) {}
      }}
    >
      {loading && <LoadingSpinner />}
      {/* <img className="lg:mx-0 mx-auto" src={logo} alt="Easy Dash Logo" /> */}

      {!data ? (
        <>
          <h1 className="text-3xl text-gray-800 h-14">Create Account</h1>
          <FormInput id="email" name="email" type="email" required>
            Email Address
          </FormInput>
          <FormInput
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
          >
            Password
          </FormInput>
          <FormInput
            id="password2"
            name="password2"
            type="password"
            required
            minLength={8}
          >
            Re-enter Password
          </FormInput>

          <div className="flex justify-between -mt-1 text-gray-600">
            <div>
              <span>Already have an account? </span>
              <Link to="/dashboard/" className="text-blue-700 underline">
                Login
              </Link>
            </div>
          </div>

          <PrimaryButton type="submit">LOGIN</PrimaryButton>
          <div className="absolute bottom-0 list-none">
            {error.length > 0 && 'Invalid Password'}
            {error.map((i, idx) => {
              return <li key={idx}>{i}</li>
            })}
          </div>
        </>
      ) : (
        <>
          <h1 className="text-3xl text-gray-800 h-14">
            Account successfully created.
          </h1>
          <div className="flex justify-between -mt-1 text-gray-600">
            <div>
              <span>You may now </span>
              <Link to="/dashboard/" className="text-blue-700 underline">
                Login
              </Link>
            </div>
          </div>
        </>
      )}
    </form>
  )
}

export default RegisterForm
