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
            [key: string]: string
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
        { key: 'all', label: texts.all, value: 'all' },
        { key: 'business', label: texts.business, value: CATEGORY_VALUES_ZH.business },
        { key: 'gaming', label: texts.gaming, value: CATEGORY_VALUES_ZH.gaming },
        { key: 'mini', label: texts.mini, value: CATEGORY_VALUES_ZH.mini },
    ]

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                <h2 className="text-3xl font-bold text-gray-900">
                    {texts.allProducts}
                </h2>
                
                {/* Category Tabs */}
                <div className="border-b border-gray-200">
                    <div className="flex space-x-8 overflow-x-auto pb-px scrollbar-none">
                        {categories.map(item => (
                            <button
                                key={item.key}
                                onClick={() => setSelectedCategory(item.value)}
                                className={`pb-3 text-sm font-medium transition-all whitespace-nowrap border-b-2 ${
                                    selectedCategory === item.value
                                        ? 'border-blue-600 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
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
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            )}
        </>
    )
}
