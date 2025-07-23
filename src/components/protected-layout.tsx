import { Navigate, Outlet } from 'react-router-dom'
import { SidebarInset, SidebarProvider, SidebarTrigger } from './ui/sidebar'
import { AppSidebar } from './app-sidebar'
import { Separator } from '@radix-ui/react-separator'
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from './ui/breadcrumb'
import { useAuth } from '@/store/useAuth'
import { ModeToggle } from './mode-toggle'

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
            {/* <Breadcrumb>
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
            </Breadcrumb> */}
          </div>
          <ModeToggle />
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  ) : (
    <Navigate to='/login' replace />
  )
}
