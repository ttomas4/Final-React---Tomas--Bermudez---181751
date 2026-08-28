import {
  NavLink,
  useNavigate,
} from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()

  const isLoggedIn =
    sessionStorage.getItem(
      'biblioteca_auth',
    ) === 'true'

  const readerName =
    sessionStorage.getItem(
      'biblioteca_reader',
    ) || 'Lector'

  function handleLogout() {
    sessionStorage.removeItem(
      'biblioteca_auth',
    )

    sessionStorage.removeItem(
      'biblioteca_reader',
    )

    navigate('/login')
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink
          className="brand"
          to="/libros"
        >

          <span>
            <strong>
              Mi Biblioteca
            </strong>

            <small>
              CRUD de libros
            </small>
          </span>
        </NavLink>

        <nav
          className="nav-links"
          aria-label="Navegación principal"
        >
          <NavLink
            className={({ isActive }) =>
              isActive ? 'active' : ''
            }
            to="/libros"
          >
            Libros
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? 'active' : ''
            }
            to="/libros/nuevo"
          >
            Agregar
          </NavLink>
        </nav>

        {isLoggedIn ? (
          <div className="nav-user">
            <span>
              Hola, {readerName}
            </span>

            <button
              className="button button-ghost"
              type="button"
              onClick={handleLogout}
            >
              Salir
            </button>
          </div>
        ) : null}
      </div>
    </header>
  )
}