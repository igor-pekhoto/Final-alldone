import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPostQuery, updatePostQuery } from '../../redux/actions/postsAC'

function usePostDetail(closeModal) {
  const { postId } = useParams()

  const dispatch = useDispatch()

  const controller = useRef(new AbortController())
  // const posts = useSelector((store) => store.posts)
  const post = useSelector((state) => state.posts.find((el) => el.id === postId))

  useEffect(() => {
    dispatch(getPostQuery(postId, controller))
  }, [])

  const submitHandler = async (e) => {
    e.preventDefault()

    const formData = Object.fromEntries(new FormData(e.target).entries())

    dispatch(updatePostQuery(postId, formData, closeModal))
  }

  return {
    post,
    submitHandler,
  }
}

export default usePostDetail
