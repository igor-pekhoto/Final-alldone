/* eslint-disable no-underscore-dangle */
import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { Link } from 'react-router-dom'
import LinkMUI from '@mui/material/Link'
import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchValue } from '../../redux/actions/searchAC'
import { SIGN_OUT } from '../../redux/types/personType'
import { API_TOKEN } from '../../constants'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

const pages = [
  {
    title: 'Main',
    path: '/',
  },
  {
    title: 'Posts',
    path: '/posts',
  },
  {
    title: 'Create New Post',
    path: '/postform',
  },
  {
    title: 'Sign In',
    path: '/signin',
  },
  {
    title: 'Sign Up',
    path: '/signup',
  },
  {
    title: 'Sign Out',
    path: '/signout',
  },
]

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const dispatch = useDispatch()

  const searchHandler = (e) => {
    dispatch(setSearchValue(e.target.value.trim()))
  }

  const signOutHandler = () => {
    dispatch({ type: SIGN_OUT, payload: '' })
    window.localStorage.clear()
  }

  const userToken = useSelector((store) => store.person.token)

  console.log(userToken)

  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            (๏̯͡๏)
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <LinkMUI key={page.title} component={Link} to={page.path}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.title}</Typography>
                  </MenuItem>
                </LinkMUI>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            (๏̯͡๏)
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <LinkMUI key="Main" component={Link} to="/">
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Main
              </Button>
            </LinkMUI>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <LinkMUI key="Posts" component={Link} to="/posts">
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Posts
              </Button>
            </LinkMUI>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <LinkMUI key="Create New Post" component={Link} to="/postform">
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Create New Post
              </Button>
            </LinkMUI>
          </Box>

          {(localStorage.getItem(API_TOKEN) === null) ? (
            <>
              {' '}
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <LinkMUI key="Sign In" component={Link} to="/signin">
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Sign In
                  </Button>
                </LinkMUI>
              </Box>

              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <LinkMUI key="Sign Up" component={Link} to="/signup">
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Sign Up
                  </Button>
                </LinkMUI>
              </Box>
            </>
          )
            : (
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <LinkMUI onClick={signOutHandler} key="Sign Out" component={Link} to="/">
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Sign Out
                  </Button>
                </LinkMUI>
              </Box>
            )}

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={searchHandler}
            />
          </Search>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default NavBar
