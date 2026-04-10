import Stripe from "stripe"
import { readFileSync } from "fs"
import { resolve } from "path"

const envPath = resolve(process.cwd(), ".env.local")
const envContent = readFileSync(envPath, "utf-8")
const stripeKey = envContent.match(/STRIPE_SECRET_KEY=(.+)/)?.[1]?.trim()
if (!stripeKey) throw new Error("STRIPE_SECRET_KEY no encontrada en .env.local")

const stripe = new Stripe(stripeKey, { apiVersion: "2026-03-25.dahlia" })

const BASE_URL = "https://weststyle.vercel.app"

// product_id de Stripe -> imagen pública
const updates = [
  { productId: "prod_UJ7zIIkMCHE52S", image: "/Sinaloa 20x lana boliviana MORCON Texana.png" },
  { productId: "prod_UJ7zokFJ39ptDB", image: "/Sinaloa 20x MORCON gris cristal Texana.png" },
  { productId: "prod_UJ7zjOQoXz0r3y", image: "/Sinaloa 20x MORCON Texana.png" },
  { productId: "prod_UJ7z7s2UTiTF9D", image: "/Este oeste 20x lana boliviana MORCON Texana.png" },
  { productId: "prod_UJ7zA4yLUH5hip", image: "/Este oeste MORCON 20x naranja Texana.png" },
  { productId: "prod_UJ7zqDQiizt3wr", image: "/Brasil roja 20x MORCON Texana.png" },
  { productId: "prod_UJ7zANDMZq5uzd", image: "/Este Oeste- Gris Granito.png" },
  { productId: "prod_UJ7za4fu0Dc1OR", image: "/Los alegres del barranco 5000x TOMBSTONE Sombrero.png" },
  { productId: "prod_UJ7zQnQsvSlmQF", image: "/ROPER 20x TOMBSTONE Texana.png" },
  { productId: "prod_UJ7z2JtzbYLTcW", image: "/Este oeste 20x TOMBSTONE Texana.png" },
  { productId: "prod_UJ7zRBl4nYMIGJ", image: "/El KOMANDER TOMBSTONE Sombrero.png" },
  { productId: "prod_UJ7zXTjwUDQYA0", image: "/Sinaloa 20x MORCON Texana.png" },
  { productId: "prod_UJ7zso5LI7YNyu", image: "/Este oeste 5000x TOMBSTONE Sombrero.png" },
  { productId: "prod_UJ7zEYMO7hPxE6", image: "/TOMBSTONE 10,000x.png" },
  { productId: "prod_UJ7zXa9N7nUUhe", image: "/Luis R Conriquez 4x Laredo Texana.png" },
  { productId: "prod_UJ7zjUfVMM25RV", image: "/Luis R Conriquez 4x Laredo Texana.png" },
  { productId: "prod_UJ7zJSy3lEOV4q", image: "/Carin Leon 4x Laredo Texana.png" },
  { productId: "prod_UJ7zbtuZZDrrK9", image: "/TOQUILLAS HILO DE PLATA.png" },
  { productId: "prod_UJ7zgBR21T7WyN", image: "/TOQUILLAS HILO DE PLATA.png" },
  { productId: "prod_UJ7z3w2Z7SQ86h", image: "/logo.png" },
  { productId: "prod_UJ7zcqMy8VHPlD", image: "/Espuma limpieza para TEXANA.png" },
]

async function main() {
  console.log(`\n🖼  Actualizando imágenes en ${updates.length} productos de Stripe...\n`)

  for (const { productId, image } of updates) {
    const imageUrl = `${BASE_URL}${encodeURI(image)}`
    try {
      await stripe.products.update(productId, { images: [imageUrl] })
      console.log(`  ✅ ${productId}  →  ${imageUrl}`)
    } catch (err) {
      console.error(`  ❌ ${productId}: ${err.message}`)
    }
  }

  console.log("\n✅ Listo\n")
}

main()
