import 'server-only'
import { i18n, type Locale } from './i18n-config'

// We enumerate all dictionaries here for better type safety and to ensure they are bundled
const dictionaries = {
    en: () => import('./dictionaries/en.json').then((module) => module.default),
    ru: () => import('./dictionaries/ru.json').then((module) => module.default),
    ja: () => import('./dictionaries/ja.json').then((module) => module.default),
    fr: () => import('./dictionaries/fr.json').then((module) => module.default),
    pt: () => import('./dictionaries/pt.json').then((module) => module.default),
    'zh-CN': () => import('./dictionaries/zh-CN.json').then((module) => module.default),
}

export type Dictionary = Awaited<ReturnType<typeof dictionaries['en']>>

function deepMerge<T extends Record<string, any>>(base: T, override: Partial<T>): T {
    const result: Record<string, any> = Array.isArray(base) ? [...base] : { ...base }

    for (const key of Object.keys(override)) {
        const overrideValue = (override as Record<string, any>)[key]
        const baseValue = (base as Record<string, any>)[key]

        if (
            overrideValue &&
            baseValue &&
            typeof overrideValue === 'object' &&
            typeof baseValue === 'object' &&
            !Array.isArray(overrideValue)
        ) {
            result[key] = deepMerge(baseValue, overrideValue)
        } else {
            result[key] = overrideValue
        }
    }

    return result as T
}

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
    const defaultDictionary = await dictionaries[i18n.defaultLocale]()

    if (locale === i18n.defaultLocale) {
        return defaultDictionary
    }

    const localeDictionary = await (dictionaries[locale]?.() ?? dictionaries.en())
    return deepMerge(defaultDictionary, localeDictionary as Partial<Dictionary>)
}
