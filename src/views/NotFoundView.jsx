import { Link } from 'react-router-dom'

export default function NotFoundView() {
  return (
    <main className="page-container narrow-container">
      <section className="not-found">
        <span className="not-found-number">
          404
        </span>

        <p className="eyebrow">
          Página no encontrada
        </p>

        <h1>
          No existe.
        </h1>

        <p>
          La dirección que intentaste abrir no corresponde a ninguna sección de Mi Biblioteca.
        </p>

        <Link
          className="button button-primary"
          to="/libros"
        >
          Volver a libros
        </Link>
      </section>
    </main>
  )
}