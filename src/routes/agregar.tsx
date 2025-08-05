import { createFileRoute, useNavigate, useSearch, redirect } from '@tanstack/react-router'
import { z } from 'zod'
import { useAppForm } from '../hooks/demo.form'
import { useEffect, useState } from 'react'
const JSONBIN_MASTER_KEY = "$2a$10$nobY12xjte.MZ8ULE6NMTuH2yyjO.r.8veMsJchqYuoKIjgx0jBcm"
const JSONBIN_BIN_ID = "6884f7eaae596e708fbc1e19"


export const Route = createFileRoute('/agregar')({
  beforeLoad: () => {
    const authStatus = localStorage.getItem('tutechoahora-auth')
    if (authStatus !== 'true') {
      throw redirect({
        to: '/signin',
      })
    }
  },
  validateSearch: z.object({
    id: z.string().optional().or(z.number().optional()),
  }),
  component: AddEditProperty,
})

const schema = z.object({
  titulo: z.string().min(1, 'Título es requerido'),
  descripcion: z.string().min(1, 'Descripción es requerida'),
  precio: z.number().min(0, 'Precio debe ser un número positivo'),
  ubicacion: z.string().min(1, 'Ubicación es requerida'),
  tipoOperacion: z.string().min(1, 'Tipo de Operación es requerido'),
  areaTerreno: z.number().min(0, 'Area de Terreno debe ser un número positivo'),
  tipoVivienda: z.string().min(1, 'Tipo de Vivienda es requerido'),
  caracteristicas: z.string().min(1, 'Características son requeridas'),
  imagenes: z.string().array().optional(),
  videoUrl: z.string().optional(),
  coordenadas: z.string().min(1, 'Coordenadas son requeridas'),
})

function AddEditProperty() {
  const navigate = useNavigate()
  const { id: propertyId } = useSearch({ from: Route.id })
  const isEditMode = !!propertyId

  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(isEditMode)


  const form = useAppForm({
    defaultValues: {
      titulo: '',
      ubicacion: '',
      coordenadas: '',
      tipoOperacion: '',
      descripcion: '',
      precio: 0,
      areaTerreno: 0,
      tipoVivienda: '',
      caracteristicas: '',
      imagenes: [] as string[],
      videoUrl: '',
    },
    validators: {
      onSubmit: ({ value }) => {
        // Convert string numbers to actual numbers for validation
        const processedValues = {
          ...value,
          precio:
            typeof value.precio === 'string'
              ? parseFloat(value.precio) || 0
              : value.precio,
          areaTerreno:
            typeof value.areaTerreno === 'string'
              ? parseFloat(value.areaTerreno) || 0
              : value.areaTerreno,
        }
        const result = schema.safeParse(processedValues)
        if (result.success) {

          return undefined
        }

        return result.error.flatten()
      },
    },
    onSubmit: async ({ value }) => {
      // Convert string numbers to actual numbers before submission

      const processedValue = {
        ...value,
        precio: typeof value.precio === 'string' ? parseFloat(value.precio) || 0 : value.precio,
        areaTerreno: typeof value.areaTerreno === 'string' ? parseFloat(value.areaTerreno) || 0 : value.areaTerreno,
        imagenes: uploadedImages.length > 0 ? uploadedImages : value.imagenes,
      }

      try {
        // Fetch existing properties
        const getResponse = await fetch(
          `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`,
          {
            headers: {
              'X-Master-Key': JSONBIN_MASTER_KEY,
              'X-Bin-Meta': 'false',
            },
          },
        );

        let existingProperties: any[] = [];
        if (getResponse.ok) {
          const data = await getResponse.json();
          existingProperties = Array.isArray(data) ? data : (data.record || [])
        }

        let updatedProperties;

        if (isEditMode) {
          // Update existing property
          updatedProperties = existingProperties.map((p) =>
            p.id === parseInt(propertyId.toString(), 10)
              ? { ...p, ...processedValue }
              : p
          )
        } else {
          // Generate new ID for new property
          const maxId = existingProperties.reduce(
            (max: number, p: any) => (p.id && p.id > max ? p.id : max),
            0,
          );
          const newProperty = {
            id: maxId + 1,
            ...processedValue,
            imagenes: uploadedImages, // Use uploaded images
          };
          updatedProperties = [...existingProperties, newProperty];
        }


        // Update the JSONBin
        const updateResponse = await fetch(
          `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'X-Master-Key': JSONBIN_MASTER_KEY,
            },
            body: JSON.stringify(updatedProperties),
          },
        );

        if (!updateResponse.ok) {
          const errorText = await updateResponse.text();
          console.error("JSONBin update failed:", updateResponse.status, errorText);
          throw new Error(`Error al ${isEditMode ? 'actualizar' : 'guardar'}: ${updateResponse.status}`);
        }

        alert(`Propiedad ${isEditMode ? 'actualizada' : 'agregada'} correctamente!`);
        navigate({
          to: '/dashboard',
        })
      } catch (error: any) {
        console.error(`Error ${isEditMode ? 'updating' : 'adding'} property:`, error);
        alert(`Error al ${isEditMode ? 'actualizar' : 'agregar'} propiedad: ${error.message || "Error desconocido"}`);
      }
    },
  });

  useEffect(() => {
    if (isEditMode) {
      setIsLoading(true)
      const fetchProperty = async () => {
        try {
          const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
            headers: {
              'X-Master-Key': JSONBIN_MASTER_KEY,
              'X-Bin-Meta': 'false',
            },
          })
          const data = await response.json()
          const properties = Array.isArray(data) ? data : (data.record || [])
          console.log('Properties:', properties)
          console.log('Looking for property ID:', propertyId, 'parsed:', parseInt(propertyId.toString(), 10))
          const propertyToEdit = properties.find((p: any) => p.id === parseInt(propertyId.toString(), 10))
          console.log('Property to edit:', propertyToEdit)

          if (propertyToEdit) {
            // Set form values individually
            form.setFieldValue('titulo', propertyToEdit.titulo || '')
            form.setFieldValue('descripcion', propertyToEdit.descripcion || '')
            form.setFieldValue('precio', propertyToEdit.precio || 0)
            form.setFieldValue('ubicacion', propertyToEdit.ubicacion || '')
            form.setFieldValue('tipoOperacion', propertyToEdit.tipoOperacion || '')
            form.setFieldValue('areaTerreno', propertyToEdit.areaTerreno || 0)
            form.setFieldValue('tipoVivienda', propertyToEdit.tipoVivienda || '')
            form.setFieldValue('caracteristicas', propertyToEdit.caracteristicas || '')
            form.setFieldValue('coordenadas', propertyToEdit.coordenadas || '')
            form.setFieldValue('videoUrl', propertyToEdit.videoUrl || '')
            setUploadedImages(propertyToEdit.imagenes || [])
          } else {
            alert('Propiedad no encontrada.')
            navigate({ to: '/dashboard' })
          }
        } catch (error) {
          console.error('Error fetching property:', error)
        } finally {
          setIsLoading(false)
        }
      }
      fetchProperty()
    }
  }, [isEditMode, propertyId, navigate])


  const handleImageUpload = async (files: FileList) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    const filesArray = Array.from(files);
    const newUploadedUrls: string[] = [];

    for (let i = 0; i < filesArray.length; i++) {
      const file = filesArray[i];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'ml_default'); // Replace with your actual upload preset
      formData.append('folder', 'techo/properties');

      try {
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/diqe1byxy/image/upload', // Replace with your Cloudinary cloud name
          {
            method: 'POST',
            body: formData,
          }
        );
        const data = await response.json();
        if (data.secure_url) {
          newUploadedUrls.push(data.secure_url);
        }
        setUploadProgress(((i + 1) / filesArray.length) * 100);
      } catch (err) {
        console.error('Upload error:', err);
      }
    }

    setUploadedImages(prev => [...prev, ...newUploadedUrls]);
    setIsUploading(false);
    setUploadProgress(0);
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-lg loading-spinner text-primary"></span>
      </div>
    )
  }

  return (
    <div className="w-11/12 lg:max-w-5xl mx-auto py-8">
      <h3 className="font-bold text-lg mb-4">{isEditMode ? 'Editar' : 'Agregar'} Propiedad</h3>
      <form.AppForm>
        <form
          onSubmit={(e) => {

            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className="flex flex-col gap-4 lg:grid lg:grid-cols-2"
        >
          <form.AppField name="titulo">
            {(field) => (
              <div className="form-control w-full">
                <field.TextField
                  label="Título"
                  placeholder="Título de la Publicación"
                />
              </div>
            )}
          </form.AppField>

          <form.AppField name="ubicacion">
            {(field) => (
              <div className="form-control w-full">
                <field.TextField
                  label="Ubicación"
                  placeholder="Ubicación de la Propiedad"
                />
              </div>
            )}
          </form.AppField>

          <form.AppField name="coordenadas">
            {(field) => (
              <div className="form-control w-full">
                <field.TextField
                  label="Coordenadas"
                  placeholder="Pegar las coordenadas desde Google Maps"
                />
              </div>
            )}
          </form.AppField>

          <form.AppField name="tipoOperacion">
            {(field) => (
              <div className="form-control w-full">
                <field.Select
                  label="Tipo de Operación"
                  values={[
                    { value: '', label: 'Seleccione tipo de operación' },
                    { value: 'Venta', label: 'Venta' },
                    { value: 'Alquiler', label: 'Alquiler' },
                  ]}
                />
              </div>
            )}
          </form.AppField>

          <form.AppField name="areaTerreno">
            {(field) => (
              <div className="form-control w-full">
                <field.TextField
                  label="Area / Superficie (m²)"
                  type="number"
                  placeholder="0"
                />
              </div>
            )}
          </form.AppField>

          <form.AppField name="precio">
            {(field) => (
              <div className="form-control w-full">
                <field.TextField
                  label="Precio (USD)"
                  type="number"
                  placeholder="0"
                />
              </div>
            )}
          </form.AppField>

          <form.AppField name="tipoVivienda">
            {(field) => (
              <div className="form-control w-full">
                <field.Select
                  label="Tipo de Propiedad"
                  values={[
                    { value: '', label: 'Seleccione tipo de vivienda' },
                    { value: 'Casa', label: 'Casa' },
                    { value: 'Departamento', label: 'Departamento' },
                    { value: 'Local', label: 'Local' },
                    { value: 'Terreno', label: 'Terreno' },
                  ]}
                />
              </div>
            )}
          </form.AppField>
          <form.AppField name="videoUrl">
            {(field) => (
              <div className="form-control w-full">
                <field.TextField
                  label="URL del Video"
                  placeholder="URL del Video"
                />
              </div>
            )}
          </form.AppField>
          <form.AppField name="descripcion">
            {(field) => (
              <div className="form-control w-full">
                <field.TextArea
                  label="Descripción"
                  placeholder="Descripción de la Propiedad"
                />
              </div>
            )}
          </form.AppField>

          <form.AppField name="caracteristicas">
            {(field) => (
              <div className="form-control w-full">
                <field.TextArea
                  label="Características"
                  rows={4}
                  placeholder="Número de habitaciones, baños, etc."
                />
              </div>
            )}
          </form.AppField>



          <div className="form-control w-full col-span-2">
            <label className="label">
              <span className="label-text">Imágenes</span>
            </label>

            <div className="relative">
              <input
                type="file"
                multiple
                className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files) {
                    handleImageUpload(e.target.files)
                  }
                }}
                disabled={isUploading}
              />
              <div
                className={`rounded-lg border-2 border-dashed border-zinc-300 p-8 text-center transition-colors hover:border-primary hover:opacity-80 ${isUploading ? 'pointer-events-none opacity-50' : ''}`}
              >
                <div className="flex flex-col items-center gap-3">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="size-10"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {' '}
                      <path
                        opacity="0.5"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M3 14.25C3.41421 14.25 3.75 14.5858 3.75 15C3.75 16.4354 3.75159 17.4365 3.85315 18.1919C3.9518 18.9257 4.13225 19.3142 4.40901 19.591C4.68577 19.8678 5.07435 20.0482 5.80812 20.1469C6.56347 20.2484 7.56459 20.25 9 20.25H15C16.4354 20.25 17.4365 20.2484 18.1919 20.1469C18.9257 20.0482 19.3142 19.8678 19.591 19.591C19.8678 19.3142 20.0482 18.9257 20.1469 18.1919C20.2484 17.4365 20.25 16.4354 20.25 15C20.25 14.5858 20.5858 14.25 21 14.25C21.4142 14.25 21.75 14.5858 21.75 15V15.0549C21.75 16.4225 21.75 17.5248 21.6335 18.3918C21.5125 19.2919 21.2536 20.0497 20.6517 20.6516C20.0497 21.2536 19.2919 21.5125 18.3918 21.6335C17.5248 21.75 16.4225 21.75 15.0549 21.75H8.94513C7.57754 21.75 6.47522 21.75 5.60825 21.6335C4.70814 21.5125 3.95027 21.2536 3.34835 20.6517C2.74643 20.0497 2.48754 19.2919 2.36652 18.3918C2.24996 17.5248 2.24998 16.4225 2.25 15.0549C2.25 15.0366 2.25 15.0183 2.25 15C2.25 14.5858 2.58579 14.25 3 14.25Z"
                        fill="#1C274C"
                      ></path>{' '}
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 2.25C12.2106 2.25 12.4114 2.33852 12.5535 2.49392L16.5535 6.86892C16.833 7.17462 16.8118 7.64902 16.5061 7.92852C16.2004 8.20802 15.726 8.18678 15.4465 7.88108L12.75 4.9318V16C12.75 16.4142 12.4142 16.75 12 16.75C11.5858 16.75 11.25 16.4142 11.25 16V4.9318L8.55353 7.88108C8.27403 8.18678 7.79963 8.20802 7.49393 7.92852C7.18823 7.64902 7.16698 7.17462 7.44648 6.86892L11.4465 2.49392C11.5886 2.33852 11.7894 2.25 12 2.25Z"
                        fill="#1C274C"
                      ></path>{' '}
                    </g>
                  </svg>
                  <div>
                    <button className="btn btn-outline text-base-content/70 font-medium">
                      Seleccionar imágenes
                    </button>
                    <p className="mt-1 text-sm text-base-content/50">
                      Arrastra archivos aquí o haz clic para seleccionar
                    </p>
                    <p className="mt-1 text-xs text-base-content/40">
                      PNG, JPG hasta 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {isUploading && (
              <div className="mt-3 flex items-center gap-3 rounded-lg bg-base-200 p-3">
                <span className="loading loading-spinner loading-sm text-primary"></span>
                <div className="flex-1">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Subiendo imágenes...
                    </span>
                    <span className="text-sm text-base-content/70">
                      {Math.round(uploadProgress)}%
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-base-300">
                    <div
                      className="h-2 rounded-full bg-primary transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {uploadedImages.length > 0 && (
              <div className="mt-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium">
                  <svg
                    className="h-4 w-4 text-success"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Imágenes subidas ({uploadedImages.length})
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                  {uploadedImages.map((url, index) => (
                    <div key={index} className="group relative">
                      <img
                        src={url}
                        alt={`Property image ${index + 1}`}
                        className="h-24 w-full rounded-lg border border-base-300 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 btn btn-circle btn-xs btn-error opacity-0 transition-opacity group-hover:opacity-100"
                        title="Eliminar imagen"
                      >
                        <svg
                          className="h-3 w-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div />
          <div className="modal-action  flex items-center gap-4">
            {
              isLoading ? (
                <button className="btn btn-primary" disabled>
                  <span className="loading loading-spinner loading-sm"></span>
                </button>
              ) : (
                <form.SubscribeButton label={isEditMode ? 'Guardar Cambios' : 'Guardar Propiedad'} />
              )
            }
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate({ to: '/dashboard' })}
            >
              Cancelar
            </button>
          </div>
        </form>
      </form.AppForm>
    </div>
  )
} 