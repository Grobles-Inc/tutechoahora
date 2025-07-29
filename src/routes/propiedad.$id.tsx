import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/propiedad/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Vista de propiedad "/propiedad/$id"!</div>
}
