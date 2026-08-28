export default function ErrorMessage({
  message,
  onRetry,
}) {
  return (
    <div
      className="status-card status-error"
      role="alert"
    >
      <strong>
        Ocurrió un problema
      </strong>

      <span>{message}</span>

      {onRetry ? (
        <button
          className="button button-secondary"
          type="button"
          onClick={onRetry}
        >
          Reintentar
        </button>
      ) : null}
    </div>
  )
}