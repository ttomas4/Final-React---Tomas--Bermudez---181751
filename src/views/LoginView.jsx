import { useState } from 'react'

import {
  useLocation,
  useNavigate,
} from 'react-router-dom'

export default function LoginView() {
  const navigate = useNavigate()
  const location = useLocation()

  const [name, setName] =
    useState('')

  const [error, setError] =
    useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (!name.trim()) {
      setError(
        'Ingresá tu nombre para continuar.',
      )

      return
    }

    sessionStorage.setItem(
      'biblioteca_auth',
      'true',
    )

    sessionStorage.setItem(
      'biblioteca_reader',
      name.trim(),
    )

    navigate(
      location.state?.from ||
        '/libros',
      { replace: true },
    )
  }

  return (
    <main className="auth-page">
      <section className="auth-card">

        <p className="eyebrow">
          Mi Biblioteca
        </p>

        <h1>
          Entrá a tu biblioteca
        </h1>

        <p className="auth-copy">
          Este formulario funciona como acceso de la aplicación y permite mantener una sesión sencilla durante la navegación.
        </p>

        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >
          <label htmlFor="readerName">
            Tu nombre
          </label>

          <input
            id="readerName"
            type="text"
            value={name}
            onChange={(event) => {
              setName(
                event.target.value,
              )

              setError('')
            }}
            placeholder="Ej. Tomás"
            autoFocus
          />

          {error ? (
            <small className="field-error">
              {error}
            </small>
          ) : null}

          <button
            className="button button-primary button-large"
            type="submit"
          >
            Ingresar
          </button>
        </form>
      </section>
    </main>
  )
}