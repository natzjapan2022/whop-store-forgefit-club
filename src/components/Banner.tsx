'use client'

import Image from 'next/image'
import { useState } from 'react'

interface BannerProps {
  className?: string
  alt?: string
  priority?: boolean
  height?: 'small' | 'medium' | 'large'
}

export default function Banner({
  className = '',
  alt = 'ForgeFit Club Banner',
  priority = false,
  height = 'medium'
}: BannerProps) {
  const [imageError, setImageError] = useState(false)

  const heightClasses = {
    small: 'h-48',
    medium: 'h-64',
    large: 'h-80'
  }

  if (imageError) {
    // Fallback gradient banner if image fails to load
    return (
      <div className={`w-full ${heightClasses[height]} bg-gradient-to-r from-red-900 via-black to-red-900 flex items-center justify-center rounded-lg shadow-lg ${className}`}>
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-2">ForgeFit Club</h2>
          <p className="text-gray-300">Transform Your Body. Forge Your Strength.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative w-full ${heightClasses[height]} overflow-hidden rounded-lg shadow-lg ${className}`}>
      <Image
        src="/banner.png"
        alt={alt}
        fill
        className="object-cover"
        priority={priority}
        onError={() => setImageError(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/60 rounded-lg" />
    </div>
  )
}