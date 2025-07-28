import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/propiedad')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/propiedad"!</div>
}
