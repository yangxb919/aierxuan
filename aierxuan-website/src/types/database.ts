/**
 * This file contains manual modifications.
 * If you run `supabase gen types`, this file will be overwritten.
 * Please ensure any manual changes are preserved or migrated to a separate types file.
 */
/**
 * NOTE:
 * This file includes manual edits on top of the Supabase CLI generated output.
 * Regenerating the file with `supabase gen types` will overwrite these tweaks,
 * so re-apply any custom changes after running the generator.
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      admin_sessions: {
        Row: {
          created_at: string | null
          expires_at: string
          id: string
          ip_address: unknown | null
          revoked_at: string | null
          session_token: string
          updated_at: string | null
          user_agent: string | null
          admin_user_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          id?: string
          ip_address?: unknown | null
          revoked_at?: string | null
          session_token: string
          updated_at?: string | null
          user_agent?: string | null
          admin_user_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          id?: string
          ip_address?: unknown | null
          revoked_at?: string | null
          session_token?: string
          updated_at?: string | null
          user_agent?: string | null
          admin_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_sessions_admin_user_id_fkey"
            columns: ["admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          }
        ]
      }
      admin_users: {
        Row: {
          created_at: string | null
          email: string
          first_name: string | null
          id: string
          is_active: boolean | null
          last_name: string | null
          password_hash: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          first_name?: string | null
          id?: string
          is_active?: boolean | null
          last_name?: string | null
          password_hash?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          first_name?: string | null
          id?: string
          is_active?: boolean | null
          last_name?: string | null
          password_hash?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      audit_events: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string | null
          entity_id: string | null
          entity_type: string | null
          id: string
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          user_agent: string | null
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_events_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          }
        ]
      }
      blog_post_translations: {
        Row: {
          body_md: string
          created_at: string | null
          excerpt: string | null
          id: string
          locale: string
          post_id: string
          seo_desc: string | null
          seo_title: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          body_md: string
          created_at?: string | null
          excerpt?: string | null
          id?: string
          locale: string
          post_id: string
          seo_desc?: string | null
          seo_title?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          body_md?: string
          created_at?: string | null
          excerpt?: string | null
          id?: string
          locale?: string
          post_id?: string
          seo_desc?: string | null
          seo_title?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_post_translations_locale_fkey"
            columns: ["locale"]
            isOneToOne: false
            referencedRelation: "i18n_locales"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "blog_post_translations_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          }
        ]
      }
      blog_posts: {
        Row: {
          author_id: string | null
          cover_image: string | null
          created_at: string | null
          featured: boolean | null
          id: string
          published_at: string | null
          slug: string
          sort_order: number | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          cover_image?: string | null
          created_at?: string | null
          featured?: boolean | null
          id?: string
          published_at?: string | null
          slug: string
          sort_order?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          cover_image?: string | null
          created_at?: string | null
          featured?: boolean | null
          id?: string
          published_at?: string | null
          slug?: string
          sort_order?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          }
        ]
      }
      faq: {
        Row: {
          category: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      faq_translations: {
        Row: {
          answer: string
          created_at: string | null
          faq_id: string
          id: string
          language_code: string
          question: string
          updated_at: string | null
        }
        Insert: {
          answer: string
          created_at?: string | null
          faq_id: string
          id?: string
          language_code: string
          question: string
          updated_at?: string | null
        }
        Update: {
          answer?: string
          created_at?: string | null
          faq_id?: string
          id?: string
          language_code?: string
          question?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "faq_translations_faq_id_fkey"
            columns: ["faq_id"]
            isOneToOne: false
            referencedRelation: "faq"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "faq_translations_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "i18n_locales"
            referencedColumns: ["code"]
          }
        ]
      }
      i18n_locales: {
        Row: {
          code: string
          created_at: string | null
          is_active: boolean | null
          is_default: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          is_active?: boolean | null
          is_default?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          is_active?: boolean | null
          is_default?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      product_translations: {
        Row: {
          created_at: string | null
          description: string
          features: Json | null
          faqs: Json | null
          id: string
          language_code: string
          meta_description: string | null
          meta_keywords: string | null
          name: string
          oem_services: Json | null
          product_id: string
          quality_tests: Json | null
          short_description: string | null
          specifications: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          features?: Json | null
          faqs?: Json | null
          id?: string
          language_code: string
          meta_description?: string | null
          meta_keywords?: string | null
          name: string
          oem_services?: Json | null
          product_id: string
          quality_tests?: Json | null
          short_description?: string | null
          specifications?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          features?: Json | null
          faqs?: Json | null
          id?: string
          language_code?: string
          meta_description?: string | null
          meta_keywords?: string | null
          name?: string
          oem_services?: Json | null
          product_id?: string
          quality_tests?: Json | null
          short_description?: string | null
          specifications?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_translations_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "i18n_locales"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "product_translations_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          category: string | null
          created_at: string | null
          datasheet_url: string | null
          featured: boolean | null
          id: string
          images: Json | null
          moq: number | null
          price: number | null
          slug: string
          sort_order: number | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          datasheet_url?: string | null
          featured?: boolean | null
          id?: string
          images?: Json | null
          moq?: number | null
          price?: number | null
          slug: string
          sort_order?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          datasheet_url?: string | null
          featured?: boolean | null
          id?: string
          images?: Json | null
          moq?: number | null
          price?: number | null
          slug?: string
          sort_order?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      rfqs: {
        Row: {
          admin_notes: string | null
          assigned_to: string | null
          budget_range: string | null
          company: string | null
          contacted_at: string | null
          country: string | null
          created_at: string | null
          email: string
          follow_up_date: string | null
          id: string
          industry: string | null
          ip_address: unknown | null
          language_code: string | null
          message: string | null
          name: string
          phone: string | null
          priority: string | null
          product_interest: string | null
          quantity: string | null
          referrer: string | null
          source: string | null
          status: string | null
          updated_at: string | null
          urgency: string | null
          user_agent: string | null
        }
        Insert: {
          admin_notes?: string | null
          assigned_to?: string | null
          budget_range?: string | null
          company?: string | null
          contacted_at?: string | null
          country?: string | null
          created_at?: string | null
          email: string
          follow_up_date?: string | null
          id?: string
          industry?: string | null
          ip_address?: unknown | null
          language_code?: string | null
          message?: string | null
          name: string
          phone?: string | null
          priority?: string | null
          product_interest?: string | null
          quantity?: string | null
          referrer?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string | null
          urgency?: string | null
          user_agent?: string | null
        }
        Update: {
          admin_notes?: string | null
          assigned_to?: string | null
          budget_range?: string | null
          company?: string | null
          contacted_at?: string | null
          country?: string | null
          created_at?: string | null
          email?: string
          follow_up_date?: string | null
          id?: string
          industry?: string | null
          ip_address?: unknown | null
          language_code?: string | null
          message?: string | null
          name?: string
          phone?: string | null
          priority?: string | null
          product_interest?: string | null
          quantity?: string | null
          referrer?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string | null
          urgency?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_public: boolean | null
          key: string
          updated_at: string | null
          value: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          key: string
          updated_at?: string | null
          value: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          key?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
