'use client'

import { CldImage, CldImageProps } from 'next-cloudinary'

type NextCloudinaryImageProps = CldImageProps & {
  alt: string
  width: number
  height: number
  src: string
}

const NextCloudinaryImage = ({
  alt,
  width,
  height,
  src,
  ...props
}: NextCloudinaryImageProps) => {
  return (
    <CldImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      sizes="(min-width: 480px ) 50vw, (min-width: 728px) 33vw, (min-width: 976px) 25vw, 100vw" //TODO: Better responsive sizes
      //   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      {...props}
    />
  )
}

export default NextCloudinaryImage