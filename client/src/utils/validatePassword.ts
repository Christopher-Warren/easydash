export const validatePassword = (
  password: string,
  password2: string,
  setState?: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  const err: string[] = []

  // Do passwords match?
  if (password !== password2) {
    err.push('Passwords do not match')
  }

  //   // Does password contain 1 number?
  //   if (!password?.match(/\d/)) {
  //     err.push('Password must contain atleast 1 number')
  //   }

  //   // Does password contain 1 special character?
  //   if (!password?.match(/\W/)) {
  //     err.push('Password must contain atleast 1 special character')
  //   }
  if (setState) {
    setState(err)
  }
}
