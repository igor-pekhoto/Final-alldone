import { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useDispatch } from 'react-redux'
import { Card } from '@mui/material'
import { useParams } from 'react-router-dom'
import { addCommentQuery } from '../../redux/actions/commentsAC'
import { getPostDetailQuery } from '../../redux/actions/detailPostAC'

function NewCommentForm() {
  const [text, setText] = useState('')
  const { postId } = useParams()
  const dispatch = useDispatch()

  const submitHandler = () => {
    const preparedPostQuery = {
      text,
      // eslint-disable-next-line no-undef
    }
    const body = JSON.stringify(preparedPostQuery)

    dispatch(addCommentQuery(body, postId))
    setText('')
  }

  useEffect(() => {
    dispatch(getPostDetailQuery(postId))
  })

  // const isTitleError = false

  return (
    <Card sx={{
      minWidth: 275,
      mb: 2,
      display: 'flex',
      justifyContent: 'space-evenly',
    }}
    >
      <TextField
        id="filled-basic"
        label="Text"
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ flexGrow: 1 }}
      />
      <Button onClick={submitHandler} variant="outlined">
        Comment
      </Button>
    </Card>
  )
}
export default NewCommentForm
