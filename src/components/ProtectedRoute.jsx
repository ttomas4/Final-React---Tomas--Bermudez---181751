import {
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom'

export default function ProtectedRoute() {
  const location = useLocation()

  const isAuthenticated =
    sessionStorage.getItem(
      'biblioteca_auth',
    ) === 'true'

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    )
  }

  return <Outlet />
}