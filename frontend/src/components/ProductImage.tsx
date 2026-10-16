import { useState } from "react";

interface ProductImageProps {
  src?: string;
  alt: string;
  height?: number | string;
  style?: React.CSSProperties;
}

const FALLBACK = "data:image/svg+xml;utf8," + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <rect width="400" height="400" fill="#f5f5f5"/>
  <text x="50%" y="45%" font-family="Arial" font-size="60" fill="#cccccc" text-anchor="middle">📦</text>
  <text x="50%" y="58%" font-family="Arial" font-size="18" fill="#999999" text-anchor="middle">No Image</text>
</svg>
`);

export default function ProductImage({ src, alt, height = 200, style }: ProductImageProps) {
  const [error, setError] = useState(false);
  const finalSrc = error || !src ? FALLBACK : src;

  return (
    <img
      src={finalSrc}
      alt={alt}
      onError={() => setError(true)}
      style={{
        width: "100%",
        height,
        objectFit: "contain",
        background: "#f9f9f9",
        padding: 8,
        borderRadius: 4,
        ...style,
      }}
    />
  );
}