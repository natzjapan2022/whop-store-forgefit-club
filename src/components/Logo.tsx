'use client'

import { Dumbbell } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { siteConfig } from '@/lib/config'

interface LogoProps {
  className?: string
  showText?: boolean
}

export default function Logo({ className = '', showText = true }: LogoProps) {
  const [imageError, setImageError] = useState(false)
  const [svgError, setSvgError] = useState(false)

  if (!imageError) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <Image
          src={siteConfig.logo}
          alt={`${siteConfig.name} Logo`}
          width={40}
          height={40}
          className="w-10 h-10"
          onError={() => setImageError(true)}
        />
        {showText && (
          <span className="text-xl font-bold gradient-text">
            {siteConfig.name}
          </span>
        )}
      </div>
    )
  }

  if (!svgError) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <Image
          src={siteConfig.fallbackLogo}
          alt={`${siteConfig.name} Logo`}
          width={40}
          height={40}
          className="w-10 h-10"
          onError={() => setSvgError(true)}
        />
        {showText && (
          <span className="text-xl font-bold gradient-text">
            {siteConfig.name}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
        <Dumbbell className="w-6 h-6 text-white" />
      </div>
      {showText && (
        <span className="text-xl font-bold gradient-text">
          {siteConfig.name}
        </span>
      )}
    </div>
  )
}