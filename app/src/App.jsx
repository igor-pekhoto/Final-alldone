import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import { Container } from '@mui/material'
// import { useDispatch } from 'react-redux'
// import { useEffect } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import NewPostForm from './components/NewPostForm/NewPostForm'
import PageNotFound from './components/404/404'
import PostDetail from './components/PostDetail/PostDetail'
import PostList from './components/PostsList/PostsList'
import { RequireAuth } from './components/Auth/RequireAuth/RequireAuth'
import SignIn from './components/Auth/SignIn/SignIn'
import SignUp from './components/Auth/SignUp/SignUp'
import SignOut from './components/Auth/SignOut/SignOut'

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  })

  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <Header />
      </ThemeProvider>

      <Container maxWidth="md" className="container">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/posts"
            element={(
              <RequireAuth>
                <PostList />
              </RequireAuth>
)}
          />
          <Route
            path="/posts/:postId"
            element={(
              <RequireAuth>
                <PostDetail />
              </RequireAuth>
)}
          />
          <Route
            path="/postform"
            element={(
              <RequireAuth>
                <NewPostForm />
              </RequireAuth>
)}
          />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App
