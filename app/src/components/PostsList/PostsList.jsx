import { Box, Grid } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useDebounce from '../../hooks/useDebounce'
import { setPostsQuery } from '../../redux/actions/postsAC'
import PostsItem from '../PostItem/PostItem'

function PostList() {
  const dispatch = useDispatch()

  const posts = useSelector((store) => store.posts)
  // eslint-disable-next-line no-underscore-dangle
  const postItems = posts.map((post) => <PostsItem key={post._id} {...post} />)
  const search = useSelector((store) => store.search)

  const debouncedSearch = useDebounce(search, 500)

  useEffect(() => {
    dispatch(setPostsQuery(debouncedSearch))
  }, [debouncedSearch])

  if (!posts.length) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        <h1>Post list is empty</h1>
      </Box>
    )
  }

  return (

    <Grid container spacing={2} justifyContent="center" direction="column-reverse">
      {postItems}
    </Grid>

  )
}

export default PostList
