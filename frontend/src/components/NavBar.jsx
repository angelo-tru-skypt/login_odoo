import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <div className="navbar">
      <h2>User System</h2>

      <div>
        <Link to="/home">
          <button style={{ marginRight: "10px" }}>Inicio</button>
        </Link>

        <Link to="/users">
          <button>Usuarios</button>
        </Link>
      </div>
    </div>
  )
}