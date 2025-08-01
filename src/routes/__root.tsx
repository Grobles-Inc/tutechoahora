import { Outlet, createRootRoute, useLocation } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Header from '../components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const location = useLocation()
  const isAuthRoute = location.pathname === '/signin' || location.pathname === '/dashboard' || location.pathname.startsWith('/tutechoahora-')

  if (isAuthRoute) {
    return (
      <>
        <main>
          <Outlet />
        </main>
        <TanStackRouterDevtools />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="mt-28">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <TanStackRouterDevtools />
    </>
  )
}
