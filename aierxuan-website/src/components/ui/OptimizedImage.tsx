'use client'

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps extends Omit<ImageProps, 'onError'> {
  fallback?: string
}

export function OptimizedImage({
  src,
  alt,
  fallback = '/placeholder-product.svg',
  className = '',
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)

  return (
    <Image
      src={imgSrc}
      alt={alt}
      className={`${className} ${isLoading ? 'blur-sm' : 'blur-0'} transition-all duration-300`}
      onLoad={() => setIsLoading(false)}
      onError={() => setImgSrc(fallback)}
      {...props}
    />
  )
}
