export default function LoadingMessage({
  message = 'Cargando...',
}) {
  return (
    <div
      className="status-card"
      role="status"
      aria-live="polite"
    >
      <span
        className="spinner"
        aria-hidden="true"
      />

      <span>{message}</span>
    </div>
  )
}