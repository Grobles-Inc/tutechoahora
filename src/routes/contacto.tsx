import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { useAppForm } from '../hooks/demo.form'
import SEO from '@/components/SEO'

export const Route = createFileRoute('/contacto')({
  component: RouteComponent,
})

const schema = z.object({
  name: z.string().min(1, 'Nombre es requerido'),
  email: z.string().email('Correo electrónico inválido'),
  phone: z.string().min(1, 'Celular es requerido'),
  details: z.string().min(1, 'Detalles son requeridos'),
})

function RouteComponent() {
  const form = useAppForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      details: '',
    },
    validators: {
      onBlur: schema,

    },
    onSubmit: ({ value }) => {
      const { name, email, phone, details } = value
      const message = `*Nueva consulta de Techo App:*\n\n*Nombre:* ${name}\n*Correo:* ${email}\n*Celular:* ${phone}\n*Detalles:* ${details}`

      const whatsappUrl = `https://wa.me/51928323814?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, "_blank")
    },
  })

  return (
    <>
      <SEO
        title="Tu Techo Ahora - Encuentra tu hogar ideal | Inmobiliaria"
        description="Encuentra el hogar perfecto para ti y tu familia. Propiedades en venta y alquiler con asesoría personalizada. Tu Techo Ahora, tu inmobiliaria de confianza."
        keywords="inmobiliaria, propiedades, casas, apartamentos, venta, alquiler, hogar, real estate, encontrar casa"
      />
      <div>
        <section className="flex flex-col lg:flex-row items-center justify-center p-4 lg:p-16">
          <div className="flex-1 max-w-lg lg:mr-8 p-6">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">REALIZA TU CONSULTA</h1>
            <p className="mb-6 text-gray-600">
              Póngase en contacto con nosotros y reciba una consulta gratuita para
              encontrar soluciones a sus problemas hoy mismo.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
              }}
              className="space-y-4"
            >
              <form.AppField name="name">
                {(field) => <field.TextField label="Nombre" placeholder="Tu nombre" />}
              </form.AppField>

              <form.AppField name="email">
                {(field) => <field.TextField label="Correo Electrónico" placeholder="tu@correo.com" />}
              </form.AppField>

              <form.AppField name="phone">
                {(field) => <field.TextField label="Celular" placeholder="Tu número de celular" />}
              </form.AppField>

              <form.AppField name="details">
                {(field) => <field.TextArea label="Mensaje" rows={4} placeholder="Escribe tu consulta aquí" />}
              </form.AppField>

              <div className="w-full">
                <form.AppForm>
                  <form.SubscribeButton label="CONTÁCTENOS" />
                </form.AppForm>
              </div>
            </form>
          </div>
          <div className="flex-1 hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="House"
              className="shadow-lg w-full h-auto object-cover opacity-70"
            />
          </div>
        </section>
        <div className="divider"></div>

        <section className="p-4 lg:p-16 flex justify-between">
          <div className="">
            <h2 className="text-3xl font-bold mb-4 text-primary">CONTACTO</h2>
            <p className="lg:text-lg text-sm text-gray-700 mb-2">(+51) 928 323 814</p>
            <p className="lg:text-lg text-sm text-gray-700 mb-2">
              info@tutechoahora.com
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
