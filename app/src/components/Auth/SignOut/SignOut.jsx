import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// eslint-disable-next-line no-unused-vars
import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { SIGN_OUT } from '../../../redux/types/personType'

export default function SignOut() {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const signOutHandler = () => {
    dispatch({ type: SIGN_OUT, payload: '' })
    window.localStorage.clear()
    navigate('/')
  }

  return (
    <Card>
      <div>
        <CardContent sx={{
          minWidth: 275,
          display: 'flex',
          direction: 'column',
          justifyContent: 'center',
        }}
        >
          <Typography variant="body2">
            We will be glad to see you again
            <br />
          </Typography>
        </CardContent>
        <CardActions sx={{
          minWidth: 275,
          display: 'flex',
          direction: 'column',
          justifyContent: 'center',
        }}
        >
          <Button onClick={signOutHandler} size="small">Sign Out</Button>
        </CardActions>
      </div>

    </Card>
  )
}
