import {
  useEffect,
  useRef,
  useState,
} from 'react'

import { validarLibro } from '../validators/bookValidator'

const emptyBook = {
  title: '',
  author: '',
  year: '',
  genre: '',
  rating: '',
  favorite: false,
  description: '',
}

export default function BookForm({
  initialValues = emptyBook,
  onSubmit,
  saving,
  submitLabel,
}) {
  const [form, setForm] = useState({
    ...emptyBook,
    ...initialValues,
  })

  const [errors, setErrors] = useState({})

  const titleRef = useRef(null)

  useEffect(() => {
    titleRef.current?.focus()
  }, [])

  function handleChange(event) {
    const {
      name,
      value,
      type,
      checked,
    } = event.target

    const nextValue =
      type === 'checkbox'
        ? checked
        : value

    setForm((current) => ({
      ...current,
      [name]: nextValue,
    }))

    setErrors((current) => ({
      ...current,
      [name]: '',
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const validationErrors =
      validarLibro(form)

    if (
      Object.keys(validationErrors).length > 0
    ) {
      setErrors(validationErrors)
      titleRef.current?.focus()
      return
    }

    onSubmit({
      ...form,
      year: Number(form.year),
      rating: Number(form.rating),
      title: form.title.trim(),
      author: form.author.trim(),
      genre: form.genre.trim(),
      description: form.description.trim(),
    })
  }

  return (
    <form
      className="form-card"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="form-grid">
        <div className="form-field form-field-wide">
          <label htmlFor="title">
            Título *
          </label>

          <input
            ref={titleRef}
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="Ej. Cien años de soledad"
            aria-invalid={Boolean(errors.title)}
          />

          {errors.title ? (
            <small className="field-error">
              {errors.title}
            </small>
          ) : null}
        </div>

        <div className="form-field">
          <label htmlFor="author">
            Autor *
          </label>

          <input
            id="author"
            name="author"
            type="text"
            value={form.author}
            onChange={handleChange}
            placeholder="Ej. Gabriel García Márquez"
            aria-invalid={Boolean(errors.author)}
          />

          {errors.author ? (
            <small className="field-error">
              {errors.author}
            </small>
          ) : null}
        </div>

        <div className="form-field">
          <label htmlFor="year">
            Año *
          </label>

          <input
            id="year"
            name="year"
            type="number"
            min="0"
            max={new Date().getFullYear()}
            value={form.year}
            onChange={handleChange}
            placeholder="1967"
            aria-invalid={Boolean(errors.year)}
          />

          {errors.year ? (
            <small className="field-error">
              {errors.year}
            </small>
          ) : null}
        </div>

        <div className="form-field">
          <label htmlFor="genre">
            Género *
          </label>

          <input
            id="genre"
            name="genre"
            type="text"
            value={form.genre}
            onChange={handleChange}
            placeholder="Ej. Realismo mágico"
            aria-invalid={Boolean(errors.genre)}
          />

          {errors.genre ? (
            <small className="field-error">
              {errors.genre}
            </small>
          ) : null}
        </div>

        <div className="form-field">
          <label htmlFor="rating">
            Rating *
          </label>

          <input
            id="rating"
            name="rating"
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={form.rating}
            onChange={handleChange}
            placeholder="4.8"
            aria-invalid={Boolean(errors.rating)}
          />

          {errors.rating ? (
            <small className="field-error">
              {errors.rating}
            </small>
          ) : null}
        </div>

        <div className="form-field form-field-wide">
          <label htmlFor="description">
            Descripción
          </label>

          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="5"
            placeholder="Escribí una breve descripción del libro..."
          />
        </div>

        <label className="favorite-check">
          <input
            name="favorite"
            type="checkbox"
            checked={form.favorite}
            onChange={handleChange}
          />

          <span>
            Marcar como favorito
          </span>
        </label>
      </div>

      <div className="form-actions">
        <button
          className="button button-primary button-large"
          type="submit"
          disabled={saving}
        >
          {saving
            ? 'Guardando...'
            : submitLabel}
        </button>

        <button
          className="button button-secondary button-large"
          type="button"
          onClick={() =>
            setForm({ ...emptyBook })
          }
          disabled={saving}
        >
          Limpiar campos
        </button>
      </div>
    </form>
  )
}