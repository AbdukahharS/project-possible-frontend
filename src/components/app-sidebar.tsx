import * as React from 'react'
import {
  Users,
  Earth,
  Frame,
  Map,
  PieChart,
  LayoutDashboard,
  Layers2,
  FileText
} from 'lucide-react'

import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import { TeamSwitcher } from '@/components/team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { useAuth } from '@/store/useAuth'

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  team: {
    name: 'Chorvoq',
    logo: Earth,
    plan: 'Geoportali',
  },
  navMain: [
    {
      title: 'Boshqaruv paneli',
      url: '/',
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: 'Inson resurslari',
      url: '/hr',
      icon: Users,
      items: [
        {
          title: "Bo'limlar",
          url: '#',
        },
        {
          title: 'Rollar',
          url: '#',
        },
        {
          title: 'Foydalanuvchilar',
          url: '#',
        },
      ],
    },
    {
      title: 'Xarita',
      url: '/map',
      icon: Map,
    },
    {
      title: 'Qatlamlar',
      url: '#',
      icon: Layers2,
    },
    {
      title: 'Yo\'riqnoma',
      url: '#',
      icon: FileText,
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth.getState()
  return (
    <Sidebar collapsible='icon' {...props} className='bg-background'>
      <SidebarHeader>
        <TeamSwitcher team={data.team} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            first_name: user?.first_name ?? '',
            last_name: user?.last_name ?? '',
            email: user?.email ?? '',
            avatar: data.user.avatar,
            id: user?.id ?? 0,
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
