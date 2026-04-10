import Stripe from "stripe"
import { readFileSync } from "fs"
import { resolve } from "path"

// Leer .env.local para obtener la key sin exponerla en el código
const envPath = resolve(process.cwd(), ".env.local")
const envContent = readFileSync(envPath, "utf-8")
const stripeKey = envContent.match(/STRIPE_SECRET_KEY=(.+)/)?.[1]?.trim()
if (!stripeKey) throw new Error("STRIPE_SECRET_KEY no encontrada en .env.local")

const stripe = new Stripe(stripeKey, {
  apiVersion: "2026-03-25.dahlia",
})

const products = [
  // ── MORCON ──────────────────────────────────────────────
  { id: 1, name: "Sinaloa 20X Lana Boliviana - Morcon",           price: 3500,  category: "Morcon",      description: "Texana lana boliviana, calidad 20X, con caja de cartón incluida. Copa: 11 cm, Falda: 9 cm" },
  { id: 2, name: "Sinaloa 20X Lana Boliviana Gris Cristal - Morcon", price: 3500, category: "Morcon",   description: "Texana lana boliviana, calidad 20X, Gris Cristal, con caja de cartón incluida. Copa: 11 cm, Falda: 9 cm" },
  { id: 3, name: "Sinaloa 20X Café - Morcon",                     price: 3500,  category: "Morcon",      description: "Texana lana boliviana, calidad 20X, color Café, con caja de cartón incluida. Copa: 11 cm, Falda: 9 cm" },
  { id: 7, name: "Este Oeste 20X - Morcon",                       price: 3500,  category: "Morcon",      description: "Texana lana boliviana, calidad 20X, corte Este Oeste, con caja de cartón incluida. Copa: 11 cm, Falda: 11 cm" },
  { id: 8, name: "Este Oeste Naranja 20X - Morcon",               price: 3500,  category: "Morcon",      description: "Texana lana boliviana, calidad 20X, color Naranja, corte Este Oeste, con caja de cartón incluida. Copa: 11 cm, Falda: 11 cm" },
  { id: 9, name: "Brasil Roja 20X - Morcon",                      price: 3500,  category: "Morcon",      description: "Texana lana boliviana, calidad 20X, Brasil Roja, con caja de cartón incluida. Copa: 11 cm, Falda: 9 cm" },
  { id: 11, name: "Conejo 200X - Morcon",                         price: 8000,  category: "Morcon",      description: "Texana fina calidad 200X, pelaje de conejo, caja de cartón incluida, pluma en plata alemana personalizada. Copa: 11 cm, Falda: 9 cm" },
  { id: 10, name: "Castor 500X - Morcon",                         price: 18000, category: "Morcon",      description: "Texana fina calidad 500X, pelaje de castor, estuche de viaje incluido, pluma plata alemana, certificado de autenticidad. Copa: 11 cm, Falda: 9 cm" },
  // ── TOMBSTONE ────────────────────────────────────────────
  { id: 4, name: "Roper Tombstone 20X",                           price: 3500,  category: "Tombstone",   description: "Texana Tombstone corte Roper, calidad 20X, con caja de cartón incluida. Copa: 11 cm, Falda: 11 cm" },
  { id: 20, name: "Este Oeste Tombstone 20X",                     price: 3500,  category: "Tombstone",   description: "Texana Tombstone corte Este Oeste, calidad 20X, con caja de cartón incluida. Copa: 11 cm, Falda: 11 cm" },
  { id: 22, name: "Viejón Tombstone 20X",                         price: 3500,  category: "Tombstone",   description: "Texana Tombstone corte Viejón, calidad 20X, con caja de cartón incluida. Copa: 12 cm, Falda: 10 cm" },
  { id: 23, name: "Sinaloa Tombstone 1,000X",                     price: 1900,  category: "Tombstone",   description: "Sombrero Tombstone calidad 1,000X. Copa: 11 cm, Falda: 9 cm" },
  { id: 12, name: "Sinaloa Tombstone 5,000X",                     price: 3800,  category: "Tombstone",   description: "Sombrero Tombstone calidad 5,000X. Copa: 11 cm, Falda: 9 cm" },
  { id: 16, name: "Sinaloa Tombstone 10,000X",                    price: 12600, category: "Tombstone",   description: "Sombrero Tombstone tejido a mano, calidad 10,000X, Handwoven Shantung artesanal con certificado de autenticidad" },
  // ── LAREDO HATS ──────────────────────────────────────────
  { id: 24, name: "Eden Muñoz - Laredo Hats",                     price: 4500,  category: "Laredo Hats", description: "Texana de colaboración exclusiva con Eden Muñoz, calidad premium Laredo. Copa: 14 cm, Falda: 9 cm" },
  { id: 17, name: "Luis R Conríquez - Laredo Hats",               price: 4500,  category: "Laredo Hats", description: "Texana de colaboración exclusiva con Luis R Conríquez, calidad premium Laredo. Copa: 14 cm, Falda: 9 cm" },
  { id: 18, name: "Carin Leon - Laredo Hats",                     price: 4500,  category: "Laredo Hats", description: "Texana de colaboración exclusiva con Carin Leon, calidad premium Laredo. Copa: 14 cm, Falda: 9 cm" },
  // ── ACCESORIOS ───────────────────────────────────────────
  { id: 19, name: "Toquilla Hilo de Plata",                       price: 4800,  category: "Accesorios",  description: "Toquilla tejida a mano sobre vaqueta con hilo de plata ley 925" },
  { id: 25, name: "Pluma Plata Alemana",                          price: 500,   category: "Accesorios",  description: "Pluma decorativa de plata alemana para texanas, acabado artesanal" },
  { id: 26, name: "Forro San Judas",                              price: 300,   category: "Accesorios",  description: "Forro interior decorativo con imagen de San Judas Tadeo para texanas" },
  { id: 15, name: "Espuma Limpieza para Texana",                  price: 400,   category: "Accesorios",  description: "Espuma especializada para limpieza y mantenimiento de texanas" },
]

async function main() {
  console.log(`\n🎩 Creando ${products.length} productos en Stripe (moneda: MXN)...\n`)

  const results = []

  for (const p of products) {
    try {
      // 1. Crear el producto
      const product = await stripe.products.create({
        name: p.name,
        description: p.description,
        metadata: {
          internal_id: String(p.id),
          category: p.category,
        },
      })

      // 2. Crear el precio (Stripe maneja centavos, MXN no tiene centavos decimales relevantes — usamos precio * 100)
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: p.price * 100, // en centavos MXN
        currency: "mxn",
      })

      results.push({ name: p.name, productId: product.id, priceId: price.id, amount: `$${p.price.toLocaleString("es-MX")} MXN` })
      console.log(`  ✅ ${p.name}`)
      console.log(`     Product ID : ${product.id}`)
      console.log(`     Price ID   : ${price.id}`)
      console.log(`     Precio     : $${p.price.toLocaleString("es-MX")} MXN\n`)
    } catch (err) {
      console.error(`  ❌ Error en "${p.name}":`, err.message)
    }
  }

  console.log("\n─────────────────────────────────────────────")
  console.log(`✅ Completado: ${results.length}/${products.length} productos creados`)
  console.log("─────────────────────────────────────────────\n")

  // Guardar resumen en JSON
  const fs = await import("fs")
  fs.writeFileSync(
    new URL("./stripe-products-created.json", import.meta.url),
    JSON.stringify(results, null, 2)
  )
  console.log("📄 Resultados guardados en scripts/stripe-products-created.json\n")
}

main()
