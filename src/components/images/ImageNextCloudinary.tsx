'use client'

import { CldImage, CldImageProps } from 'next-cloudinary'

interface NextCloudinaryImageProps extends Omit<CldImageProps, 'src'> {
  alt: string
  width: number
  height: number
  src: string
  crop?: 'fill' | 'crop' | 'scale' | 'thumb' | 'fit' | 'fill_pad'
  gravity?: 'auto' | 'face' | 'center' | 'north' | 'south' | 'east' | 'west'
  sizes?: string
  priority?: boolean
}

const NextCloudinaryImage = ({
  alt,
  width,
  height,
  src,
  crop = 'fill',
  gravity,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false,
  className,
  ...props
}: NextCloudinaryImageProps) => {
  const baseConfig = {
    src,
    alt,
    width,
    height,
    crop,
    gravity,
    loading: priority ? ('eager' as 'eager') : ('lazy' as 'lazy'),
    quality: 'auto',
    format: 'auto',
    sizes,
    className,
    dpr: 'auto',
    fetchFormat: 'auto',
    minimumQuality: 80,
    preventLazyLoad: priority,
  }

  return <CldImage {...baseConfig} {...props} />
}

export default NextCloudinaryImage
