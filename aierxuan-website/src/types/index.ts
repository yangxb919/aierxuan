import type { Database } from './database'

// Database table types
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Inserts<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type Updates<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

// Specific table types
export type Product = Tables<'products'>
export type ProductTranslation = Tables<'product_translations'>
export type BlogPost = Tables<'blog_posts'>
export type BlogPostTranslation = Tables<'blog_post_translations'>
export type FAQ = Tables<'faq'>
export type FAQTranslation = Tables<'faq_translations'>
export type AdminUser = Tables<'admin_users'>
export type AdminSession = Tables<'admin_sessions'>
export type RFQ = Tables<'rfqs'>
export type SiteSetting = Tables<'site_settings'>
export type AuditEvent = Tables<'audit_events'>
export type I18nLocale = Tables<'i18n_locales'>

// Insert types
export type ProductInsert = Inserts<'products'>
export type ProductTranslationInsert = Inserts<'product_translations'>
export type BlogPostInsert = Inserts<'blog_posts'>
export type BlogPostTranslationInsert = Inserts<'blog_post_translations'>
export type FAQInsert = Inserts<'faq'>
export type FAQTranslationInsert = Inserts<'faq_translations'>
export type RFQInsert = Inserts<'rfqs'>

// Update types
export type ProductUpdate = Updates<'products'>
export type ProductTranslationUpdate = Updates<'product_translations'>
export type BlogPostUpdate = Updates<'blog_posts'>
export type BlogPostTranslationUpdate = Updates<'blog_post_translations'>
export type FAQUpdate = Updates<'faq'>
export type FAQTranslationUpdate = Updates<'faq_translations'>
export type RFQUpdate = Updates<'rfqs'>

// Combined types for frontend use
export interface ProductWithTranslations extends Product {
  translations: ProductTranslation[]
  currentTranslation?: ProductTranslation
}

export interface BlogPostWithTranslations extends BlogPost {
  translations: BlogPostTranslation[]
  currentTranslation?: BlogPostTranslation
  author?: AdminUser
}

export interface FAQWithTranslations extends FAQ {
  translations: FAQTranslation[]
  currentTranslation?: FAQTranslation
}

// Language and locale types
export type LanguageCode = 'en' | 'ru' | 'ja' | 'fr' | 'pt' | 'zh-CN'

export interface LocalizedContent {
  en?: string
  ru?: string
  ja?: string
  fr?: string
  pt?: string
  'zh-CN'?: string
}

// API response types
export interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Form types
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  productInterest?: string
  quantityNeeded?: string
  industry?: string
  contactMethod?: 'email' | 'phone' | 'both'
}

// Admin types
export type AdminRole = 'admin' | 'editor' | 'viewer'

export interface AdminUserWithSessions extends AdminUser {
  sessions?: AdminSession[]
  lastLogin?: string
}

// Product categories and statuses
export type ProductStatus = 'active' | 'inactive' | 'discontinued'
export type ProductCategory = 'industrial' | 'commercial' | 'residential' | 'specialty'

export type BlogPostStatus = 'draft' | 'published' | 'archived'
export type RFQStatus = 'new' | 'in_progress' | 'quoted' | 'converted' | 'closed' | 'archived'
export type RFQPriority = 'low' | 'medium' | 'high' | 'urgent'

// UI component types
export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface NavigationItem {
  name: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  children?: NavigationItem[]
  external?: boolean
}

// Search and filter types
export interface SearchFilters {
  query?: string
  category?: string
  status?: string
  language?: LanguageCode
  featured?: boolean
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

// Error types
export interface AppError {
  code: string
  message: string
  details?: any
}

// Theme and UI types
export type Theme = 'light' | 'dark' | 'system'

export interface UIState {
  theme: Theme
  sidebarOpen: boolean
  loading: boolean
  error: AppError | null
}

// Export database types
export type { Database } from './database'
