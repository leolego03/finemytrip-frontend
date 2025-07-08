'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import Image from 'next/image'
import Link from 'next/link'

export interface ProductItem {
  id: number,
  tripType: string
  imgSrc: string
  discountRate?: number
  title: string
  infoGroup: string[]
  prevPrice: number
  currPrice: number
  rating: number
  sold: number
}

interface ProductSlideProps {
  items: ProductItem[]
  title?: string
  viewAllLink?: string
}

export default function ProductSlide({
  items,
  title = 'Real-time popular',
  viewAllLink = '#',
}: ProductSlideProps) {
  return (
    <div className="overflow-hidden mb-[40px]">
      <div className="flex justify-between items-center font-[SpoqaHanSansNeo-Regular] mb-[20px] h-[50px]">
        <h2 className="text-xl font-medium pl-[5px]">{title}</h2>
        <Link href={viewAllLink} className="text-sm text-[#555] underline">
          View all
        </Link>
      </div>

      <div className="relative">
        <div className="w-[480px]">
          <Swiper slidesPerView={3} slidesPerGroup={2} spaceBetween={10} loop>
            {items.map((p) => (
              <SwiperSlide key={p.id}>
                <Link
                  href={`/product-detail/${p.id}`}
                  className="focus-product-item block cursor-pointer"
                >
                  <div className="thum relative w-full h-[120px]">
                    <Image
                      src={p.imgSrc}
                      alt={p.title}
                      width={768}
                      height={500}
                      className="w-full h-full object-cover rounded"
                      priority={p.id === items[0]?.id}
                    />
                    {typeof p.discountRate === 'number' && (
                      <span className="badge discount absolute bottom-2 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-l">
                        {p.discountRate}% Off
                      </span>
                    )}
                  </div>
                  <div className="overview flex flex-col min-h-[95px] mt-[5px]">
                    <h4 className="text-xs font-normal mb-2">{p.title}</h4>
                    <div className="product-info text-[1px] text-[#999] mb-1">
                      {p.infoGroup.join(' · ')}
                    </div>
                    <div className="product-price text-[10px] mb-1 flex items-baseline space-x-2">
                      {typeof p.discountRate === 'number' && (
                        <span className="sale text-[#ed2040]">
                          {p.discountRate}% Off
                        </span>
                      )}
                      <s className="price-prev text-[#bdbdbd]">
                        ₩{p.prevPrice.toLocaleString()}
                      </s>
                      <span className="price-current font-normal">
                        ₩{p.currPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="product-review text-[10px] font-normal flex items-center space-x-1">
                      <span className="stars flex space-x-0.5 text-[#ffd912]">
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-half" />
                      </span>
                      <span
                        className="rating ml-[5px] after:content-['|'] after:text-gray-400 after:text-[10px] after:ml-[5px] after:inline-block after:translate-y-[-2px]"
                      >
                        {p.rating.toFixed(1)}
                      </span>
                      <span className="trainee ml-2">
                        {p.sold.toLocaleString()} Sold
                      </span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}
