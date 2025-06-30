'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import SigninModal from '../../components/SigninModal'
import { memberApi } from '../../lib/api'

export default function SignupPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [agreed, setAgreed] = useState(false)

  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validation
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    if (!agreed) {
      setError('Please agree to the terms and conditions')
      return
    }

    try {
      setLoading(true)
      await memberApi.register({
        email,
        password,
        marketingAgreed: agreed
      })
      
      // Redirect to main page after successful registration
      router.push('/')
    } catch (error) {
      console.error('Registration failed:', error)
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Registration failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="flex justify-center items-center py-[35px] px-[10px]">
        <div className="w-[360px]">
          <div className="member-account mb-[30px] text-center">
            <h1 className="login-slogan font-semibold !font-[SpoqaHanSansNeo-Regular] text-[#333] text-xl leading-snug">
              Start your wonderful trip<br />
              at <em className="not-italic text-[#5997e1]">FINEMYTRIP</em>.
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="text-red-500 text-sm text-center p-2 bg-red-50 rounded">
                {error}
              </div>
            )}

            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                autoComplete="off"
                required
                disabled={loading}
                className="w-full border border-gray-300 rounded-[5px] p-[13px] placeholder:text-[#bdbdbd] focus:outline-none focus:border-[#5997e1] disabled:bg-gray-100"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                maxLength={12}
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                autoComplete="off"
                required
                disabled={loading}
                className="w-full border border-gray-300 rounded-[5px] p-[13px] pr-10 placeholder:text-[#bdbdbd] focus:outline-none focus:border-[#5997e1] disabled:bg-gray-100"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                disabled={loading}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-lg text-gray-500 hover:text-gray-700 disabled:opacity-50"
              >
                <i className={`bi ${showPassword ? 'bi-eye' : 'bi-eye-slash'}`} />
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder="Check the password"
                maxLength={12}
                value={confirm}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirm(e.target.value)}
                autoComplete="off"
                required
                disabled={loading}
                className="w-full border border-gray-300 rounded-[5px] p-[13px] pr-10 placeholder:text-[#bdbdbd] focus:outline-none focus:border-[#5997e1] disabled:bg-gray-100"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(prev => !prev)}
                disabled={loading}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-lg text-gray-500 hover:text-gray-700 disabled:opacity-50"
              >
                <i className={`bi ${showConfirm ? 'bi-eye' : 'bi-eye-slash'}`} />
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#5997e1] text-white rounded-[5px] p-[11px] text-base disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing up...' : 'Sign up'}
            </button>
          </form>

          <div className="mt-6 text-center text-[12px] text-gray-500 border-t border-gray-300 pt-6">
            <p className="mb-4">
              By creating a single account, you'll have access to all services provided by FINEMYTRIP.
              I agree to the terms of service and privacy policy.
            </p>
            <label className="cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={() => setAgreed(a => !a)}
                className="sr-only"
              />
              <em className="w-4 h-4 inline-block mr-2 text-gray-500">
                <i className={`bi ${agreed ? 'bi-check-square-fill' : 'bi-square'}`} />
              </em>
              I agree to receive discount offers and marketing information.
            </label>
          </div>

          <div className="mt-6 text-center text-[13px] text-[#555555]">
            Already have an account?{' '}

            <button
              onClick={() => setModalOpen(true)}
              className="underline text-[#5997e1]"
            >
              Sign in
            </button>
          </div>
        </div>
      </section>

      <SigninModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
