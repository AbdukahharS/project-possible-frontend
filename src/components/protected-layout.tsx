// import { Outlet, Navigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { SidebarInset, SidebarProvider, SidebarTrigger } from './ui/sidebar'
import { AppSidebar } from './app-sidebar'
import { Separator } from '@radix-ui/react-separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb'
import { useAuth } from '@/store/useAuth'
import { ModeToggle } from './mode-toggle'
// import Navbar from './Navbar'
// import { Sidebar } from './Sidebar'

export default function ProtectedLayout() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated)

  return isAuthenticated ? (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 pr-4'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
            <Separator
              orientation='vertical'
              className='mr-2 data-[orientation=vertical]:h-4'
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className='hidden md:block'>
                  <BreadcrumbLink href='#'>
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className='hidden md:block' />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <ModeToggle />
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
          <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
            <div className='bg-muted/50 aspect-video rounded-xl' />
            <div className='bg-muted/50 aspect-video rounded-xl' />
            <div className='bg-muted/50 aspect-video rounded-xl' />
          </div>
          <div className='bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min' />
        </div>
      </SidebarInset>
    </SidebarProvider>
  ) : (
    <Navigate to='/login' replace />
  )
}
