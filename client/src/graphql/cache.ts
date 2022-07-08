import { InMemoryCache, makeVar } from '@apollo/client'

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar()
          },
        },
        isAdmin: {
          read() {
            return isAdminVar()
          },
        },
        cartItems: {
          read() {
            return cartItemsVar()
          },
        },
      },
    },
  },
})

// Initializes to true if localStorage includes a 'token' key,
// false otherwise
let isAdmin = false
if (
  localStorage.getItem('role') === 'ADMIN' ||
  localStorage.getItem('role') === 'USER'
) {
  isAdmin = true
} else {
  isAdmin = false
}

export const isAdminVar = makeVar<boolean>(isAdmin)

// Initializes to true if localStorage includes a 'token' key,
// false otherwise
export const isLoggedInVar = makeVar<boolean>(!!localStorage.getItem('user'))

// Initializes to an empty array
export const cartItemsVar = makeVar<{ _id: string; quantity: number }[]>([
  { _id: '6272b8960d90c9371b8b372f', quantity: 4 },
  { _id: '6272bb020d90c9371b8b3943', quantity: 1 },
])
