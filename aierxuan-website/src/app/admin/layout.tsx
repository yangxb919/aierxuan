export const metadata = {
  title: 'AIERXUAN Admin - Industrial Automation Management',
  description: 'Admin panel for managing AIERXUAN industrial automation website content and RFQ requests.',
  robots: 'noindex, nofollow', // Prevent search engines from indexing admin pages
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  )
}
