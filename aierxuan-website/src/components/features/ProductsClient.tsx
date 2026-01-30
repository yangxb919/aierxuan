'use client'

import { useState, useEffect } from 'react'
import { ProductGrid } from './ProductGrid'
import { slugToDbValue, CATEGORY_VALUES_ZH } from '@/lib/categories'
import type { LanguageCode } from '@/types'

interface ProductsClientProps {
    lang: LanguageCode
    dictionary: {
        page: {
            allProducts: string
            categories: string
            all: string
            business: string
            gaming: string
            mini: string
            [key: string]: string | { [key: string]: string }
        }
        grid: any
        advantages: any
    }
    initialCategory?: string
}

export function ProductsClient({ lang, dictionary, initialCategory }: ProductsClientProps) {
    const texts = dictionary.page
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [isInitialized, setIsInitialized] = useState(false)

    useEffect(() => {
        if (initialCategory) {
            const dbValue = slugToDbValue(initialCategory)
            setSelectedCategory(dbValue || initialCategory)
        } else {
            setSelectedCategory('all')
        }
        setIsInitialized(true)
    }, [initialCategory])

    const categories = [
        { key: 'all', label: texts.all, value: 'all', icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
        )},
        { key: 'business', label: texts.business, value: CATEGORY_VALUES_ZH.business, icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        )},
        { key: 'gaming', label: texts.gaming, value: CATEGORY_VALUES_ZH.gaming, icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
        )},
        { key: 'mini', label: texts.mini, value: CATEGORY_VALUES_ZH.mini, icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
        )},
    ]

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                        {texts.allProducts}
                    </h2>
                    <p className="text-gray-400">
                        {texts.categories}
                    </p>
                </div>

                {/* Category Tabs - Dark Theme */}
                <div className="flex flex-wrap gap-3">
                    {categories.map(item => (
                        <button
                            key={item.key}
                            onClick={() => setSelectedCategory(item.value)}
                            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                                selectedCategory === item.value
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                                    : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20'
                            }`}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>

            {isInitialized ? (
                <ProductGrid
                    featured={false}
                    category={selectedCategory === 'all' ? undefined : selectedCategory}
                    lang={lang}
                    dictionary={dictionary}
                />
            ) : (
                <div className="flex justify-center items-center py-12">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-full border-2 border-blue-600/20 border-t-blue-600 animate-spin" />
                        <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-violet-600/20 border-b-violet-600 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                    </div>
                </div>
            )}
        </>
    )
}
