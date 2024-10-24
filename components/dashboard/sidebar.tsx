"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  ChevronDown, 
  ChevronRight,
  LayoutDashboard,
  Box,
  Grid,
  ShoppingCart,
  Store,
  Receipt,
  Users,
  Calculator,
  Factory,
  Phone,
  FileText,
  Database,
  BarChart2,
  Settings,
  ChevronLeft
} from "lucide-react"
import Image from "next/image"

interface MenuItem {
  title: string
  path?: string
  icon: React.ReactNode
  submenu?: MenuItem[]
}

const menuItems: MenuItem[] = [
  {
    title: "STPL",
    icon: <LayoutDashboard size={20} />,
    path: "/dashboard"
  },
  {
    title: "Jute",
    icon: <Box size={20} />,
    submenu: [
      { title: "Overview", path: "/dashboard/jute", icon: <ChevronRight size={16} /> },
      { title: "Reports", path: "/dashboard/jute/reports", icon: <ChevronRight size={16} /> }
    ]
  },
  {
    title: "Widgets",
    icon: <Grid size={20} />,
    path: "/dashboard/widgets"
  },
  {
    title: "Purchase",
    icon: <ShoppingCart size={20} />,
    path: "/dashboard/purchase"
  },
  {
    title: "Store",
    icon: <Store size={20} />,
    path: "/dashboard/store"
  },
  {
    title: "Sales",
    icon: <Receipt size={20} />,
    path: "/dashboard/sales"
  },
  {
    title: "HR Management",
    icon: <Users size={20} />,
    path: "/dashboard/hr"
  },
  {
    title: "Accounting",
    icon: <Calculator size={20} />,
    path: "/dashboard/accounting"
  },
  {
    title: "Jute Production",
    icon: <Factory size={20} />,
    path: "/dashboard/production"
  },
  {
    title: "Call Management",
    icon: <Phone size={20} />,
    path: "/dashboard/calls"
  },
  {
    title: "Projects",
    icon: <FileText size={20} />,
    path: "/dashboard/projects"
  },
  {
    title: "Master",
    icon: <Database size={20} />,
    path: "/dashboard/master"
  },
  {
    title: "Reports",
    icon: <BarChart2 size={20} />,
    path: "/dashboard/reports"
  },
  {
    title: "Settings",
    icon: <Settings size={20} />,
    path: "/dashboard/settings"
  }
]

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const [openMenus, setOpenMenus] = useState<string[]>([])
  const pathname = usePathname()

  const toggleSubmenu = (title: string) => {
    setOpenMenus(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const isActive = pathname === item.path
    const hasSubmenu = item.submenu && item.submenu.length > 0
    const isOpen = openMenus.includes(item.title)

    return (
      <div key={item.title}>
        <Link
          href={item.path || "#"}
          className={cn(
            "flex items-center px-4 py-2 text-sm text-white hover:bg-[#005580] transition-colors",
            isActive && "bg-[#005580]",
            level > 0 && "pl-8"
          )}
          onClick={(e) => {
            if (hasSubmenu) {
              e.preventDefault()
              toggleSubmenu(item.title)
            }
          }}
        >
          <span className="mr-3">{item.icon}</span>
          {!isCollapsed && (
            <>
              <span className="flex-1">{item.title}</span>
              {hasSubmenu && (
                <ChevronDown
                  size={16}
                  className={cn(
                    "transition-transform",
                    isOpen && "transform rotate-180"
                  )}
                />
              )}
            </>
          )}
        </Link>
        {hasSubmenu && isOpen && !isCollapsed && (
          <div className="ml-4 border-l border-[#005580]">
            {item.submenu?.map(subItem => renderMenuItem(subItem, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div 
      className={cn(
        "bg-[#006699] text-white transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-[#005580]">
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="VOW Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          {!isCollapsed && (
            <div className="ml-3">
              <h1 className="text-xl font-bold">VOW</h1>
              <p className="text-xs text-gray-300">...it's that simple</p>
            </div>
          )}
        </div>
        <button 
          onClick={onToggle}
          className="p-1 rounded-full hover:bg-[#005580] transition-colors"
        >
          <ChevronLeft
            size={20}
            className={cn(
              "transition-transform",
              isCollapsed && "transform rotate-180"
            )}
          />
        </button>
      </div>

      <nav className="mt-4">
        {menuItems.map(item => renderMenuItem(item))}
      </nav>

      <div className="absolute bottom-0 w-full p-4 text-xs text-center text-gray-300 border-t border-[#005580]">
        {!isCollapsed && (
          <p>Copyright © 2024 sls.vowerp.com</p>
        )}
      </div>
    </div>
  )
}