import { createFileRoute, useRouter } from '@tanstack/react-router';
import SEO from '../components/SEO';
import { useState } from 'react';
const JSONBIN_MASTER_KEY = import.meta.env.VITE_JSONBIN_MASTER_KEY;
const JSONBIN_BIN_ID = "6884f7eaae596e708fbc1e19"

export const Route = createFileRoute('/tutecho-ahora-editar-propiedades-akj14j1jasdf123154j2l51kjiqdoa')({
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
  const initialProperties = Route.useLoaderData()
  const router = useRouter()
  const [properties, setProperties] = useState(initialProperties)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [propertyToDelete, setPropertyToDelete] = useState<any>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleEdit = (property: any) => {
    if (property.id) {
      router.navigate({
        to: '/tutecho-ahora-agregar-propiedades-a14ada11251agasdg2321341',
        search: { id: property.id },
      })
    }
  }

  const openDeleteModal = (property: any) => {
    setPropertyToDelete(property)
    setShowDeleteModal(true)
  }

  const closeDeleteModal = () => {
    setPropertyToDelete(null)
    setShowDeleteModal(false)
  }

  const handleDelete = async () => {
    if (!propertyToDelete) return
    setIsDeleting(true)
    try {
      const updatedProperties = properties.filter((p: any) => p.id !== propertyToDelete.id)

      const updateResponse = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': "$2a$10$nobY12xjte.MZ8ULE6NMTuH2yyjO.r.8veMsJchqYuoKIjgx0jBcm",
        },
        body: JSON.stringify(updatedProperties),
      })

      if (!updateResponse.ok) {
        const errorText = await updateResponse.text()
        throw new Error(`Error deleting property: ${updateResponse.status} ${errorText}`)
      }

      setProperties(updatedProperties)
      alert('Propiedad eliminada correctamente!')
      closeDeleteModal()
    } catch (error: any) {
      console.error('Error deleting property:', error)
      alert(`Error al eliminar propiedad: ${error.message || 'Error desconocido'}`)
    } finally {
      setIsDeleting(false)
    }
  }


  return (
    <>
      <SEO
        title="Propiedades en Venta y Alquiler | Tu Techo Ahora"
        description="Explora nuestra amplia selección de propiedades en venta y alquiler. Casas, apartamentos y terrenos con las mejores ubicaciones y precios."
        keywords="propiedades, casas, apartamentos, venta, alquiler, inmobiliaria, real estate"
      />
      <div className="w-11/12 lg:max-w-5xl mx-auto py-8">
        <h1>Propiedades</h1>

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
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEdit(property)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-error"
                      onClick={() => openDeleteModal(property)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          }
        </section>
        {showDeleteModal && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Confirmar Eliminación</h3>
              <p className="py-4">
                ¿Estás seguro de que deseas eliminar la propiedad "{propertyToDelete?.titulo}"? Esta acción no se puede deshacer.
              </p>
              <div className="modal-action">
                <button className="btn" onClick={closeDeleteModal} disabled={isDeleting}>
                  Cancelar
                </button>
                <button
                  className={`btn btn-error ${isDeleting ? 'loading' : ''}`}
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Eliminando...' : 'Eliminar'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
