import {
  createContext, useContext, useEffect,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, CardActions, Grid } from '@mui/material'
import { getPostDetailQuery } from '../../redux/actions/detailPostAC'
import PostDetailItem from './PostDetailItem/PostDetailItem'

const PostDetailContext = createContext()

function PostDetail() {
  const { postId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const detailPost = useSelector((store) => store.detailPost)

  useEffect(() => {
    dispatch(getPostDetailQuery(postId))
  }, [])

  if (!detailPost.title) return null

  return (

    <Grid container spacing={2} justifyContent="center" direction="column-reverse">
      <PostDetailItem {...detailPost} />
      <CardActions sx={{
        minWidth: 275,
        display: 'flex',
        direction: 'column',
        justifyContent: 'center',
      }}
      >
        <Button onClick={() => { navigate(-1) }} size="small">Go Back</Button>
      </CardActions>
    </Grid>
  )
}

export default PostDetail

export const usePostDetailContext = () => useContext(PostDetailContext)
