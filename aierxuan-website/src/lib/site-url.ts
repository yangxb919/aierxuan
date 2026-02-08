const fallback = 'https://www.aierxuanlaptop.com'
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || fallback).replace(/\/+$/, '')
