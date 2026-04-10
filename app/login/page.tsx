"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, LogIn } from "lucide-react"
import { Suspense } from "react"

function LoginForm() {
  const { signIn } = useAuth()
  const { locale } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirect") || "/shop"
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const t = (es: string, en: string) => locale === "en" ? en : es

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    const { error } = await signIn(email, password)
    setLoading(false)
    if (error) {
      setError(t("Correo o contraseña incorrectos.", "Invalid email or password."))
    } else {
      router.push(redirectTo)
    }
  }

  return (
    <div className="min-h-screen overflow-y-auto bg-gradient-to-br from-[#f5ebe0] via-[#faf3ed] to-[#e8ddd0] flex items-center justify-center px-4 pb-32 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <img src="/logo.png" alt="Estilo Vaquero" className="mx-auto h-24 w-auto mb-4" />
          <h1 className="font-serif text-3xl font-bold text-[#3d2c29]">
            {t("Iniciar Sesión", "Sign In")}
          </h1>
          <p className="mt-2 text-[#3d2c29]/60">
            {t("Accede a tu cuenta para comprar", "Sign in to your account to shop")}
          </p>
        </div>

        <div className="rounded-3xl border-2 border-[#d4a5a5]/30 bg-white/70 p-8 backdrop-blur-sm shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#3d2c29]">
                {t("Correo electrónico", "Email")}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border-2 border-[#d4a5a5]/30 bg-[#faf3ed]/60 px-4 py-3 text-[#3d2c29] outline-none transition focus:border-[#d4a5a5] focus:ring-2 focus:ring-[#d4a5a5]/20"
                placeholder="hola@ejemplo.com"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#3d2c29]">
                {t("Contraseña", "Password")}
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border-2 border-[#d4a5a5]/30 bg-[#faf3ed]/60 px-4 py-3 pr-12 text-[#3d2c29] outline-none transition focus:border-[#d4a5a5] focus:ring-2 focus:ring-[#d4a5a5]/20"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3d2c29]/40 hover:text-[#3d2c29]"
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl bg-red-50 px-4 py-2 text-sm text-red-600"
              >
                {error}
              </motion.p>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#d4a5a5] py-3.5 font-semibold text-white shadow-lg transition hover:bg-[#c89b9b] disabled:opacity-60"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <LogIn className="h-4 w-4" />
              {loading ? t("Entrando...", "Signing in...") : t("Entrar", "Sign In")}
            </motion.button>
          </form>

          <div className="mt-6 text-center text-sm text-[#3d2c29]/60">
            {t("¿No tienes cuenta?", "Don't have an account?")}{" "}
            <Link href="/register" className="font-semibold text-[#d4a5a5] hover:underline">
              {t("Regístrate", "Register")}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
