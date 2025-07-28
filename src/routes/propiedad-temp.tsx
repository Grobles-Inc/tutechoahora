import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/propiedad-temp')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/propiedad-temp"!</div>
}
