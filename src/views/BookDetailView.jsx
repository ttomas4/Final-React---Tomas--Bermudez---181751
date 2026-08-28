import {
  useEffect,
  useState,
} from 'react'

import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom'

import ErrorMessage from '../components/ErrorMessage'
import LoadingMessage from '../components/LoadingMessage'

import {
  cambiarEstado,
  eliminar,
  obtenerPorId,
} from '../services/booksService'

import { formatRating } from '../utils/formatters'

export default function BookDetailView() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [book, setBook] =
    useState(null)

  const [loading, setLoading] =
    useState(true)

  const [busy, setBusy] =
    useState(false)

  const [error, setError] =
    useState('')

  async function loadBook() {
    setLoading(true)
    setError('')

    try {
      const data =
        await obtenerPorId(id)

      if (!data) {
        setError(
          'El libro solicitado no existe o fue eliminado.',
        )

        return
      }

      setBook(data)
    } catch (firebaseError) {
      console.error(firebaseError)

      setError(
        'No se pudo consultar el detalle del libro.',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBook()
  }, [id])

  async function handleToggleFavorite() {
    if (!book) return

    setBusy(true)

    try {
      await cambiarEstado(
        book.id,
        !book.favorite,
      )

      setBook((current) => ({
        ...current,
        favorite:
          !current.favorite,
      }))
    } catch (firebaseError) {
      console.error(firebaseError)

      setError(
        'No se pudo actualizar el estado de favorito.',
      )
    } finally {
      setBusy(false)
    }
  }

  async function handleDelete() {
    if (!book) return

    const confirmed = window.confirm(
      `¿Seguro que querés eliminar "${book.title}"?`,
    )

    if (!confirmed) return

    setBusy(true)

    try {
      await eliminar(book.id)

      navigate('/libros')
    } catch (firebaseError) {
      console.error(firebaseError)

      setError(
        'No se pudo eliminar el libro.',
      )

      setBusy(false)
    }
  }

  if (loading) {
    return (
      <main className="page-container narrow-container">
        <LoadingMessage message="Cargando detalle..." />
      </main>
    )
  }

  if (error || !book) {
    return (
      <main className="page-container narrow-container">
        <Link
          className="back-link"
          to="/libros"
        >
          ← Volver a libros
        </Link>

        <ErrorMessage
          message={
            error ||
            'No se encontró el libro.'
          }
          onRetry={loadBook}
        />
      </main>
    )
  }

  return (
    <main className="page-container narrow-container">
      <Link
        className="back-link"
        to="/libros"
      >
        ← Volver a libros
      </Link>

      <article className="detail-card">
        <div
          className="detail-cover"
          aria-hidden="true"
        >
          <span>LIBRO</span>

          <strong>
            {book.title
              .slice(0, 1)
              .toUpperCase()}
          </strong>
        </div>

        <div className="detail-content">
          <div className="book-card-topline">
            <span className="tag">
              {book.genre}
            </span>

            <span
              className={`favorite-pill ${
                book.favorite
                  ? 'is-favorite'
                  : ''
              }`}
            >
              {book.favorite
                ? '★ Favorito'
                : '☆ No favorito'}
            </span>
          </div>

          <p className="eyebrow">
            Detalle del libro
          </p>

          <h1>{book.title}</h1>

          <p className="detail-author">
            {book.author}
          </p>

          <div className="detail-stats">
            <div>
              <span>Año</span>
              <strong>
                {book.year}
              </strong>
            </div>

            <div>
              <span>Rating</span>
              <strong>
                ⭐ {formatRating(book.rating)}
              </strong>
            </div>
          </div>

          <div className="detail-description">
            <h2>Descripción</h2>

            <p>
              {book.description ||
                'Este libro todavía no tiene una descripción.'}
            </p>
          </div>

          {error ? (
            <ErrorMessage
              message={error}
            />
          ) : null}

          <div className="detail-actions">
            <button
              className="button button-primary"
              type="button"
              onClick={
                handleToggleFavorite
              }
              disabled={busy}
            >
              {book.favorite
                ? 'Quitar favorito'
                : 'Marcar favorito'}
            </button>

            <Link
              className="button button-secondary"
              to={`/libros/editar/${book.id}`}
            >
              Editar
            </Link>

            <button
              className="button button-danger"
              type="button"
              onClick={handleDelete}
              disabled={busy}
            >
              {busy
                ? 'Procesando...'
                : 'Eliminar'}
            </button>
          </div>
        </div>
      </article>
    </main>
  )
}