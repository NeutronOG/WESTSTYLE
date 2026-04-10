import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: number
          name: string
          description: string
          price: number
          image: string
          images: string[]
          category: string
          sizes: string[]
          colors: string[]
          in_stock: boolean
          featured: boolean
          material: string
          care: string
          created_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["products"]["Row"], "created_at">
        Update: Partial<Database["public"]["Tables"]["products"]["Insert"]>
      }
      orders: {
        Row: {
          id: string
          customer_name: string
          customer_email: string
          customer_phone: string
          items: OrderItem[]
          total: number
          status: "pending" | "confirmed" | "shipped" | "delivered"
          shipping_address: string
          shipping_country: string
          shipping_cost: number
          notes: string | null
          created_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["orders"]["Row"], "id" | "created_at">
        Update: Partial<Database["public"]["Tables"]["orders"]["Insert"]>
      }
      contacts: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          message: string
          created_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["contacts"]["Row"], "id" | "created_at">
        Update: Partial<Database["public"]["Tables"]["contacts"]["Insert"]>
      }
    }
  }
}

export type OrderItem = {
  product_id: number
  product_name: string
  quantity: number
  price: number
  color?: string
  size?: string
}
