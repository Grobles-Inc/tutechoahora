import BotonContacto from "./BotonContacto"
import { Link } from "@tanstack/react-router"

export default function CTA() {
  return (
    <section className="relative md:my-20 py-20 px-4">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center md:rounded-[40px] mx-auto max-w-7xl"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=1167&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
      </div>
      <div className="absolute inset-0 w-full h-full bg-black/50 md:rounded-[40px] mx-auto max-w-7xl"></div>
      <div className="container mx-auto relative">
        <div className="flex flex-col items-center text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" id="title">
            ¡Listo para encontrar tu hogar de tus sueños!
          </h2>

          <p
            className="text-lg mb-10 max-w-2xl"
          >
            Encuentra tu hogar ideal, contacta a nuestro equipo de profesionales, para poder conocer el hogar de tus sueños.
          </p>

          <Link to="/contacto">
            <BotonContacto />
          </Link>
        </div>
      </div>
    </section>
  )
}
