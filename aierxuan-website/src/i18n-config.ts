export const i18n = {
    defaultLocale: 'en',
    locales: ['en', 'ru', 'ja', 'fr', 'pt', 'zh-CN'],
} as const

export type Locale = (typeof i18n)['locales'][number]
