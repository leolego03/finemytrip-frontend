'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react'
import Link from 'next/link'
import { memberApi } from '../lib/api'
import { useAuthStore } from '../lib/auth-store'

interface SigninModalProps {
  open: boolean
  onClose: () => void
}

export default function SigninModal({ open, onClose }: SigninModalProps) {
  const login = useAuthStore((state) => state.login)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      setLoading(true)
      const response = await memberApi.login({
        email,
        password
      })
      
      // Save User Information on Successful Login
      login({
        id: response.id,
        email: response.email,
        token: response.token
      })
      
      // Close modal
      onClose()
      
      // Reset form
      setEmail('')
      setPassword('')
    } catch (error) {
      console.error('Login failed:', error)
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Login failed. Please check your credentials.')
      }
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-[#333]/50 z-50 flex items-center justify-center">
      <div className="bg-white w-[360px] rounded-2xl p-[30px] relative">
        <button
          onClick={onClose}
          className="btn-modal-close absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>

        <div className="member-account mb-[30px] text-center">
          <h1 className="login-slogan font-semibold !font-[SpoqaHanSansNeo-Regular] text-[#333] text-xl leading-snug">
            Start your wonderful trip<br />
            at <em className="not-italic text-[#5997e1]">FINEMYTRIP</em>.
          </h1>
        </div>

        <form className="login-field space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-500 text-sm text-center p-2 bg-red-50 rounded">
              {error}
            </div>
          )}

          <div>
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
              onClick={() => setShowPassword((prev) => !prev)}
              disabled={loading}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-lg text-gray-500 hover:text-gray-700 disabled:opacity-50"
            >
              <i className={`bi ${showPassword ? 'bi-eye' : 'bi-eye-slash'}`} />
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-member-primary w-full bg-[#5997e1] text-base text-white rounded-[5px] p-[11px] disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="join-member font-light text-center text-[13px] mt-[10px] mb-[25px]">
          New to FINEMYTRIP?{' '}

          <Link
            className="underline"
            href="/signup"
            onClick={onClose}
          >
            Quick Sign Up
          </Link>
        </div>

        <p className="login-notice text-xs text-center text-gray-500 my-4">
          By logging in for the first time, you agree to FineMyTrip's Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  )
}
