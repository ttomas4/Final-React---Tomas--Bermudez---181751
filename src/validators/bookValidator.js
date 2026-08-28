export function validarLibro(book) {
  const errors = {}

  if (!book.title.trim()) {
    errors.title = 'El título es obligatorio.'
  }

  if (!book.author.trim()) {
    errors.author = 'El autor es obligatorio.'
  }

  if (!book.genre.trim()) {
    errors.genre = 'El género es obligatorio.'
  }

  if (!book.year) {
    errors.year = 'El año de publicación es obligatorio.'
  } else if (
    book.year < 0 ||
    book.year > new Date().getFullYear()
  ) {
    errors.year = 'Ingresá un año válido.'
  }

  if (
    book.rating === '' ||
    Number.isNaN(Number(book.rating))
  ) {
    errors.rating = 'El rating es obligatorio.'
  } else if (
    Number(book.rating) < 0 ||
    Number(book.rating) > 5
  ) {
    errors.rating = 'El rating debe estar entre 0 y 5.'
  }

  return errors
}