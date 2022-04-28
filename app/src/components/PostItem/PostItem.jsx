/* eslint-disable no-underscore-dangle */
import * as React from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Grid from '@mui/material/Grid'
import DeleteIcon from '@mui/icons-material/Delete'
import { Link } from 'react-router-dom'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { useDispatch, useSelector } from 'react-redux'
import { deletePostQuery, setPostsQuery } from '../../redux/actions/postsAC'
import { deleteLikePostQuery, setLikePostQuery } from '../../redux/actions/likePostAC'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

export default function PostsItem({
  image, author, title, text, _id, likes,
}) {
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  const dispatch = useDispatch()

  const deleteHandler = () => {
    dispatch(deletePostQuery(_id))
    setTimeout(() => {
      dispatch(setPostsQuery())
    }, 300)
  }

  const description = text.length > 200 ? `${text.slice(0, 200)}...` : text

  const userId = useSelector((store) => store.person._id)

  const likePostHandler = () => {
    if (!likes.includes(userId)) {
      dispatch(setLikePostQuery(_id))
    } else {
      dispatch(deleteLikePostQuery(_id))
    }
  }

  return (
    <Grid item container direction="column">
      <Card>
        <CardHeader
          avatar={(
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {author?.name.slice(0, 1)}
            </Avatar>
        )}
          title={title}
          subheader={author?.name}
        />
        <CardMedia
          component="img"
          height="194"
          image={image}
          alt={title}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorite" onClick={likePostHandler}>
            {(!likes.includes(userId)) ? <FavoriteBorderIcon />
              : <FavoriteIcon sx={{ color: red[500] }} />}
            <Typography textAlign="center" variant="h6">{likes.length}</Typography>
          </IconButton>
          { (userId === author._id) ? (
            <IconButton onClick={deleteHandler}>
              <DeleteIcon />
            </IconButton>
          )
            : <div /> }
          <IconButton>
            <Link to={`/posts/${_id}`}>
              <ArrowForwardIcon />
            </Link>

          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>

            <Typography paragraph>
              {text}
            </Typography>

          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  )
}
