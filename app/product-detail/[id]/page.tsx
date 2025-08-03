'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { productApi, ProductItem } from '../../../lib/api'
import { getStarTypes } from '../../../utils/getStarTypes'

export default function ProductDetailPage() {
  const params = useParams()
  const productId = Number(params.id)
  
  const [productDetail, setProductDetail] = useState<ProductItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cartConfirmed, setCartConfirmed] = useState(false)

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true)
        const product = await productApi.getById(productId)
        
        // Modify image URL
        const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'
        const updatedProduct = {
          ...product,
          imgSrc: product.imgSrc.startsWith('/uploads/') 
            ? `${backendUrl}${product.imgSrc}`
            : product.imgSrc
        }
        
        setProductDetail(updatedProduct)
      } catch (error) {
        console.error('Error getting product details data:', error)
        setError('Failed to load product details')
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      fetchProductDetail()
    }
  }, [productId])

  const handleAddCart = () => setCartConfirmed(true)
  const handleCloseConfirm = () => setCartConfirmed(false)

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (error || !productDetail) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-500">{error || 'Product not found'}</div>
      </div>
    )
  }

  return (
    <>
      <section
        className="product-detail-image bg-cover bg-center"
        style={{ backgroundImage: `url(${productDetail.imgSrc})` }}
      >
        <div className="product-detail-image-inner flex flex-col items-center pt-8">
          <div className="cover-image w-full">
            <Image
              src="/images/ct-product-detail-main-02.png"
              alt={productDetail.title}
              width={800}
              height={450}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </section>

      <section className="product-detail-full bg-gray-100">
        <div className="product-detail-full-inner">
          <div className="product-detail-full-content flex flex-col-reverse gap-8">
            <div className="product-detail-sidebar bg-white p-3 w-full">
              <div className="group-required-info mb-6">
                <div className="hash-tag-group text-sm mb-2">
                  {productDetail.infoGroup.map((tag) => `#${tag}`).join(' ')}
                </div>
                <div className="badge-group flex flex-wrap gap-2 text-xs mb-4">
                  <span className="badge-product-required bg-gray-200 px-2 py-1 rounded focus:text-red-600">Limited-Time discount</span>
                  <span className="badge-product-required bg-gray-200 px-2 py-1 rounded">Personalized travel service</span>
                  <span className="badge-product-required bg-gray-200 px-2 py-1 rounded focus:text-red-600">Booking service</span>
                </div>
                <div className="overview">
                  <h4 className="text-lg font-medium mb-4">
                    {productDetail.title}
                  </h4>
                  <div className="product-review flex items-center text-sm mb-3">
                    <span className="stars flex space-x-0.5 text-yellow-400 mr-2">
                      {getStarTypes(productDetail.rating).map((starType, index) => (
                        <i
                          key={`start-icon-${index}`}
                          className={`bi ${
                            starType === 'full'
                              ? 'bi-star-fill'
                              : starType === 'half'
                              ? 'bi-star-half'
                              : 'bi-star'
                          }`}
                        />
                      ))}
                    </span>
                    <span className="rating mr-2">{productDetail.rating.toFixed(1)}</span>
                    <span className="trainee text-gray-500">{productDetail.sold.toLocaleString()} Sold</span>
                  </div>
                  <div className="product-price flex justify-end items-baseline text-base mb-2">
                    {productDetail.discountRate && (
                      <span className="sale text-red-500 mr-6">{productDetail.discountRate}% Off</span>
                    )}
                    <span className="price-current font-semibold mr-8">₩{productDetail.currPrice.toLocaleString()}</span>
                    <s className="price-prev text-gray-400">₩{productDetail.prevPrice.toLocaleString()}</s>
                  </div>
                  <div className="product-installment text-right text-sm">
                    <span className="installment-price font-semibold mr-10">₩{(productDetail.currPrice / 5).toLocaleString()}/month</span>
                    <span className="installment-info text-gray-500">5-month installments</span>
                  </div>
                </div>
              </div>

              <div className="group-main-action border-t border-b border-gray-200 py-6 mb-6">
                <Link
                  href="/"
                  className="btn-primary btn-register block w-full bg-blue-200 text-white py-2 rounded mb-4 text-center"
                >
                  Book now
                </Link>
                <div className="cart-confirm-wrap relative">
                  <button
                    onClick={handleAddCart}
                    className="btn-primary btn-cart block w-full bg-[#5997e1] text-white py-2 rounded text-center"
                  >
                    Add to cart
                  </button>
                  {cartConfirmed && (
                    <div className="cart-confirm absolute w-full bottom-full mb-2 bg-white border border-blue-800 rounded p-4 text-center">
                      <button
                        onClick={handleCloseConfirm}
                        className="btn-close absolute top-1 right-1 text-lg text-gray-500 hover:text-gray-700"
                      >
                        &times;
                      </button>
                      <span className="block mb-2 text-sm">Item added to cart.</span>
                      <Link
                        href="/"
                        className="btn-cart-check inline-block border border-blue-800 text-blue-800 py-1 px-3 rounded text-sm"
                      >
                        View cart
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              <div className="group-sub-action flex gap-2 mb-6">
                <button className="btn-sidebar-badge flex-1 flex items-center justify-center bg-gray-100 py-2 rounded text-sm">
                  <i className="bi bi-heart text-gray-400 mr-1"></i>326
                </button>
                <button className="btn-sidebar-badge flex-1 flex items-center justify-center bg-gray-100 py-2 rounded text-sm">
                  <i className="bi bi-box2-heart text-gray-400 mr-1"></i>Gift
                </button>
                <button className="btn-sidebar-badge share flex-1 flex items-center justify-center bg-gray-100 py-2 rounded text-sm">
                  <i className="bi bi-share text-gray-400 mr-1"></i>Share
                </button>
              </div>

              <div className="group-agency-summary mb-6">
                <div className="agency-product-summary flex items-center">
                  <div className="agency-avatar w-10 h-10 mr-4">
                    <Image
                      src="/images/profile-avatar-04.png"
                      alt="Agency"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <ul className="product-summary-list list-none pl-5 text-sm space-y-1">
                    <li>Travel Agency: FINETRIP</li>
                    <li>Duration: 4 days · 14 hours 30 minutes</li>
                    <li>France: Paris</li>
                    <li>Guided Tour: Paris</li>
                  </ul>
                </div>
              </div>

              <Link
                href="/"
                className="btn-agency-follow block border border-pink-500 text-pink-500 py-2 rounded text-center mb-4"
              >
                <i className="bi bi-person-plus mr-1"></i>Follow Travel Agency
              </Link>
              <Link
                href="/"
                className="btn-inquire block text-center text-base text-gray-700"
              >
                <i className="bi bi-chat-left-text mr-1"></i>1:1 Inquiry Before Booking
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
