import type { ReactNode } from 'react'
import { Button } from '@/components/ui'
import type { AdminAuthUser } from '@/lib/admin-auth'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { cn } from '@/lib/utils'

type AdminShellProps = {
  user: AdminAuthUser
  title: string
  subtitle?: string
  searchPlaceholder?: string
  showSearch?: boolean
  showNotifications?: boolean
  headerActions?: ReactNode
  contentClassName?: string
  children: ReactNode
}

export default function AdminShell({
  user,
  title,
  subtitle,
  searchPlaceholder = 'Search...',
  showSearch = true,
  showNotifications = true,
  headerActions,
  contentClassName,
  children,
}: AdminShellProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />

      <div className="flex-1">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex justify-between items-center px-6 py-4 gap-4">
            <div className="min-w-0">
              <h1 className="text-2xl font-semibold text-gray-800 truncate">{title}</h1>
              {subtitle ? <p className="text-sm text-gray-500 mt-1">{subtitle}</p> : null}
            </div>

            <div className="flex items-center gap-3 flex-wrap justify-end">
              {headerActions ? <div className="flex items-center gap-2">{headerActions}</div> : null}

              {showSearch ? (
                <div className="relative">
                  <input
                    type="text"
                    placeholder={searchPlaceholder}
                    className="w-64 max-w-[70vw] px-4 py-2 pl-10 pr-4 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                  <svg
                    className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              ) : null}

              {showNotifications ? (
                <button
                  type="button"
                  className="relative p-2 text-gray-600 hover:text-gray-900"
                  aria-label="Notifications"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>
              ) : null}

              <div className="flex items-center gap-3">
                <div className="text-right leading-tight">
                  <p className="text-sm font-medium text-gray-900">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                  {user.firstName?.[0]}
                  {user.lastName?.[0]}
                </div>

                <form action="/api/admin/logout" method="POST" className="hidden sm:block">
                  <Button type="submit" variant="outline" size="sm">
                    Logout
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </header>

        <main className={cn('p-6', contentClassName)}>
          {children}
        </main>

        <div className="sm:hidden px-6 pb-6">
          <form action="/api/admin/logout" method="POST">
            <Button type="submit" variant="outline" size="sm" className="w-full">
              Logout
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

