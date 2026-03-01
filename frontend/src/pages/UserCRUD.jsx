import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:8000/users";

export default function UserCRUD() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const getUsers = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Eliminar
  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    getUsers();
  };

  // Editar
  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setForm({
      name: user.name,
      email: user.email,
      password: ""
    });
  };

  // Cambios en inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Actualizar
  const handleUpdate = async (e) => {
    e.preventDefault();

    await fetch(`${API_URL}/${editingUserId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    setEditingUserId(null);
    setForm({ name: "", email: "", password: "" });
    getUsers();
  };

  // Cancelar edición
  const cancelEdit = () => {
    setEditingUserId(null);
  };

  return (
    <div className="crud-container">
      <h2 className="crud-title">Gestión de Usuarios</h2>

      <table className="crud-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4">No hay usuarios registrados</td>
            </tr>
          ) : (
            users.map((user) => (
              <React.Fragment key={user.id}>
                <tr>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className="btn btn-edit"
                      onClick={() => handleEdit(user)}
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(user.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>

                {editingUserId === user.id && (
                  <tr className="edit-row">
                    <td colSpan="4">
                      <form className="edit-form" onSubmit={handleUpdate}>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                        />

                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                        />

                        <input
                          type="password"
                          name="password"
                          value={form.password}
                          onChange={handleChange}
                          placeholder="Nueva contraseña"
                        />

                        <button type="submit" className="btn btn-save">
                          Guardar
                        </button>

                        <button
                          type="button"
                          className="btn btn-cancel"
                          onClick={cancelEdit}
                        >
                          Cancelar
                        </button>
                      </form>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}