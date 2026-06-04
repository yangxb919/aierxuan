import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { i18n } from './i18n-config'
import { updateSupabaseSession } from '@/lib/supabase-middleware'
import { toCanonicalWwwUrl } from '@/lib/technical-seo'

function getLocale(request: NextRequest): string {
    try {
        const negotiatorHeaders: Record<string, string> = {}
        request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

        let languages = new Negotiator({ headers: negotiatorHeaders }).languages()

        // Filter out invalid locales (like '*') that cause matchLocale to fail
        languages = languages.filter((lang: string) => {
            // Only allow valid locale patterns (e.g., 'en', 'en-US')
            return /^[a-zA-Z]{2,3}(-[a-zA-Z]{2,4})?$/.test(lang)
        })

        // If no valid languages found, return default
        if (languages.length === 0) {
            return i18n.defaultLocale
        }

        return matchLocale(languages, i18n.locales, i18n.defaultLocale)
    } catch {
        // If any error occurs, return default locale
        return i18n.defaultLocale
    }
}

export async function proxy(request: NextRequest) {
    const hostname = request.headers.get('host') || ''

    // SEO: Redirect non-www to www (canonical domain) with 301
    if (
        hostname === 'aierxuanlaptop.com' &&
        process.env.NODE_ENV === 'production'
    ) {
        const url = toCanonicalWwwUrl(request.nextUrl)
        return NextResponse.redirect(url, 301)
    }

    const pathname = request.nextUrl.pathname

    if (pathname === '/zh-CN' || pathname.startsWith('/zh-CN/')) {
        const url = request.nextUrl.clone()
        url.pathname = `/en${pathname.slice('/zh-CN'.length)}`
        return NextResponse.redirect(url, 301)
    }

    const isAdminRoute = pathname === '/admin' || pathname.startsWith('/admin/')

    if (isAdminRoute) {
        const { response, user } = await updateSupabaseSession(request)
        const isLoginRoute = pathname === '/admin/login'

        if (!user && !isLoginRoute) {
            const url = request.nextUrl.clone()
            url.pathname = '/admin/login'
            url.searchParams.set('next', pathname)
            return NextResponse.redirect(url)
        }

        if (user && isLoginRoute) {
            return NextResponse.redirect(new URL('/admin', request.url))
        }

        return response
    }

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
            const requestHeaders = new Headers(request.headers)
            requestHeaders.set('x-locale', locale)
            return NextResponse.rewrite(newUrl, { request: { headers: requestHeaders } })
        }

        // For all other paths, redirect as before
        return NextResponse.redirect(newUrl)
    }

    // Public localized page: forward the active locale to the server render via
    // a request header so the root layout can emit the correct SSR <html lang>.
    // This only sets a REQUEST header (no Set-Cookie / private response header),
    // so CDN cache keys stay clean.
    const currentLocale = i18n.locales.find(
        (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)
    )
    if (currentLocale) {
        const requestHeaders = new Headers(request.headers)
        requestHeaders.set('x-locale', currentLocale)
        return NextResponse.next({ request: { headers: requestHeaders } })
    }

    return
}

export const config = {
    // Matcher ignoring `/_next/`, `/api/`, static files, sitemap, robots, etc.
    matcher: ['/((?!api|_next/static|_next/image|images|uploads|favicon.ico|icon.svg|apple-touch-icon.png|sitemap.xml|robots.txt|llms.txt|yandex_[^/]+\\.html|google[^/]+\\.html).*)'],
}
