"use client"

import ContentLoader from "react-content-loader"

const ImageSkeleton = ({ width = 370, height = 277 }) => (
    <ContentLoader
        speed={2}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="0" y="0" rx="4" ry="4" width={width} height={height} />
    </ContentLoader>
)

export default ImageSkeleton
