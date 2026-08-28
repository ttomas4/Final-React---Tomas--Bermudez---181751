import {
  useEffect,
  useMemo,
  useState,
} from 'react'

import { Link } from 'react-router-dom'

import BookCard from '../components/BookCard'
import ErrorMessage from '../components/ErrorMessage'
import LoadingMessage from '../components/LoadingMessage'

import {
  cambiarEstado,
  eliminar,
  obtenerTodos,
} from '../services/booksService'

export default function BooksView() {
  const [books, setBooks] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] =
    useState(true)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] =
    useState(null)
  const [updatingId, setUpdatingId] =
    useState(null)

  async function loadBooks() {
    setLoading(true)
    setError('')

    try {
      const data = await obtenerTodos()
      setBooks(data)
    } catch (firebaseError) {
      console.error(firebaseError)

      setError(
        'No se pudieron consultar los libros en Firestore. Revisá la configuración de Firebase y las reglas de la base de datos.',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBooks()
  }, [])

  const filteredBooks = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase()

    if (!normalizedSearch) {
      return books
    }

    return books.filter((book) =>
      book.title
        .toLowerCase()
        .includes(normalizedSearch),
    )
  }, [books, search])

  async function handleToggleFavorite(book) {
    setUpdatingId(book.id)

    try {
      await cambiarEstado(
        book.id,
        !book.favorite,
      )

      setBooks((current) =>
        current.map((item) =>
          item.id === book.id
            ? {
                ...item,
                favorite:
                  !item.favorite,
              }
            : item,
        ),
      )
    } catch (firebaseError) {
      console.error(firebaseError)

      setError(
        'No se pudo cambiar el estado de favorito.',
      )
    } finally {
      setUpdatingId(null)
    }
  }

  async function handleDelete(book) {
    const confirmed = window.confirm(
      `¿Seguro que querés eliminar "${book.title}"?`,
    )

    if (!confirmed) {
      return
    }

    setDeletingId(book.id)
    setError('')

    try {
      await eliminar(book.id)

      setBooks((current) =>
        current.filter(
          (item) =>
            item.id !== book.id,
        ),
      )
    } catch (firebaseError) {
      console.error(firebaseError)

      setError(
        'No se pudo eliminar el libro. Intentá nuevamente.',
      )
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <main className="page-container">
      <section className="hero-section">
        <div>
          <p className="eyebrow">
            Colección personal
          </p>

          <h1>Mis libros</h1>

          <p className="hero-copy">
            Guardá, buscá, editá y organizá tus libros favoritos usando Firestore.
          </p>
        </div>

        <Link
          className="button button-primary button-large"
          to="/libros/nuevo"
        >
          + Agregar libro
        </Link>
      </section>

      <section className="toolbar">
        <div className="search-box">
          <label htmlFor="bookSearch">
            Buscar por título
          </label>

          <input
            id="bookSearch"
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Ej. El principito"
          />
        </div>

        <div className="count-box">
          <strong>
            {filteredBooks.length}
          </strong>

          <span>
            {filteredBooks.length === 1
              ? 'resultado'
              : 'resultados'}
          </span>
        </div>
      </section>

      {error ? (
        <ErrorMessage
          message={error}
          onRetry={loadBooks}
        />
      ) : null}

      {loading ? (
        <LoadingMessage message="Consultando libros en Firestore..." />
      ) : filteredBooks.length === 0 ? (
        <section className="empty-state">
          <div className="empty-icon">
            📖
          </div>

          <h2>
            {search
              ? 'No encontramos libros'
              : 'Todavía no hay libros'}
          </h2>

          <p>
            {search
              ? 'Probá con otro título o limpiá la búsqueda.'
              : 'Agregá tu primer libro para empezar a construir la colección.'}
          </p>

          {search ? (
            <button
              className="button button-secondary"
              type="button"
              onClick={() => setSearch('')}
            >
              Limpiar búsqueda
            </button>
          ) : (
            <Link
              className="button button-primary"
              to="/libros/nuevo"
            >
              Agregar primer libro
            </Link>
          )}
        </section>
      ) : (
        <section className="book-grid">
          {filteredBooks.map((book) => (
            <div
              className={
                updatingId === book.id
                  ? 'book-card-wrapper is-updating'
                  : 'book-card-wrapper'
              }
              key={book.id}
            >
              <BookCard
                book={book}
                onToggleFavorite={
                  handleToggleFavorite
                }
                onDelete={
                  handleDelete
                }
                deletingId={
                  deletingId
                }
              />
            </div>
          ))}
        </section>
      )}
    </main>
  )
}