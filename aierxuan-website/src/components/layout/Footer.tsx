import Link from 'next/link'
import type { LanguageCode } from '@/types'

interface FooterProps {
  lang: LanguageCode
  dictionary: {
    company: {
      title: string
      description: string
    }
    links: {
      products: {
        title: string
        items: { name: string; href: string }[]
      }
      company: {
        title: string
        items: { name: string; href: string }[]
      }
      support: {
        title: string
        items: { name: string; href: string }[]
      }
    }
    contact: {
      title: string
      email: string
      phone: string
      address: string
    }
    copyright: string
  }
}

export function Footer({ lang, dictionary }: FooterProps) {
  const content = dictionary
  const localizedHref = (href: string) => {
    if (!href.startsWith('/') || href.startsWith(`/${lang}`)) {
      return href
    }
    return `/${lang}${href}`
  }

  return (
    <footer className="relative overflow-hidden bg-[#060910] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-600/20 blur-[130px]" />
        <div className="absolute right-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <span className="text-2xl font-black italic tracking-tight text-white drop-shadow-[0_0_12px_rgba(37,99,235,0.45)]">
                {content.company.title}
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-6 mb-6">
              {content.company.description}
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/aierxuan" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              {/* Telegram - 仅俄语显示 */}
              {lang === 'ru' && (
                <a
                  href="https://t.me/aierxuan_russia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-[#0088cc] transition-colors"
                >
                  <span className="sr-only">Telegram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Products Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {content.links.products.title}
            </h3>
            <ul className="space-y-3">
              {content.links.products.items.map((item) => (
                <li key={item.name}>
                  <Link href={localizedHref(item.href)} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {content.links.company.title}
            </h3>
            <ul className="space-y-3">
              {content.links.company.items.map((item) => (
                <li key={item.name}>
                  <Link href={localizedHref(item.href)} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {content.contact.title}
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-slate-400 text-sm">{content.contact.email}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">{content.contact.phone}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">{content.contact.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-slate-500 text-sm text-center">
            {content.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
