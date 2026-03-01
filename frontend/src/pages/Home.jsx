import Navbar from "../components/NavBar"
import Footer from "../components/Footer"
import Card from "../components/Card"

export default function Home() {
  return (
    <div>
      <Navbar />

      <section className="hero">
        <h1>Desarrollo Backend con FastAPI + Odoo</h1>

        <p>
          Ventajas de conexión de Odoo en conjunto a FastAPI
        </p>

        <img
          src="https://images.unsplash.com/photo-1551434678-e076c223a692"
          alt="ERP"
        />

        <div className="cards">
          <Card
            title="Seguridad"
            description="Tiene modulos de autenticación integrados por defecto lo que le ahorra a FastAPI trabajar en ello"
          />

          <Card
            title="Escalabilidad"
            description="Posee una architectura resiliente a fallos y de nivel empresarial"
          />

          <Card
            title="Integración"
            description="utiliza JSON-RPC como medio conexión que permite una conexión remota eficiente"
          />
        </div>
      </section>

      <Footer />
    </div>
  )
}