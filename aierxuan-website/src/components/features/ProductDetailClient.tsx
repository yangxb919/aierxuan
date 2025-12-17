'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Button } from '@/components/ui'
import { getTranslation } from '@/lib/utils'
import { normalizeAssetUrl } from '@/lib/assetUtils'
import { getCategoryLabel } from '@/lib/categories'
import type { ProductWithTranslations, LanguageCode } from '@/types'
import {
  ChevronRight,
  Home,
  Cpu,
  HardDrive,
  Zap,
  Monitor,
  ShieldCheck,
  Factory,
  Award,
  Truck,
  Download,
  Mail,
  CheckCircle2,
  Thermometer,
  ArrowDownToLine,
  Box,
  Settings,
  MessageSquare,
  FileText
} from 'lucide-react'

// ... (rest of imports and types)

// Custom Markdown Components for "Industrial Minimalist" look
const MarkdownComponents: Components = {
  h1: ({ children }) => <h1 className="text-3xl font-extrabold text-gray-900 mt-12 mb-6 tracking-tight border-b border-gray-100 pb-4">{children}</h1>,
  h2: ({ children }) => (
    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6 flex items-center">
      <span className="w-2 h-8 bg-blue-900 mr-4 rounded-sm"></span>
      {children}
    </h2>
  ),
  h3: ({ children }) => <h3 className="text-lg font-bold text-blue-900 mt-10 mb-4 uppercase tracking-wider flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>{children}</h3>,
  h4: ({ children }) => <h4 className="text-base font-bold text-gray-900 mt-6 mb-3">{children}</h4>,
  p: ({ children }) => <p className="text-gray-600 leading-relaxed mb-6 text-base">{children}</p>,
  ul: ({ children }) => <ul className="space-y-3 mb-8 ml-1">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal list-inside space-y-3 mb-8 text-gray-600 ml-4">{children}</ol>,
  li: ({ children }) => (
    <li className="flex items-start text-gray-700 leading-relaxed group">
      <CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity" />
      <span className="flex-1">{children}</span>
    </li>
  ),
  strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-blue-900/20 pl-6 italic text-gray-500 my-8 py-2 bg-gray-50/50 rounded-r-lg">
      {children}
    </blockquote>
  ),
  code: ({ children, className }) => {
     const isInline = !className
     if (isInline) {
         return <code className="bg-gray-100 text-blue-800 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
     }
     return <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono my-6">{children}</code>
  },
  hr: () => <hr className="border-t border-gray-100 my-10" />,
  table: ({ children }) => <div className="overflow-x-auto my-8 border border-gray-200 rounded-lg"><table className="w-full text-left text-sm">{children}</table></div>,
  thead: ({ children }) => <thead className="bg-gray-50 text-gray-900 font-semibold border-b border-gray-200">{children}</thead>,
  tr: ({ children }) => <tr className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">{children}</tr>,
  th: ({ children }) => <th className="px-6 py-3">{children}</th>,
  td: ({ children }) => <td className="px-6 py-3 text-gray-600">{children}</td>,
}

type QualityTest = {
  title: string
  value: string
  unit?: string
  status?: string
  icon?: string
}

type OemService = {
  title: string
  description: string
  icon?: string
}

type FaqItem = {
  question: string
  answer: string
}

const iconMap = {
  shield: ShieldCheck,
  factory: Factory,
  award: Award,
  truck: Truck,
  download: Download,
  mail: Mail,
  thermometer: Thermometer,
  arrow: ArrowDownToLine,
  box: Box,
  settings: Settings,
  monitor: Monitor,
  cpu: Cpu,
  zap: Zap,
  harddrive: HardDrive,
  message: MessageSquare
} as const

const getIconComponent = (name?: string, fallback = ShieldCheck) => {
  if (!name) return fallback
  const key = name.toLowerCase().trim() as keyof typeof iconMap
  return iconMap[key] || fallback
}

interface ProductDetailClientProps {
    product: ProductWithTranslations
    lang: LanguageCode
    dictionary: {
        specifications: string
        requestQuote: string
        contactForPrice: string
        category: string
        sku: string
        status: string
        active: string
        inactive: string
        backToProducts: string
        productNotFound: string
        loadingError: string
        tryAgain: string
        productImages: string
        noDescription: string
        features: string
        overview: string
        moq: string
        price: string
        units: string
        pricePerUnit: string
        startingFrom: string
        [key: string]: string
    }
}

export function ProductDetailClient({ product, lang, dictionary }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const texts = dictionary

  const translation = getTranslation(product, lang)
  const productTitle = translation?.title || translation?.name || product.slug
  const rawImages = (product.images as string[] | null) || []
  // Normalize all image paths so locale prefixes are stripped
  const images = rawImages.map(img => normalizeAssetUrl(img))
  const primaryImage = images[0] || '/placeholder-product.svg'

  // Handle key_specs as either array or object format
  const rawKeySpecs = (translation?.specifications || (translation as any)?.key_specs)
  const keySpecs: Array<{ label: string; value: string }> = Array.isArray(rawKeySpecs)
    ? rawKeySpecs
    : (rawKeySpecs && typeof rawKeySpecs === 'object')
      ? Object.entries(rawKeySpecs).map(([label, value]) => ({ label, value: String(value) }))
      : []

  const parseArray = <T,>(value: any): T[] => (Array.isArray(value) ? value : [])
  const rawQualityTests = parseArray<QualityTest>((translation as any)?.quality_tests)
  const galleryMetaEntry = (translation as any)?.quality_tests?.find
    ? (translation as any).quality_tests.find((item: any) => item && item.__gallery_meta)
    : null
  const qualityTests = rawQualityTests.filter((item: any) => !(item && (item as any).__gallery_meta))
  const oemServices = parseArray<OemService>((translation as any)?.oem_services)
  const faqs = parseArray<FaqItem>((translation as any)?.faqs)
  const extractGalleryImages = (source: any, key: 'durability_images' | 'oem_images') => {
    let result: string[] = []
    if (Array.isArray(source?.[key])) result = source[key].filter(Boolean)
    else {
      const features = source?.features
      if (features && typeof features === 'object' && !Array.isArray(features)) {
        const fromFeatures = (features as any)[key]
        if (Array.isArray(fromFeatures)) result = fromFeatures.filter(Boolean)
      }
      if (result.length === 0 && galleryMetaEntry && Array.isArray((galleryMetaEntry as any)[key])) {
        result = (galleryMetaEntry as any)[key].filter(Boolean)
      }
    }
    // Ensure all paths are absolute
    return result.map(img => normalizeAssetUrl(img))
  }
  const durabilityImages = extractGalleryImages(translation, 'durability_images')
  const oemImages = extractGalleryImages(translation, 'oem_images')

  const defaultQualityTests: QualityTest[] = [
    { title: 'Hinge Durability', value: '20,000+', unit: 'Cycles', icon: 'arrow', status: 'passed' },
    { title: 'Drop Test', value: '70', unit: 'Centimeters', icon: 'shield', status: 'passed' },
    { title: 'Thermal Stress', value: '72', unit: 'Hours Run-in', icon: 'thermometer', status: 'passed' }
  ]

  const defaultOemServices: OemService[] = [
    { title: 'Laser Engraving', description: 'Add your logo to the chassis with precision.', icon: 'settings' },
    { title: 'Boot Logo', description: 'Custom BIOS splash screen on startup.', icon: 'monitor' },
    { title: 'Custom Packaging', description: 'Retail-ready boxes designed for your market.', icon: 'box' }
  ]

  const defaultFaqs: FaqItem[] = [
    {
      question: 'What is the standard lead time for wholesale orders?',
      answer: 'For in-stock standard models, shipment is within 3-5 days. For custom OEM orders, lead time is typically 15-25 days depending on quantity and customization requirements.'
    },
    {
      question: 'Do you offer sample units for testing?',
      answer: 'Yes, we encourage ordering a sample unit for quality verification. Sample costs are refundable upon placing a bulk order (MOQ 100+).'
    },
    {
      question: 'What is your warranty policy?',
      answer: 'We provide a standard 12-month warranty for all hardware. Extended warranty options (up to 3 years) and spare parts kits (1-2%) are available for bulk orders.'
    },
    {
      question: 'Can you handle shipping and customs clearance?',
      answer: 'We work with major logistics partners (DHL, FedEx, UPS) and freight forwarders to offer DDP services to select countries, handling customs for you.'
    }
  ]

  const durabilityDisplay = (durabilityImages.length ? durabilityImages : images).filter(Boolean)
  const oemDisplay = (oemImages.length ? oemImages : images).filter(Boolean)
  const displayQualityTests = qualityTests.length > 0 ? qualityTests : defaultQualityTests
  const displayOemServices = oemServices.length > 0 ? oemServices : defaultOemServices
  const displayFaqs = faqs.length > 0 ? faqs : defaultFaqs
  const datasheetUrl = product.datasheet_url || ''
  const priceDisplay = typeof product.price === 'number' ? product.price.toFixed(2) : null

  // Keep selected image stable; only set default when none is selected or it's no longer in the list
  useEffect(() => {
    if (images.length === 0) {
      setSelectedImage(null)
      return
    }

    setSelectedImage((prev) => {
      if (prev && images.includes(prev)) return prev
      return images[0]
    })
  }, [images])

    const getSpec = (...candidates: string[]) => {
        for (const k of candidates) {
            const spec = keySpecs.find(s => s.label === k)
            if (spec && spec.value && String(spec.value).trim() !== '') return String(spec.value)
        }
        return ''
    }

    const heroSpecs = [
        getSpec('CPU', 'Processor'),
        getSpec('Memory', 'RAM') ? `${getSpec('Memory', 'RAM')} RAM` : '',
        getSpec('Storage', 'SSD', 'Hard Drive') ? `${getSpec('Storage', 'SSD', 'Hard Drive')} Storage` : '',
        'Industrial Grade Chassis' // Placeholder if specific material not found
    ].filter(Boolean)

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans">
            {/* Breadcrumbs */}
            <div className="border-b border-gray-100 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <nav className="flex items-center text-xs text-gray-500 space-x-2">
                        <Link href={`/${lang}`} className="hover:text-blue-900 transition-colors">
                            <Home className="w-3.5 h-3.5" />
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                        <Link href={`/${lang}/products`} className="hover:text-blue-900 transition-colors">
                            Products
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                        <span className="text-gray-900 font-semibold truncate max-w-[200px]">
                            {productTitle}
                        </span>
                    </nav>
                </div>
            </div>

            {/* SECTION 1: B2B Hero (Above Fold) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start">
                    {/* Left Column: Visuals */}
                    <div className="space-y-6 lg:sticky lg:top-24 self-start">
                        {/* Main Image Stage */}
                        <div className="aspect-[4/3] lg:aspect-square bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-xl relative group ring-1 ring-gray-100">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <Image
                                src={selectedImage || primaryImage}
                                alt={productTitle}
                                fill
                                className="object-contain p-6 transition-transform duration-700 group-hover:scale-105 ease-out"
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            
                            {/* Industrial Design Accents - Corner Markers */}
                            <div className="absolute top-5 left-5 w-3 h-3 border-t-2 border-l-2 border-gray-300/50 group-hover:border-blue-900/30 transition-colors rounded-tl-sm" />
                            <div className="absolute top-5 right-5 w-3 h-3 border-t-2 border-r-2 border-gray-300/50 group-hover:border-blue-900/30 transition-colors rounded-tr-sm" />
                            <div className="absolute bottom-5 left-5 w-3 h-3 border-b-2 border-l-2 border-gray-300/50 group-hover:border-blue-900/30 transition-colors rounded-bl-sm" />
                            <div className="absolute bottom-5 right-5 w-3 h-3 border-b-2 border-r-2 border-gray-300/50 group-hover:border-blue-900/30 transition-colors rounded-br-sm" />

                            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-[10px] uppercase tracking-widest font-bold text-gray-400 px-2 py-1 rounded border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm translate-y-2 group-hover:translate-y-0 duration-300">
                                Zoom View
                            </div>
                        </div>

                        {/* Thumbnails Navigation */}
                        {images && images.length > 1 && (
                            <div className="grid grid-cols-5 gap-3">
                                {images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(image)}
                                        className={`relative aspect-square rounded-xl overflow-hidden border transition-all duration-300 ${
                                            selectedImage === image 
                                                ? 'border-blue-900 ring-2 ring-blue-900/10 shadow-lg scale-100 opacity-100' 
                                                : 'border-gray-100 hover:border-gray-300 opacity-70 hover:opacity-100 hover:scale-105'
                                        }`}
                                    >
                                        <Image
                                            src={image}
                                            alt={`View perspective ${index + 1}`}
                                            fill
                                            className="object-cover bg-white"
                                            sizes="100px"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Decision Logic */}
                    <div className="flex flex-col pt-2">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold bg-blue-900 text-white tracking-wide uppercase">
                                New Arrival
                            </span>
                            <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                                SKU: {product.slug}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
                            {productTitle}
                        </h1>

                        {/* Industrial Specs Summary */}
                        <div className="mb-8">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Key Industrial Specs</h3>
                            <ul className="space-y-2">
                                {heroSpecs.map((spec, i) => (
                                    <li key={i} className="flex items-center text-gray-700">
                                        <CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                                        <span className="font-medium">{spec}</span>
                                    </li>
                                ))}
                                {heroSpecs.length === 0 && <li className="text-gray-500 italic">Detailed specs available below</li>}
                            </ul>
                        </div>

                        {/* Action Area */}
                        <div className="mt-auto space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-100">
                            <div className="space-y-2 text-center">
                                {priceDisplay ? (
                                    <p className="text-sm text-gray-700">
                                        {texts.startingFrom}{' '}
                                        <span className="text-2xl font-extrabold text-blue-900">
                                            ${priceDisplay}
                                        </span>{' '}
                                        {texts.units ? `/${texts.units}` : ''}
                                    </p>
                                ) : (
                                    <p className="text-sm text-gray-500">{texts.contactForPrice}</p>
                                )}
                                <p className="text-xs text-gray-500">
                                    {texts.moq}: {product.moq ? `${product.moq} ${texts.units || 'units'}` : 'Negotiable'}
                                </p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Link href={`/${lang}/contact?product=${encodeURIComponent(productTitle)}`} className="w-full">
                                    <Button size="lg" className="w-full bg-blue-900 hover:bg-blue-800 text-white h-14 text-lg font-bold shadow-md rounded-md transition-all">
                                        <Mail className="w-5 h-5 mr-2" />
                                        {texts.requestQuote || "Inquire for Wholesale Price"}
                                    </Button>
                                </Link>
                                {datasheetUrl ? (
                                    <a
                                        href={datasheetUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center text-sm font-semibold text-blue-900 hover:text-blue-700 transition-colors py-2 rounded-md border border-transparent hover:border-blue-200"
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        Download Spec Sheet (PDF)
                                    </a>
                                ) : (
                                    <button
                                        className="flex items-center justify-center text-sm font-semibold text-gray-400 cursor-not-allowed py-2"
                                        type="button"
                                        disabled
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        Spec sheet coming soon
                                    </button>
                                )}
                            </div>
                            <p className="text-xs text-center text-gray-400">
                                Minimum Order Quantity: {product.moq ? `${product.moq} ${texts.units || 'units'}` : 'Negotiable'} • Global Shipping Available
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: Trust Anchor Bar */}
            <section className="border-y border-gray-100 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200/50">
                        {[
                            { icon: Factory, text: "Factory Direct" },
                            { icon: Award, text: "ISO Certified" },
                            { icon: ShieldCheck, text: "1-Year Warranty" },
                            { icon: Truck, text: "Fast Shipping" }
                        ].map((item, idx) => (
                            <div key={idx} className="flex flex-col md:flex-row items-center justify-center gap-3 py-6 px-4 text-center md:text-left hover:bg-white transition-colors">
                                <item.icon className="w-6 h-6 text-blue-900" />
                                <span className="font-bold text-gray-800 text-sm uppercase tracking-wide">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 3: Insight Core - Teardown */}
            <section className="py-20 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Engineered for Durability</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">Our internal architecture prioritizes thermal efficiency and component longevity.</p>
                    </div>
                    
                    <div className="relative rounded-2xl bg-gray-900 aspect-[16/9] md:aspect-[21/9] overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 grid grid-cols-12 gap-4 p-4 md:p-8">
                            <div className="col-span-12 md:col-span-8 relative rounded-xl overflow-hidden bg-gray-800/80">
                                <Image
                                    src={durabilityDisplay[0] || primaryImage}
                                    alt="Internal architecture main visual"
                                    fill
                                    className="object-cover"
                                    sizes="(min-width: 1024px) 70vw, 100vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 via-gray-900/20 to-transparent" />
                            </div>
                            <div className="col-span-12 md:col-span-4 grid grid-rows-2 gap-4">
                                {[1, 2].map((slot) => {
                                  const fallback = durabilityDisplay[slot] || durabilityDisplay[0] || primaryImage
                                  return (
                                    <div key={slot} className="relative rounded-xl overflow-hidden bg-gray-800/80">
                                        <Image
                                            src={fallback}
                                            alt={`Internal architecture detail ${slot}`}
                                            fill
                                            className="object-cover"
                                            sizes="(min-width: 1024px) 30vw, 100vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 to-transparent" />
                                    </div>
                                  )
                                })}
                            </div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                             <span className="text-gray-100 font-semibold text-xs md:text-sm tracking-[0.25em] uppercase bg-white/10 backdrop-blur px-4 py-2 rounded border border-white/10">
                                Internal Architecture Visualization
                             </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4: QA Grid (Evidence) */}
            <section className="py-20 bg-gray-50 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Quality Assurance Report</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">Every unit undergoes rigorous stress testing before shipment.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {displayQualityTests.map((test, idx) => {
                          const Icon = getIconComponent(test.icon, ArrowDownToLine)
                          const status = (test.status || 'passed').toLowerCase()
                          const statusStyles = status === 'passed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                          return (
                            <div key={idx} className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                              <div className="flex items-center justify-between mb-6">
                                <Icon className="w-8 h-8 text-blue-900" />
                                <span className={`px-2 py-1 text-xs font-bold uppercase rounded ${statusStyles}`}>
                                  {status}
                                </span>
                              </div>
                              <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">{test.title}</h3>
                              <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-extrabold text-gray-900">{test.value}</span>
                                {test.unit && <span className="text-gray-400 font-medium">{test.unit}</span>}
                              </div>
                            </div>
                          )
                        })}
                    </div>
                </div>
            </section>

            {/* SECTION 5: OEM/Customization Service */}
            <section className="py-20 bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Brand, Our Hardware</h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                We provide comprehensive OEM/ODM services to help you build your brand identity. From hardware to packaging, everything is customizable.
                            </p>
                            
                            <div className="space-y-6">
                                {displayOemServices.map((feature, idx) => {
                                    const Icon = getIconComponent(feature.icon, Settings)
                                    return (
                                    <div key={idx} className="flex gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-900">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-900">{feature.title}</h4>
                                            <p className="text-gray-500 text-sm">{feature.description}</p>
                                        </div>
                                    </div>
                                )})}
                            </div>
                        </div>
                        <div className="bg-gray-100 rounded-2xl aspect-square relative overflow-hidden border border-gray-200">
                            <div className="grid grid-cols-2 gap-3 p-4 h-full">
                                {Array.from({ length: 4 }).map((_, idx) => {
                                  const fallback = oemDisplay[idx] || oemDisplay[0] || primaryImage
                                  const hasImage = oemDisplay.length > 0
                                  return (
                                    <div key={idx} className="relative rounded-xl overflow-hidden bg-gray-200">
                                      {hasImage ? (
                                        <Image
                                          src={fallback}
                                          alt={`OEM visual ${idx + 1}`}
                                          fill
                                          className="object-cover"
                                          sizes="(min-width: 1024px) 320px, 50vw"
                                        />
                                      ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs font-semibold uppercase tracking-wide">
                                          Awaiting upload
                                        </div>
                                      )}
                                    </div>
                                  )
                                })}
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="bg-white/95 backdrop-blur px-6 py-3 rounded-full text-gray-900 font-bold shadow-lg border border-gray-200">
                                    OEM Services Available
                                </span>
                            </div>
                        </div>
                     </div>
                </div>
            </section>

            {/* SECTION 5.5: Product Description (Markdown) */}
            {(translation as any)?.long_desc || translation?.description ? (
                <section className="py-24 bg-white border-t border-gray-200" id="overview">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                         <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold uppercase tracking-widest mb-4 border border-blue-100">
                                <FileText className="w-3.5 h-3.5" />
                                Product Details
                            </div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
                                {texts.overview || 'Product Overview'}
                            </h2>
                            <div className="w-20 h-1.5 bg-blue-900 mx-auto rounded-full opacity-20"></div>
                        </div>
                        
                        <div className="bg-white">
                            <ReactMarkdown 
                                remarkPlugins={[remarkGfm]}
                                components={MarkdownComponents}
                            >
                                {(translation as any)?.long_desc || translation?.description}
                            </ReactMarkdown>
                        </div>
                    </div>
                </section>
            ) : null}

            {/* SECTION 6: Technical Specs & FAQ */}
            <section className="py-20 bg-gray-50 border-t border-gray-200">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Technical Specs */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                            <Cpu className="w-6 h-6 text-blue-900" />
                            Technical Specifications
                        </h2>
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                             <table className="w-full text-left text-sm">
                                <tbody>
                                    {keySpecs.map((spec, i) => (
                                        <tr key={i} className={`border-b border-gray-100 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                                            <td className="py-4 px-6 font-semibold text-gray-900 w-1/3 border-r border-gray-100">{spec.label}</td>
                                            <td className="py-4 px-6 text-gray-600">{spec.value}</td>
                                        </tr>
                                    ))}
                                    {keySpecs.length === 0 && (
                                        <tr>
                                            <td className="p-8 text-center text-gray-500" colSpan={2}>No detailed specifications available.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* FAQ Accordion */}
                    <div>
                         <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                            <MessageSquare className="w-6 h-6 text-blue-900" />
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-4">
                            {displayFaqs.map((faq, idx) => (
                                <div key={idx} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                    <button 
                                        onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                                        className="w-full flex items-center justify-between p-4 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                                    >
                                        {faq.question}
                                        <ChevronRight className={`w-4 h-4 transition-transform ${activeFaq === idx ? 'rotate-90' : ''}`} />
                                    </button>
                                    {activeFaq === idx && (
                                        <div className="p-4 pt-0 text-gray-600 text-sm leading-relaxed bg-gray-50 border-t border-gray-100">
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
