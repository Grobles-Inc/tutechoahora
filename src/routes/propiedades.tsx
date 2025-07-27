import { createFileRoute, Link } from '@tanstack/react-router'
const JSONBIN_MASTER_KEY = import.meta.env.VITE_JSONBIN_MASTER_KEY;
const JSONBIN_BIN_ID = "6884f7eaae596e708fbc1e19"

export const Route = createFileRoute('/propiedades')({
  loader: async () => {
    const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
      headers: {
        'X-Master-Key': JSONBIN_MASTER_KEY,
        'X-Bin-Meta': 'false',
      },
    })
    const data = await response.json()
    return Array.isArray(data) ? data : data.record || []
  },
  component: RouteComponent,
})

function RouteComponent() {
  const properties = Route.useLoaderData()
  return <div className="w-11/12 lg:max-w-5xl mx-auto py-8">
    <h1>Propiedades</h1>

    <Link to="/agregar-propiedad" className="btn btn-neutral">Agregar Propiedad</Link>
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {
        properties.map((property: any) => (
          <div className="card bg-base-100 shadow-xl" key={property.id}>
            <figure>
              <img
                src={property.imagenes?.[0] || "/placeholder.jpg"}
                alt={property.titulo}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{property.titulo}</h2>
              <p>{property.descripcion}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Ver Detalles</button>
              </div>
            </div>
          </div>
        ))
      }
    </section>
  </div>
}
