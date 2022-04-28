import { API_TOKEN } from '../constants'

const initState = () => {
  const token = window.localStorage.getItem(API_TOKEN) || ''
  return {
    posts: [],
    search: '',
    person: {
      name: '',
      email: '',
      token,
      _id: '6262e315438a77ca8f287681',
    },
    detailPost: {},
    comments: [],
  }
}

export default initState
