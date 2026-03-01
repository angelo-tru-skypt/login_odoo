import { useState } from "react";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!photo) {
      setError("Debes seleccionar una imagen");
      return;
    }

    const formData = new FormData();

    // 🔥 Ahora enviamos los campos directamente
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("photo", photo);

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(response.data.message);
      console.log(response.data);

      // limpiar formulario
      setUsername("");
      setEmail("");
      setPassword("");
      setPhoto(null);

    } catch (err) {
      console.error(err);

      const backendError =
        err.response?.data?.detail ||
        "Error al registrar usuario";

      setError(
        typeof backendError === "object"
          ? JSON.stringify(backendError)
          : backendError
      );
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Registro</h2>

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}

        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
          required
        />

        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Register;