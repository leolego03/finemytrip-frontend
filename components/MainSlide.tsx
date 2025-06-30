'use client'

import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Parallax } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/parallax'
import 'swiper/css/autoplay'
import Image from 'next/image'
import Link from 'next/link'
import { mainSlideApi, SlideItem } from '@/lib/api'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'

export default function MainSlide() {
  const [slides, setSlides] = useState<SlideItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        setLoading(true)
        const data = await mainSlideApi.getAll()
        setSlides(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load slide')
        console.error('Error fetching slides:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSlides()
  }, [])

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading slides...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Failed to load slides.</p>
          <p className="text-sm text-gray-500 mt-1">{error}</p>
        </div>
      </div>
    )
  }

  if (slides.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No slides to display.</p>
        </div>
      </div>
    )
  }

  return (
    <Swiper
      modules={[Autoplay, Parallax]}
      speed={1200}
      parallax={true}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
      className="h-full"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <Link
            href={slide.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative w-full h-full overflow-hidden"
          >
            <div
              className="absolute top-0 left-0 w-full h-full bg-center bg-cover"
              style={{ backgroundImage: `url(${API_BASE_URL}${slide.bgSrc})` }}
              data-swiper-parallax="30%"
            />

            <div className="relative flex flex-col justify-between items-center w-full max-w-[1160px] h-[414px] mx-auto">
              <div
                className="mt-5 text-center whitespace-pre-line"
                data-swiper-parallax="10%"
              >
                <b className="text-left text-base font-normal text-red-600 block mb-[5px]">
                  {slide.title}
                </b>
                <h1 className="text-left text-2xl text-white mb-[5px]">
                  {slide.headline.replace(/\\n/g, '\n')}
                </h1>
                <span className="block text-left text-sm text-white">{slide.date}</span>
              </div>
              <div className="mt-5" data-swiper-parallax="-20%">
                <Image
                  src={`${API_BASE_URL}${slide.imgSrc}`}
                  alt={slide.imgAlt}
                  width={614}
                  height={498}
                  className="object-contain w-auto h-[249px]"
                  priority={slide.id === slides[0]?.id}
                />
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
