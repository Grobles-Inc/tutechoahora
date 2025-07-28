import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/propiedad/$propiedadId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/propiedad/$propiedadId"!</div>
}
