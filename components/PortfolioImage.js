"use client"

import { useState } from "react"
import Image from "next/image"
import ImageSkeleton from "./ImageSkeleton"

const PortfolioImage = ({ src, width, height, alt }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    return (
        <>
            {isLoading && (
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    <ImageSkeleton width={width} height={height} />
                </div>
            )}
            <Image
                src={hasError ? src.replace('/_next/image?url=', '').split('&')[0] : src}
                width={width}
                height={height}
                alt={alt}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                    setHasError(true)
                    setIsLoading(false)
                }}
                style={{
                    opacity: isLoading ? 0 : 1,
                    transition: 'opacity 0.3s ease-in-out'
                }}
            />
        </>
    )
}

export default PortfolioImage
