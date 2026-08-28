import { Link } from 'react-router-dom'
import { formatRating } from '../utils/formatters'

export default function BookCard({
  book,
  onToggleFavorite,
  onDelete,
  deletingId,
}) {
  return (
    <article className="book-card">
      <div
        className="book-card-cover"
        aria-hidden="true"
      >
        <span>LIBRO</span>

        <strong>
          {book.title.slice(0, 1).toUpperCase()}
        </strong>
      </div>

      <div className="book-card-body">
        <div className="book-card-topline">
          <span className="tag">
            {book.genre}
          </span>

          <button
            className={`favorite-button ${
              book.favorite ? 'is-favorite' : ''
            }`}
            type="button"
            onClick={() => onToggleFavorite(book)}
            aria-label={
              book.favorite
                ? 'Quitar de favoritos'
                : 'Marcar como favorito'
            }
            title={
              book.favorite
                ? 'Quitar de favoritos'
                : 'Marcar como favorito'
            }
          >
            {book.favorite ? '★' : '☆'}
          </button>
        </div>

        <h2>{book.title}</h2>

        <p className="book-author">
          {book.author}
        </p>

        <div className="book-meta">
          <span>{book.year}</span>

          <span>
            ⭐ {formatRating(book.rating)}
          </span>
        </div>

        <div className="card-actions">
          <Link
            className="button button-primary"
            to={`/libros/${book.id}`}
          >
            Ver detalle
          </Link>

          <Link
            className="button button-secondary"
            to={`/libros/editar/${book.id}`}
          >
            Editar
          </Link>

          <button
            className="button button-danger"
            type="button"
            onClick={() => onDelete(book)}
            disabled={deletingId === book.id}
          >
            {deletingId === book.id
              ? 'Eliminando...'
              : 'Eliminar'}
          </button>
        </div>
      </div>
    </article>
  )
}