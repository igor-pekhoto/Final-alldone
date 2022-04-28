import { axiosInstance } from '../../config/axios'
import {
  GET_PERSON, SIGN_IN, SIGN_UP,
} from '../types/personType'

export const signIn = (person) => ({
  type: SIGN_IN,
  payload: person,
})

export const signInQuery = ({ email, password, cb }) => async (dispatch) => {
  const response = await axiosInstance.post('signin', {
    email,
    password,
  })

  const person = response.data

  dispatch(
    signIn({
      ...person.data,
      token: person.token,
    }),
  )

  // eslint-disable-next-line no-unused-expressions
  typeof cb === 'function' && cb()
}

export const signUp = (person) => ({
  type: {
    SIGN_UP,
    SIGN_IN,
  },
  payload: person,
})

export const signUpQuery = ({ email, password, cb }) => async (dispatch) => {
  const response = await axiosInstance.post('signup', {
    email,
    password,
  })

  const person = response.data

  dispatch(
    signUp({
      ...person.data,
      token: person.token,
    }),
  )

  // eslint-disable-next-line no-unused-expressions
  typeof cb === 'function' && cb()
}

const getPerson = (token, person) => ({
  type: GET_PERSON,
  payload: {
    ...person,
    token,
  },
})

export const getPersonQuery = (token) => async (dispatch) => {
  const response = await axiosInstance.get('/users/me', {
    headers: { authorization: `Bearer ${token}` },
  })
  const personFromApi = await response.data

  dispatch(getPerson(personFromApi, token))
  console.log(personFromApi)
}
