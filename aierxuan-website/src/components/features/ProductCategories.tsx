'use client'

import Link from 'next/link'
import { useLanguage } from '@/store/useAppStore'
import { CATEGORY_SLUGS } from '@/lib/categories'

// Category translations
const categoryContent = {
  en: {
    title: 'Product Categories',
    subtitle: 'Explore our comprehensive range of computing solutions',
    categories: [
      {
        id: 'business',
        name: 'Business Laptop',
        slug: CATEGORY_SLUGS.business,
        description: 'Professional laptops designed for business productivity and reliability',
        icon: '💼',
        image: '/images/category-business-laptop.jpg',
        features: ['Intel Core i9', 'Long Battery Life', 'Enterprise Security'],
        color: 'blue'
      },
      {
        id: 'gaming',
        name: 'Gaming Laptop',
        slug: CATEGORY_SLUGS.gaming,
        description: 'High-performance gaming laptops with cutting-edge graphics',
        icon: '🎮',
        image: '/images/category-gaming-laptop.jpg',
        features: ['RTX Graphics', 'High Refresh Rate', 'Advanced Cooling'],
        color: 'purple'
      },
      {
        id: 'mini',
        name: 'Mini PC',
        slug: CATEGORY_SLUGS.mini,
        description: 'Compact and powerful mini PCs for space-efficient computing',
        icon: '🖥️',
        image: '/images/category-mini-pc.jpg',
        features: ['Compact Design', 'Silent Operation', 'Energy Efficient'],
        color: 'green'
      }
    ]
  },
  ru: {
    title: 'Категории продуктов',
    subtitle: 'Изучите наш полный ассортимент компьютерных решений',
    categories: [
      {
        id: 'business',
        name: 'Бизнес-ноутбук',
        slug: CATEGORY_SLUGS.business,
        description: 'Профессиональные ноутбуки для бизнеса и надежности',
        icon: '💼',
        image: '/images/category-business-laptop.jpg',
        features: ['Intel Core i9', 'Долгая работа', 'Корп. безопасность'],
        color: 'blue'
      },
      {
        id: 'gaming',
        name: 'Игровой ноутбук',
        slug: CATEGORY_SLUGS.gaming,
        description: 'Высокопроизводительные игровые ноутбуки с передовой графикой',
        icon: '🎮',
        image: '/images/category-gaming-laptop.jpg',
        features: ['RTX графика', 'Высокая частота', 'Продвинутое охлаждение'],
        color: 'purple'
      },
      {
        id: 'mini',
        name: 'Мини ПК',
        slug: CATEGORY_SLUGS.mini,
        description: 'Компактные и мощные мини-ПК для эффективных вычислений',
        icon: '🖥️',
        image: '/images/category-mini-pc.jpg',
        features: ['Компактный дизайн', 'Тихая работа', 'Энергоэффективность'],
        color: 'green'
      }
    ]
  },
  ja: {
    title: '製品カテゴリー',
    subtitle: '包括的なコンピューティングソリューションをご覧ください',
    categories: [
      {
        id: 'business',
        name: 'ビジネスノートPC',
        slug: CATEGORY_SLUGS.business,
        description: 'ビジネスの生産性と信頼性のために設計されたプロフェッショナルノートPC',
        icon: '💼',
        image: '/images/category-business-laptop.jpg',
        features: ['Intel Core i9', '長時間バッテリー', 'エンタープライズセキュリティ'],
        color: 'blue'
      },
      {
        id: 'gaming',
        name: 'ゲーミングノートPC',
        slug: CATEGORY_SLUGS.gaming,
        description: '最先端のグラフィックスを搭載した高性能ゲーミングノートPC',
        icon: '🎮',
        image: '/images/category-gaming-laptop.jpg',
        features: ['RTXグラフィックス', '高リフレッシュレート', '高度な冷却'],
        color: 'purple'
      },
      {
        id: 'mini',
        name: 'ミニPC',
        slug: CATEGORY_SLUGS.mini,
        description: 'スペース効率の良いコンパクトで強力なミニPC',
        icon: '🖥️',
        image: '/images/category-mini-pc.jpg',
        features: ['コンパクト設計', '静音動作', '省エネ'],
        color: 'green'
      }
    ]
  },
  fr: {
    title: 'Catégories de produits',
    subtitle: 'Explorez notre gamme complète de solutions informatiques',
    categories: [
      {
        id: 'business',
        name: 'Ordinateur portable professionnel',
        slug: CATEGORY_SLUGS.business,
        description: 'Ordinateurs portables professionnels conçus pour la productivité et la fiabilité',
        icon: '💼',
        image: '/images/category-business-laptop.jpg',
        features: ['Intel Core i9', 'Longue autonomie', 'Sécurité entreprise'],
        color: 'blue'
      },
      {
        id: 'gaming',
        name: 'Ordinateur portable gaming',
        slug: CATEGORY_SLUGS.gaming,
        description: 'Ordinateurs portables gaming haute performance avec graphismes de pointe',
        icon: '🎮',
        image: '/images/category-gaming-laptop.jpg',
        features: ['Graphiques RTX', 'Taux de rafraîchissement élevé', 'Refroidissement avancé'],
        color: 'purple'
      },
      {
        id: 'mini',
        name: 'Mini PC',
        slug: CATEGORY_SLUGS.mini,
        description: 'Mini PC compacts et puissants pour un calcul efficace',
        icon: '🖥️',
        image: '/images/category-mini-pc.jpg',
        features: ['Design compact', 'Fonctionnement silencieux', 'Économe en énergie'],
        color: 'green'
      }
    ]
  },
  pt: {
    title: 'Categorias de produtos',
    subtitle: 'Explore nossa gama completa de soluções de computação',
    categories: [
      {
        id: 'business',
        name: 'Laptop empresarial',
        slug: CATEGORY_SLUGS.business,
        description: 'Laptops profissionais projetados para produtividade e confiabilidade empresarial',
        icon: '💼',
        image: '/images/category-business-laptop.jpg',
        features: ['Intel Core i9', 'Bateria de longa duração', 'Segurança empresarial'],
        color: 'blue'
      },
      {
        id: 'gaming',
        name: 'Laptop gamer',
        slug: CATEGORY_SLUGS.gaming,
        description: 'Laptops gamer de alto desempenho com gráficos de ponta',
        icon: '🎮',
        image: '/images/category-gaming-laptop.jpg',
        features: ['Gráficos RTX', 'Alta taxa de atualização', 'Resfriamento avançado'],
        color: 'purple'
      },
      {
        id: 'mini',
        name: 'Mini PC',
        slug: CATEGORY_SLUGS.mini,
        description: 'Mini PCs compactos e poderosos para computação eficiente',
        icon: '🖥️',
        image: '/images/category-mini-pc.jpg',
        features: ['Design compacto', 'Operação silenciosa', 'Eficiência energética'],
        color: 'green'
      }
    ]
  },
  'zh-CN': {
    title: '产品类目',
    subtitle: '探索我们全面的计算解决方案',
    categories: [
      {
        id: 'business',
        name: '商务本',
        slug: CATEGORY_SLUGS.business,
        description: '专为商务生产力和可靠性设计的专业笔记本',
        icon: '💼',
        image: '/images/category-business-laptop.jpg',
        features: ['Intel Core i9', '长续航', '企业级安全'],
        color: 'blue'
      },
      {
        id: 'gaming',
        name: '游戏本',
        slug: CATEGORY_SLUGS.gaming,
        description: '配备尖端显卡的高性能游戏笔记本',
        icon: '🎮',
        image: '/images/category-gaming-laptop.jpg',
        features: ['RTX显卡', '高刷新率', '先进散热'],
        color: 'purple'
      },
      {
        id: 'mini',
        name: '迷你主机',
        slug: CATEGORY_SLUGS.mini,
        description: '紧凑而强大的迷你主机，节省空间的计算解决方案',
        icon: '🖥️',
        image: '/images/category-mini-pc.jpg',
        features: ['紧凑设计', '静音运行', '节能高效'],
        color: 'green'
      }
    ]
  }
}

// Color schemes for each category
const colorSchemes = {
  blue: {
    bg: 'from-blue-50 to-blue-100',
    border: 'border-blue-200 hover:border-blue-400',
    text: 'text-blue-600',
    icon: 'bg-blue-100 text-blue-600',
    button: 'bg-blue-600 hover:bg-blue-700 text-white'
  },
  purple: {
    bg: 'from-purple-50 to-purple-100',
    border: 'border-purple-200 hover:border-purple-400',
    text: 'text-purple-600',
    icon: 'bg-purple-100 text-purple-600',
    button: 'bg-purple-600 hover:bg-purple-700 text-white'
  },
  green: {
    bg: 'from-green-50 to-green-100',
    border: 'border-green-200 hover:border-green-400',
    text: 'text-green-600',
    icon: 'bg-green-100 text-green-600',
    button: 'bg-green-600 hover:bg-green-700 text-white'
  }
}

export function ProductCategories() {
  const language = useLanguage()
  const content = categoryContent[language] || categoryContent.en

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            {content.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.categories.map((category) => {
            const colors = colorSchemes[category.color as keyof typeof colorSchemes]
            
            return (
              <Link
                key={category.id}
                href={`/products?category=${encodeURIComponent(category.slug)}`}
                className="group"
              >
                <div className={`relative bg-gradient-to-br ${colors.bg} rounded-2xl p-8 border-2 ${colors.border} hover:shadow-2xl transition-all duration-300 h-full flex flex-col`}>
                  {/* Category Image */}
                  <div className="relative h-40 mb-6 overflow-hidden rounded-xl">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                         style={{backgroundImage: `url(${category.image})`}}>
                      <div className="absolute inset-0 bg-black/20"></div>
                    </div>
                  </div>

                  {/* Category Name */}
                  <h3 className={`text-2xl font-bold ${colors.text} mb-3`}>
                    {category.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 flex-grow">
                    {category.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {category.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-700">
                        <svg className={`w-4 h-4 mr-2 ${colors.text}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className={`${colors.button} px-6 py-3 rounded-lg text-center font-semibold group-hover:scale-105 transition-transform duration-300`}>
                    {language === 'zh-CN' ? '查看产品' : 
                     language === 'ru' ? 'Смотреть продукты' :
                     language === 'ja' ? '製品を見る' :
                     language === 'fr' ? 'Voir les produits' :
                     language === 'pt' ? 'Ver produtos' :
                     'View Products'}
                  </div>

                  {/* Hover Effect Arrow */}
                  <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className={`w-6 h-6 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

