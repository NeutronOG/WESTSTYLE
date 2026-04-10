import { supabase } from "./supabase"
import type { OrderItem } from "./supabase"

export async function createOrder(order: {
  customer_name: string
  customer_email: string
  customer_phone: string
  items: OrderItem[]
  total: number
  shipping_address: string
  shipping_country: string
  shipping_cost: number
  notes?: string
}) {
  const { data, error } = await supabase
    .from("orders")
    .insert([{ ...order, status: "pending" }])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function getOrderById(id: string) {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single()

  if (error) throw error
  return data
}

export async function submitContact(contact: {
  name: string
  email: string
  phone?: string
  message: string
}) {
  const { data, error } = await supabase
    .from("contacts")
    .insert([contact])
    .select()
    .single()

  if (error) throw error
  return data
}
