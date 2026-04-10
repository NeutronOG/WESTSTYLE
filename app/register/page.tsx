"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, UserPlus } from "lucide-react"

export default function RegisterPage() {
  const { signUp } = useAuth()
  const { locale } = useLanguage()
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const t = (es: string, en: string) => locale === "en" ? en : es

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (password !== confirm) {
      setError(t("Las contraseñas no coinciden.", "Passwords do not match."))
      return
    }
    if (password.length < 6) {
      setError(t("La contraseña debe tener al menos 6 caracteres.", "Password must be at least 6 characters."))
      return
    }
    setLoading(true)
    const { error } = await signUp(email, password, name)
    setLoading(false)
    if (error) {
      setError(error)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5ebe0] via-[#faf3ed] to-[#e8ddd0] px-4 pb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md rounded-3xl border-2 border-[#d4a5a5]/30 bg-white/70 p-10 text-center shadow-xl backdrop-blur-sm"
        >
          <div className="mb-4 text-5xl">🎉</div>
          <h2 className="font-serif text-2xl font-bold text-[#3d2c29]">
            {t("¡Cuenta creada!", "Account created!")}
          </h2>
          <p className="mt-3 text-[#3d2c29]/70">
            {t("Revisa tu correo para confirmar tu cuenta, luego inicia sesión.", "Check your email to confirm your account, then sign in.")}
          </p>
          <Link
            href="/login"
            className="mt-6 inline-block rounded-2xl bg-[#d4a5a5] px-8 py-3 font-semibold text-white hover:bg-[#c89b9b]"
          >
            {t("Ir al login", "Go to login")}
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen overflow-y-auto bg-gradient-to-br from-[#f5ebe0] via-[#faf3ed] to-[#e8ddd0] flex items-center justify-center px-4 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <img src="/logo.png" alt="Estilo Vaquero" className="mx-auto h-24 w-auto mb-4" />
          <h1 className="font-serif text-3xl font-bold text-[#3d2c29]">
            {t("Crear Cuenta", "Create Account")}
          </h1>
          <p className="mt-2 text-[#3d2c29]/60">
            {t("Únete para comprar en Estilo Vaquero", "Join to shop at Estilo Vaquero")}
          </p>
        </div>

        <div className="rounded-3xl border-2 border-[#d4a5a5]/30 bg-white/70 p-8 backdrop-blur-sm shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#3d2c29]">
                {t("Nombre completo", "Full name")}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border-2 border-[#d4a5a5]/30 bg-[#faf3ed]/60 px-4 py-3 text-[#3d2c29] outline-none transition focus:border-[#d4a5a5] focus:ring-2 focus:ring-[#d4a5a5]/20"
                placeholder={t("Juan Pérez", "John Smith")}
              />
            </div>

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

            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#3d2c29]">
                {t("Confirmar contraseña", "Confirm password")}
              </label>
              <input
                type={showPass ? "text" : "password"}
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full rounded-2xl border-2 border-[#d4a5a5]/30 bg-[#faf3ed]/60 px-4 py-3 text-[#3d2c29] outline-none transition focus:border-[#d4a5a5] focus:ring-2 focus:ring-[#d4a5a5]/20"
                placeholder="••••••••"
              />
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
              <UserPlus className="h-4 w-4" />
              {loading ? t("Creando cuenta...", "Creating account...") : t("Crear Cuenta", "Create Account")}
            </motion.button>
          </form>

          <div className="mt-6 text-center text-sm text-[#3d2c29]/60">
            {t("¿Ya tienes cuenta?", "Already have an account?")}{" "}
            <Link href="/login" className="font-semibold text-[#d4a5a5] hover:underline">
              {t("Inicia sesión", "Sign in")}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
