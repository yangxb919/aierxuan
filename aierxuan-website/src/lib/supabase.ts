import { createClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database'

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Browser client for client components
export const createSupabaseClient = () =>
  createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)

// Admin client with service role (for server-side operations only)
export const createSupabaseAdminClient = () => {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseServiceKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is required for admin operations')
  }

  return createClient<Database>(
    supabaseUrl,
    supabaseServiceKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}

// Utility function to handle Supabase errors
export const handleSupabaseError = (error: any) => {
  console.error('Supabase error:', error)
  return {
    error: error.message || 'An unexpected error occurred',
    code: error.code || 'UNKNOWN_ERROR'
  }
}

// Type-safe query builder helpers
export const createTypedSupabaseClient = () => {
  const client = createSupabaseClient()
  
  return {
    // Products
    products: () => client.from('products'),
    productTranslations: () => client.from('product_translations'),
    
    // Blog
    blogPosts: () => client.from('blog_posts'),
    blogPostTranslations: () => client.from('blog_post_translations'),
    
    // FAQ
    faq: () => client.from('faq'),
    faqTranslations: () => client.from('faq_translations'),
    
    // Admin
    adminUsers: () => client.from('admin_users'),
    adminSessions: () => client.from('admin_sessions'),
    
    // RFQ
    rfqRequests: () => client.from('rfqs'),
    
    // Settings
    siteSettings: () => client.from('site_settings'),
    
    // Audit
    auditEvents: () => client.from('audit_events'),
    
    // Raw client for custom queries
    client
  }
}

export type TypedSupabaseClient = ReturnType<typeof createTypedSupabaseClient>
