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
export const cartItemsVar = makeVar<string[]>([])
