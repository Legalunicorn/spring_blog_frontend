import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import './assets/styles/animations.scss'
import { RouterProvider } from 'react-router'
import router from './helpers/routing/routes'
import { AuthContextProvider } from './helpers/context/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient: QueryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </QueryClientProvider>
  </StrictMode>,
)
