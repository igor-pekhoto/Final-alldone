/* eslint-disable react/no-unescaped-entities */
import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
// import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Paper, Stack, TextField } from '@mui/material'
import { useDispatch } from 'react-redux'
import { updatePostDetailQuery } from '../../../redux/actions/detailPostAC'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default function PostModal({
  _id, title, text, image, tags,
}) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [newTitle, setNewTitle] = React.useState(title)
  const [newText, setNewText] = React.useState(text)
  const [newImage, setNewImage] = React.useState(image)
  const [newTags, setNewTags] = React.useState(tags.join(', '))

  const dispatch = useDispatch()

  const submitHandler = () => {
    const preparedPostQuery = {
      title: newTitle,
      text: newText,
      image: newImage,
      tags: newTags.split(', '),
      // tags,
      // eslint-disable-next-line no-undef
      _id,
    }
    const body = JSON.stringify(preparedPostQuery)
    dispatch(updatePostDetailQuery(body))
    handleClose()
  }

  return (
    <div>
      <Button onClick={handleOpen}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
                    value={newTitle}
              // helperText={isTitleError && 'Title must have min 3 symbols'}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>
                <div>
                  <TextField
                    id="filled-basic"
                    label="Text"
                    variant="outlined"
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                  />
                </div>
                <div>
                  <TextField
                    id="standard-basic"
                    label="Image"
                    variant="outlined"
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                  />
                </div>
                <div>
                  <TextField
                    id="standard-basic"
                    label="Tags"
                    variant="outlined"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                  />
                </div>

                <Button onClick={submitHandler} variant="outlined">
                  Edit Post
                </Button>
              </Stack>
            </Paper>
          </Stack>
        </Box>
      </Modal>
    </div>
  )
}
