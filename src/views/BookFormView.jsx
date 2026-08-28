import {
  useEffect,
  useState,
} from 'react'

import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom'

import BookForm from '../components/BookForm'
import ErrorMessage from '../components/ErrorMessage'
import LoadingMessage from '../components/LoadingMessage'

import {
  actualizar,
  crear,
  obtenerPorId,
} from '../services/booksService'

export default function BookFormView() {
  const { id } = useParams()
  const navigate = useNavigate()

  const editing = Boolean(id)

  const [book, setBook] =
    useState(null)

  const [loading, setLoading] =
    useState(editing)

  const [saving, setSaving] =
    useState(false)

  const [error, setError] =
    useState('')

  useEffect(() => {
    if (!editing) {
      setBook(null)
      return
    }

    async function loadBook() {
      setLoading(true)
      setError('')

      try {
        const data =
          await obtenerPorId(id)

        if (!data) {
          setError(
            'No encontramos el libro que querés editar.',
          )

          return
        }

        setBook(data)
      } catch (firebaseError) {
        console.error(firebaseError)

        setError(
          'No se pudo consultar el libro en Firestore.',
        )
      } finally {
        setLoading(false)
      }
    }

    loadBook()
  }, [editing, id])

  async function handleSubmit(values) {
    setSaving(true)
    setError('')

    try {
      if (editing) {
        await actualizar(id, values)
      } else {
        await crear(values)
      }

      navigate('/libros')
    } catch (firebaseError) {
      console.error(firebaseError)

      setError(
        editing
          ? 'No se pudieron actualizar los datos del libro.'
          : 'No se pudo guardar el libro.',
      )
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <main className="page-container narrow-container">
        <LoadingMessage message="Cargando datos del libro..." />
      </main>
    )
  }

  if (
    editing &&
    (!book || error)
  ) {
    return (
      <main className="page-container narrow-container">
        <Link
          className="back-link"
          to="/libros"
        >
          ← Volver a libros
        </Link>

        {error ? (
          <ErrorMessage
            message={error}
          />
        ) : null}
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

      <section className="page-heading">
        <p className="eyebrow">
          {editing
            ? 'Edición'
            : 'Nuevo registro'}
        </p>

        <h1>
          {editing
            ? 'Editar libro'
            : 'Agregar libro'}
        </h1>

        <p>
          {editing
            ? 'Modificá los datos y guardá los cambios directamente en Firestore.'
            : 'Completá los datos para sumar un nuevo libro a tu colección.'}
        </p>
      </section>

      {error ? (
        <ErrorMessage
          message={error}
        />
      ) : null}

      <BookForm
        initialValues={
          book || {
            title: '',
            author: '',
            year: '',
            genre: '',
            rating: '',
            favorite: false,
            description: '',
          }
        }
        onSubmit={handleSubmit}
        saving={saving}
        submitLabel={
          editing
            ? 'Guardar cambios'
            : 'Crear libro'
        }
      />
    </main>
  )
}