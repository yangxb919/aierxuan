import { i18n } from '@/i18n-config'

// Matches locale prefixes like "/en" or "/zh-CN" so they can be stripped from asset paths
const localePrefixRegex = new RegExp(
  `^/(?:${i18n.locales
    .map((locale) => locale.replace(/[-/\\^$*+?.()|[\\]{}]/g, '\\$&'))
    .join('|')})(?=/|$)`,
  'i'
)

/**
 * Normalizes asset URLs so they always point to the site root and never inherit locale prefixes.
 * - Keeps full http/https URLs untouched
 * - Ensures a single leading slash for relative paths
 * - Strips any locale prefix (e.g. /en/uploads -> /uploads)
 */
export function normalizeAssetUrl(path?: string | null, fallback = '/placeholder-product.svg'): string {
  if (!path) return fallback

  const trimmed = path.trim()

  // Keep external URLs as-is
  if (/^https?:\/\//i.test(trimmed)) return trimmed

  // Ensure leading slash
  let normalized = trimmed.startsWith('/') ? trimmed : `/${trimmed}`

  // Remove locale prefix if present
  normalized = normalized.replace(localePrefixRegex, '/')

  // Collapse duplicate slashes while keeping the leading one
  normalized = normalized.replace(/\/+/, '/').replace(/\/{2,}/g, '/')

  return normalized
}
