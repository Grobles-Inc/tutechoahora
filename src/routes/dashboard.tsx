import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import SEO from '../components/SEO'
import { useAuth } from '../contexts/AuthContext'

const JSONBIN_MASTER_KEY = "$2a$10$nobY12xjte.MZ8ULE6NMTuH2yyjO.r.8veMsJchqYuoKIjgx0jBcm"
const JSONBIN_BIN_ID = "6884f7eaae596e708fbc1e19"

export const Route = createFileRoute('/dashboard')({
  beforeLoad: () => {
    const authStatus = localStorage.getItem('tutechoahora-auth')
    if (authStatus !== 'true') {
      throw redirect({
        to: '/signin',
      })
    }
  },
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
  component: Dashboard,
})

function Dashboard() {
  const initialProperties = Route.useLoaderData()
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [properties, setProperties] = useState(initialProperties)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [propertyToDelete, setPropertyToDelete] = useState<any>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleEdit = (property: any) => {
    if (property.id) {
      navigate({
        to: '/tutechoahora-agregar-propiedades',
        search: { id: property.id },
      })
    }
  }

  const handleAddProperty = () => {
    navigate({ to: '/tutechoahora-agregar-propiedades' })
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
          'X-Master-Key': JSONBIN_MASTER_KEY,
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

  const handleLogout = () => {
    logout()
    navigate({ to: '/signin' })
  }

  return (
    <>
      <SEO
        title="Dashboard | Tu Techo Ahora"
        description="Panel de administración para gestionar propiedades"
        keywords="dashboard, admin, propiedades, gestión"
      />
      <div className="w-11/12 lg:max-w-6xl mx-auto py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-base-content/70 mt-1">Gestión de Propiedades</p>
          </div>
          <div className="flex gap-3">
            <button
              className="btn btn-primary"
              onClick={handleAddProperty}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Agregar Propiedad
            </button>
            <button
              className="btn btn-outline btn-error"
              onClick={handleLogout}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="stats shadow mb-8">
          <div className="stat">
            <div className="stat-title">Total Propiedades</div>
            <div className="stat-value text-primary">{properties.length}</div>
          </div>
          <div className="stat">
            <div className="stat-title">En Venta</div>
            <div className="stat-value text-secondary">
              {properties.filter((p: any) => p.tipoOperacion === 'Venta').length}
            </div>
          </div>
          <div className="stat">
            <div className="stat-title">En Alquiler</div>
            <div className="stat-value text-accent">
              {properties.filter((p: any) => p.tipoOperacion === 'Alquiler').length}
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        {properties.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold mb-2">No hay propiedades</h3>
            <p className="text-base-content/70 mb-4">Comienza agregando tu primera propiedad</p>
            <button
              className="btn btn-primary"
              onClick={handleAddProperty}
            >
              Agregar Primera Propiedad
            </button>
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property: any) => (
              <div className="card bg-base-100 shadow-xl" key={property.id}>
                <figure>
                  <img
                    src={property.imagenes?.[0] || "/placeholder.jpg"}
                    alt={property.titulo}
                    className="h-48 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="card-title text-lg">{property.titulo}</h2>
                    <div className={`badge ${property.tipoOperacion === 'Venta' ? 'badge-primary' : 'badge-secondary'}`}>
                      {property.tipoOperacion}
                    </div>
                  </div>
                  <p className="text-sm text-base-content/70 mb-2">{property.ubicacion}</p>
                  <p className="text-sm line-clamp-2 mb-3">{property.descripcion}</p>
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-lg font-bold text-primary">
                      ${property.precio?.toLocaleString()} USD
                    </div>
                    <div className="text-sm text-base-content/70">
                      {property.areaTerreno} m²
                    </div>
                  </div>
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleEdit(property)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Editar
                    </button>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => openDeleteModal(property)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Delete Modal */}
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