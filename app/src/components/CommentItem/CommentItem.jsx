/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line no-unused-vars
import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCommentQuery } from '../../redux/actions/commentsAC'

function CommentItem({ text, _id, author }) {
  const { postId } = useParams()

  const dispatch = useDispatch()

  const submitHandler = () => {
    dispatch(deleteCommentQuery(postId, _id))
  }
  const userId = useSelector((store) => store.person._id)

  return (
    <Card sx={{
      minWidth: 275,
      mb: 2,
      display: 'flex',
      justifyContent: 'space-between',
      // bgcolor: 'background.paper',
    }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary" gutterBottom>
          {text}
        </Typography>
      </CardContent>
      { (userId === author) ? (
        <CardActions>
          <Button onClick={submitHandler} size="small">Delete</Button>
        </CardActions>
      )
        : <div /> }
    </Card>
  )
}

export default CommentItem
