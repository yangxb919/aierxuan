/**
 * 产品页面文案配置
 */

export interface ProductsContent {
  title: string
  subtitle: string
  description: string
  categories: {
    all: string
    industrial: string
    commercial: string
    residential: string
    specialty: string
  }
  filters: {
    search: string
    category: string
    status: string
    sortBy: string
    clear: string
  }
  productCard: {
    viewDetails: string
    requestQuote: string
    specifications: string
    features: string
    applications: string
    inStock: string
    outOfStock: string
    discontinued: string
  }
  noProducts: {
    title: string
    description: string
    contactSales: string
  }
}

export const productsContent: Record<string, ProductsContent> = {
  en: {
    title: 'Our Products',
    subtitle: 'High-Quality Industrial Solutions',
    description: 'Discover our comprehensive range of automation products designed for various industries and applications.',
    categories: {
      all: 'All Products',
      industrial: 'Industrial',
      commercial: 'Commercial',
      residential: 'Residential',
      specialty: 'Specialty'
    },
    filters: {
      search: 'Search products...',
      category: 'Category',
      status: 'Status',
      sortBy: 'Sort by',
      clear: 'Clear filters'
    },
    productCard: {
      viewDetails: 'View Details',
      requestQuote: 'Request Quote',
      specifications: 'Specifications',
      features: 'Features',
      applications: 'Applications',
      inStock: 'In Stock',
      outOfStock: 'Out of Stock',
      discontinued: 'Discontinued'
    },
    noProducts: {
      title: 'No products found',
      description: 'Try adjusting your filters or search terms.',
      contactSales: 'Contact Sales Team'
    }
  },
  'zh-CN': {
    title: '我们的产品',
    subtitle: '高品质工业解决方案',
    description: '探索我们为各行业和应用设计的全面自动化产品系列。',
    categories: {
      all: '所有产品',
      industrial: '工业产品',
      commercial: '商业产品',
      residential: '住宅产品',
      specialty: '特殊产品'
    },
    filters: {
      search: '搜索产品...',
      category: '类别',
      status: '状态',
      sortBy: '排序',
      clear: '清除筛选'
    },
    productCard: {
      viewDetails: '查看详情',
      requestQuote: '获取报价',
      specifications: '规格参数',
      features: '产品特性',
      applications: '应用场景',
      inStock: '有库存',
      outOfStock: '缺货',
      discontinued: '已停产'
    },
    noProducts: {
      title: '未找到产品',
      description: '请尝试调整筛选条件或搜索关键词。',
      contactSales: '联系销售团队'
    }
  },
  // 其他语言版本可以类似添加...
  ru: {
    title: 'Наши продукты',
    subtitle: 'Качественные промышленные решения',
    description: 'Откройте для себя наш полный ассортимент продукции для автоматизации, разработанной для различных отраслей и применений.',
    categories: {
      all: 'Все продукты',
      industrial: 'Промышленные',
      commercial: 'Коммерческие',
      residential: 'Жилые',
      specialty: 'Специальные'
    },
    filters: {
      search: 'Поиск продуктов...',
      category: 'Категория',
      status: 'Статус',
      sortBy: 'Сортировка',
      clear: 'Очистить фильтры'
    },
    productCard: {
      viewDetails: 'Подробнее',
      requestQuote: 'Запросить предложение',
      specifications: 'Характеристики',
      features: 'Возможности',
      applications: 'Применение',
      inStock: 'В наличии',
      outOfStock: 'Нет в наличии',
      discontinued: 'Снято с производства'
    },
    noProducts: {
      title: 'Продукты не найдены',
      description: 'Попробуйте изменить фильтры или поисковые запросы.',
      contactSales: 'Связаться с отделом продаж'
    }
  }
}

export const PRODUCTS_CONTENT_LIMITS = {
  title: { max: 50, recommended: { min: 10, max: 30 } },
  subtitle: { max: 60, recommended: { min: 15, max: 35 } },
  description: { max: 200, recommended: { min: 50, max: 150 } }
} as const