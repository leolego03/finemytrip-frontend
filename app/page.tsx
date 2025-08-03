'use client'

import { useEffect, useState } from 'react'
import MainSlide from '../components/MainSlide'
import CategoryShortcut from '../components/CategoryShortcut'
import ProductSlide, { ProductItem } from '../components/ProductSlide'
import { productApi, ProductItem as ApiProductItem } from '../lib/api'

export default function Home() {
  const [overseasTrip, setOverseasTrip] = useState<ProductItem[]>([])
  const [domesticTrip, setDomesticTrip] = useState<ProductItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const fetchProducts = async () => {
      try {
        setError(null)
        const products = await productApi.getAll()
        
        // Sort by sold value in descending order
        const sortedProducts = products.sort((a, b) => b.sold - a.sold)
        
        // Get backend server URL
        const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'
        
        // Sort by tripType and modify image URL
        const overseas = sortedProducts
          .filter(product => product.tripType === 'overseas')
          .map(product => ({
            ...product,
            imgSrc: product.imgSrc 
              ? (product.imgSrc.startsWith('/uploads/') 
                ? `${backendUrl}${product.imgSrc}`
                : product.imgSrc)
              : null
          }))
        
        const domestic = sortedProducts
          .filter(product => product.tripType === 'domestic')
          .map(product => ({
            ...product,
            imgSrc: product.imgSrc 
              ? (product.imgSrc.startsWith('/uploads/') 
                ? `${backendUrl}${product.imgSrc}`
                : product.imgSrc)
              : null
          }))
        
        setOverseasTrip(overseas)
        setDomesticTrip(domestic)
      } catch (error) {
        console.error('Error getting product data:', error)
        setError(error instanceof Error ? error.message : 'Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [mounted])

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-2">Failed to load products</p>
          <p className="text-sm text-gray-500">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <section className="relative w-full h-[405px]">
        <MainSlide />
      </section>

      <section className="py-[35px] px-[10px]">
        <CategoryShortcut />
      </section>

      <section className="py-[35px] px-[10px] bg-[#f9f9f9]">
        <div>
          <ProductSlide
            items={overseasTrip}
            title="Real-time popular"
            viewAllLink="/"
          />

          <ProductSlide
            items={domesticTrip}
            title="Nationwide popular"
            viewAllLink="/"
          />
        </div>
      </section>
    </>
  );
}
