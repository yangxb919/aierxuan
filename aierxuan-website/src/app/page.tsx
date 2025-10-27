'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { ProductGrid } from '@/components/features/ProductGrid'
import { ProductCategories } from '@/components/features/ProductCategories'
import { HeroSection } from '@/components/features/HeroSection'
import { CoreAdvantages } from '@/components/features/CoreAdvantages'
import { TrustBadges } from '@/components/features/TrustBadges'
import { IndustrySolutions } from '@/components/features/IndustrySolutions'
import { CaseStudies } from '@/components/features/CaseStudies'
import { TechnicalCapabilities } from '@/components/features/TechnicalCapabilities'
import { LatestNews } from '@/components/features/LatestNews'
import { FAQSection } from '@/components/features/FAQSection'
import { FinalCTA } from '@/components/features/FinalCTA'
import { Button } from '@/components/ui'
import { useLanguage } from '@/store/useAppStore'

// Page content translations
const pageContent = {
  en: {
    featuredProducts: {
      title: 'Featured Products',
      subtitle: 'Discover our latest industrial automation solutions',
      viewAll: 'View All Products'
    },
    about: {
      title: 'About AIERXUAN',
      description: 'Leading provider of industrial automation solutions, specializing in high-quality equipment and innovative technologies for modern manufacturing.',
      learnMore: 'Learn More About Us',
      imagePlaceholder: 'Company Image Placeholder'
    }
  },
  ru: {
    featuredProducts: {
      title: 'Рекомендуемые продукты',
      subtitle: 'Откройте для себя наши новейшие решения промышленной автоматизации',
      viewAll: 'Посмотреть все продукты'
    },
    about: {
      title: 'О компании AIERXUAN',
      description: 'Ведущий поставщик решений промышленной автоматизации, специализирующийся на высококачественном оборудовании и инновационных технологиях для современного производства.',
      learnMore: 'Узнать больше о нас',
      imagePlaceholder: 'Изображение компании'
    }
  },
  ja: {
    featuredProducts: {
      title: '注目の製品',
      subtitle: '最新の産業オートメーションソリューションをご覧ください',
      viewAll: 'すべての製品を見る'
    },
    about: {
      title: 'AIERXUANについて',
      description: '現代の製造業向けの高品質機器と革新的技術を専門とする産業オートメーションソリューションの主要プロバイダー。',
      learnMore: '詳細を見る',
      imagePlaceholder: '会社画像'
    }
  },
  fr: {
    featuredProducts: {
      title: 'Produits en vedette',
      subtitle: 'Découvrez nos dernières solutions d\'automatisation industrielle',
      viewAll: 'Voir tous les produits'
    },
    about: {
      title: 'À propos d\'AIERXUAN',
      description: 'Fournisseur leader de solutions d\'automatisation industrielle, spécialisé dans les équipements de haute qualité et les technologies innovantes pour la fabrication moderne.',
      learnMore: 'En savoir plus sur nous',
      imagePlaceholder: 'Image de l\'entreprise'
    }
  },
  pt: {
    featuredProducts: {
      title: 'Produtos em Destaque',
      subtitle: 'Descubra nossas mais recentes soluções de automação industrial',
      viewAll: 'Ver Todos os Produtos'
    },
    about: {
      title: 'Sobre a AIERXUAN',
      description: 'Fornecedor líder de soluções de automação industrial, especializado em equipamentos de alta qualidade e tecnologias inovadoras para fabricação moderna.',
      learnMore: 'Saiba Mais Sobre Nós',
      imagePlaceholder: 'Imagem da Empresa'
    }
  },
  'zh-CN': {
    featuredProducts: {
      title: '精选产品',
      subtitle: '探索我们最新的工业自动化解决方案',
      viewAll: '查看所有产品'
    },
    about: {
      title: '关于AIERXUAN',
      description: '工业自动化解决方案的领先供应商，专注于为现代制造业提供高品质设备和创新技术。',
      learnMore: '了解更多关于我们',
      imagePlaceholder: '公司图片'
    }
  }
}

export default function Home() {
  const language = useLanguage()
  const content = pageContent[language] || pageContent.en // Fallback to English

  return (
    <div className="min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Industry Switcher - removed per request */}

      {/* 3. Product Categories Section - NEW */}
      <ProductCategories />

      {/* 4. Core Advantages - NEW */}
      <CoreAdvantages />

      {/* 5. Trust Badges (Clients & Certifications) - NEW */}
      <TrustBadges />

      {/* 6. Industry Solutions - NEW */}
      <IndustrySolutions />

      {/* 7. Case Studies - NEW */}
      <CaseStudies />

      {/* 8. Technical Capabilities - NEW */}
      <TechnicalCapabilities />

      {/* 9. Latest News - NEW */}
      <LatestNews />

      {/* 10. FAQ Section */}
      <FAQSection />

      {/* 11. Final CTA / RFQ Form - NEW */}
      <FinalCTA />
    </div>
  )
}

// Loading skeleton component
function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
          <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
          <div className="bg-gray-200 h-4 rounded mb-2"></div>
          <div className="bg-gray-200 h-4 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  )
}
