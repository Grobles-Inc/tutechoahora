import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Header from '../components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <main className="mt-28">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <TanStackRouterDevtools />
    </>
  ),
})
