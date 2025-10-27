/**
 * 导航栏文案配置
 */

export interface NavigationContent {
  logo: string
  home: string
  about: string
  products: string
  contact: string
  blog: string
  admin: string
  languageSelector: string
  search: string
  menu: string
  close: string
}

export const navigationContent: Record<string, NavigationContent> = {
  en: {
    logo: 'AIERXUAN',
    home: 'Home',
    about: 'About',
    products: 'Products',
    contact: 'Contact',
    blog: 'Blog',
    admin: 'Admin',
    languageSelector: 'Language',
    search: 'Search',
    menu: 'Menu',
    close: 'Close'
  },
  ru: {
    logo: 'AIERXUAN',
    home: 'Главная',
    about: 'О компании',
    products: 'Продукты',
    contact: 'Контакты',
    blog: 'Блог',
    admin: 'Админ',
    languageSelector: 'Язык',
    search: 'Поиск',
    menu: 'Меню',
    close: 'Закрыть'
  },
  ja: {
    logo: 'AIERXUAN',
    home: 'ホーム',
    about: '会社概要',
    products: '製品',
    contact: 'お問い合わせ',
    blog: 'ブログ',
    admin: '管理',
    languageSelector: '言語',
    search: '検索',
    menu: 'メニュー',
    close: '閉じる'
  },
  fr: {
    logo: 'AIERXUAN',
    home: 'Accueil',
    about: 'À propos',
    products: 'Produits',
    contact: 'Contact',
    blog: 'Blog',
    admin: 'Admin',
    languageSelector: 'Langue',
    search: 'Rechercher',
    menu: 'Menu',
    close: 'Fermer'
  },
  pt: {
    logo: 'AIERXUAN',
    home: 'Início',
    about: 'Sobre',
    products: 'Produtos',
    contact: 'Contato',
    blog: 'Blog',
    admin: 'Admin',
    languageSelector: 'Idioma',
    search: 'Pesquisar',
    menu: 'Menu',
    close: 'Fechar'
  },
  'zh-CN': {
    logo: 'AIERXUAN',
    home: '首页',
    about: '关于',
    products: '产品',
    contact: '联系',
    blog: '博客',
    admin: '管理',
    languageSelector: '语言',
    search: '搜索',
    menu: '菜单',
    close: '关闭'
  }
}

export const NAVIGATION_CONTENT_LIMITS = {
  logo: { max: 30, recommended: { min: 5, max: 20 } },
  home: { max: 20, recommended: { min: 3, max: 10 } },
  about: { max: 20, recommended: { min: 3, max: 10 } },
  products: { max: 20, recommended: { min: 3, max: 10 } },
  contact: { max: 20, recommended: { min: 3, max: 10 } },
  blog: { max: 20, recommended: { min: 3, max: 10 } },
  admin: { max: 20, recommended: { min: 3, max: 10 } }
} as const