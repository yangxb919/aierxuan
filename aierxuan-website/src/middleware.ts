import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from './i18n-config'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

function getLocale(request: NextRequest): string {
    try {
        const negotiatorHeaders: Record<string, string> = {}
        request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

        let languages = new Negotiator({ headers: negotiatorHeaders }).languages()

        // Filter out invalid locales (like '*') that cause matchLocale to fail
        languages = languages.filter((lang: string) => {
            // Only allow valid locale patterns (e.g., 'en', 'en-US', 'zh-CN')
            return /^[a-zA-Z]{2,3}(-[a-zA-Z]{2,4})?$/.test(lang)
        })

        // If no valid languages found, return default
        if (languages.length === 0) {
            return i18n.defaultLocale
        }

        return matchLocale(languages, i18n.locales, i18n.defaultLocale)
    } catch (error) {
        // If any error occurs, return default locale
        return i18n.defaultLocale
    }
}

export function middleware(request: NextRequest) {
    const hostname = request.headers.get('host') || ''

    // SEO: Redirect non-www to www (canonical domain) with 301
    if (
        hostname === 'aierxuanlaptop.com' &&
        process.env.NODE_ENV === 'production'
    ) {
        const url = request.nextUrl.clone()
        url.host = 'www.aierxuanlaptop.com'
        return NextResponse.redirect(url, 301)
    }

    const pathname = request.nextUrl.pathname

    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request)

        const newUrl = new URL(
            `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
            request.url
        )

        // Use rewrite for root path "/" so search engine verification bots
        // see a 200 response (not a 307 redirect) with meta tags intact
        if (pathname === '/') {
            const response = NextResponse.rewrite(newUrl)
            response.cookies.set('site_lang', locale, { path: '/' })
            return response
        }

        // For all other paths, redirect as before
        const response = NextResponse.redirect(newUrl)
        // Set site_lang cookie for SSR html lang
        response.cookies.set('site_lang', locale, { path: '/' })
        return response
    }

    // Extract locale from pathname and set cookie
    const localeMatch = pathname.match(/^\/([a-zA-Z-]+)/)
    if (localeMatch) {
        const locale = localeMatch[1]
        if (i18n.locales.includes(locale as typeof i18n.locales[number])) {
            const response = NextResponse.next()
            response.cookies.set('site_lang', locale, { path: '/' })
            return response
        }
    }
}

export const config = {
    // Matcher ignoring `/_next/`, `/api/`, `/admin`, static files, sitemap, robots, etc.
    matcher: ['/((?!api|admin|_next/static|_next/image|images|uploads|favicon.ico|icon.svg|apple-touch-icon.png|sitemap.xml|robots.txt|yandex_[^/]+\\.html).*)'],
}
