import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import Navbar from '../components/Navbar'
import ProtectedRoute from '../components/ProtectedRoute'

import BookDetailView from '../views/BookDetailView'
import BookFormView from '../views/BookFormView'
import BooksView from '../views/BooksView'
import LoginView from '../views/LoginView'
import NotFoundView from '../views/NotFoundView'

function AppLayout() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route
            path="/libros"
            element={<BooksView />}
          />

          <Route
            path="/libros/nuevo"
            element={<BookFormView />}
          />

          <Route
            path="/libros/editar/:id"
            element={<BookFormView />}
          />

          <Route
            path="/libros/:id"
            element={<BookDetailView />}
          />
        </Route>

        <Route
          path="/login"
          element={<LoginView />}
        />

        <Route
          path="/"
          element={<Navigate to="/libros" replace />}
        />

        <Route
          path="*"
          element={<NotFoundView />}
        />
      </Routes>
    </>
  )
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}