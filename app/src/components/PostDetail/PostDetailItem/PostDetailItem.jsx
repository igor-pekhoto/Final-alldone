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
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Grid from '@mui/material/Grid'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import PostModal from '../PostModal/PostModal'
import CommentItem from '../../CommentItem/CommentItem'
import NewCommentForm from '../../NewCommentForm/NewCommentForm'
import { deleteLikePostQuery, setLikePostQuery } from '../../../redux/actions/likePostAC'
import { getPostDetailQuery } from '../../../redux/actions/detailPostAC'

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

export default function PostDetailItem({
  image, author, title, text, comments, tags, _id, likes,
}) {
  // eslint-disable-next-line no-underscore-dangle
  const commentItem = comments.map((comment) => <CommentItem key={comment._id} {...comment} />)

  const sharedValues = {
    image, title, text, tags, _id, author,
  }
  const { postId } = useParams()
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const dispatch = useDispatch()

  const userId = useSelector((store) => store.person._id)

  const likePostHandler = () => {
    if (!likes.includes(userId)) {
      dispatch(setLikePostQuery(_id))
    } else {
      dispatch(deleteLikePostQuery(_id))
    }
  }

  React.useEffect(() => {
    dispatch(getPostDetailQuery(postId))
  }, [likes])

  return (
    <Grid
      item
      container
      direction="raw"
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Card sx={{
        maxWidth: 'sm',
      }}
      >
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
          image={image}
          alt={title}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorite" onClick={likePostHandler}>
            {(!likes.includes(userId)) ? <FavoriteBorderIcon />
              : <FavoriteIcon sx={{ color: red[500] }} />}
            <Typography textAlign="center" variant="h6">{likes.length}</Typography>
          </IconButton>
          { (userId === author._id) ? (
            <PostModal {...sharedValues} />
          )
            : <div /> }
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
              Comments:
            </Typography>
            <NewCommentForm />
            {commentItem}
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  )
}
