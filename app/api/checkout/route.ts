import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
})

export async function POST(req: NextRequest) {
  try {
    const { items, customerEmail, shippingCountry } = await req.json()

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

    const shippingCost = shippingCountry === "Estados Unidos" ? 200000 : 40000

    const lineItems = items.map((item: {
      product_name: string
      quantity: number
      price: number
      color?: string
      size?: string
      image?: string
    }) => ({
      price_data: {
        currency: "mxn",
        product_data: {
          name: item.product_name,
          description: [item.color, item.size].filter(Boolean).join(" · ") || undefined,
          images: item.image ? [`${siteUrl}${item.image}`] : undefined,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      customer_email: customerEmail || undefined,
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: shippingCost, currency: "mxn" },
            display_name: shippingCountry === "Estados Unidos" ? "Envío Internacional" : "Envío México",
            delivery_estimate: {
              minimum: { unit: "business_day", value: shippingCountry === "Estados Unidos" ? 7 : 3 },
              maximum: { unit: "business_day", value: shippingCountry === "Estados Unidos" ? 14 : 7 },
            },
          },
        },
      ],
      phone_number_collection: { enabled: true },
      billing_address_collection: "required",
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout/cancel`,
      locale: "es",
      metadata: {
        shipping_country: shippingCountry || "México",
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error interno"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
