"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart, Settings, LogOut, Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Products", path: "/admin/products", icon: Package },
    { name: "Orders", path: "/admin/orders", icon: ShoppingCart },
    { name: "Customers", path: "/admin/customers", icon: Users },
    { name: "Analytics", path: "/admin/analytics", icon: BarChart },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ]

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <div className="flex flex-col h-full bg-white">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Cheapware Admin</h2>
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <nav className="flex-1 p-4">
                <ul className="space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <li key={item.path}>
                        <Link
                          href={item.path}
                          className={`flex items-center p-2 rounded-md ${
                            pathname === item.path
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Icon className="h-5 w-5 mr-3" />
                          {item.name}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </nav>
              <div className="p-4 border-t">
                <Link
                  href="/"
                  className="flex items-center p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Back to Store
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center justify-center flex-shrink-0 px-4 mb-5">
            <h1 className="text-xl font-bold">Cheapware Admin</h1>
          </div>
          <nav className="mt-5 flex-1 px-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    pathname === item.path
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t p-4">
          <Link
            href="/"
            className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Back to Store
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        <main className="flex-1 pb-8">{children}</main>
      </div>
    </div>
  )
}

  
