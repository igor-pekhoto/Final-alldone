import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useDispatch } from 'react-redux'
import { Paper, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { addPostQuery } from '../../redux/actions/postsAC'

function NewPostForm() {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [image, setImage] = useState('')
  const [tags, setTags] = useState('')

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const submitHandler = () => {
    const preparedPostQuery = {
      title,
      text,
      image,
      tags: tags.split(',').map((el) => el.trim()),
    }

    const body = JSON.stringify(preparedPostQuery)

    dispatch(addPostQuery(body))
    setTimeout(navigate('/posts'), 10000)
  }

  // const isTitleError = false

  return (
    <Stack
      component="div"
      direction="column"
      alignItems="center"
    >

      <Paper elevation={3} sx={{ width: 400 }}>
        <Stack
          component="form"
          alignItems="center"
          spacing={2}
          noValidate
          sx={{ py: 5, px: 2 }}
          autoComplete="off"
        >
          <div>
            <TextField
              // error={isTitleError}
              id="outlined-basic"
              label="Title"
              variant="outlined"
              value={title}
              // helperText={isTitleError && 'Title must have min 3 symbols'}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <TextField
              id="filled-basic"
              label="Text"
              variant="outlined"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div>
            <TextField
              id="standard-basic"
              label="Image"
              variant="outlined"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div>
            <TextField
              id="standard-basic"
              label="Tags"
              variant="outlined"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <Button onClick={submitHandler} variant="outlined">
            Create Post
          </Button>
        </Stack>
      </Paper>
    </Stack>
  )
}

export default NewPostForm
