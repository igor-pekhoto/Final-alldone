import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

// eslint-disable-next-line import/prefer-default-export
export function RequireAuth({ children }) {
  const token = useSelector((store) => store.person.token)
  const location = useLocation()

  if (!token) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/signin" state={{ from: location }} replace />
  }

  return children
}
