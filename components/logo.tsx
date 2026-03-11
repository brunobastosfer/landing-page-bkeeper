import Image from "next/image"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function Logo({ className = "", size = "md" }: LogoProps) {
  const sizes = {
    sm: { height: 32 },
    md: { height: 40 },
    lg: { height: 56 },
  }
  const s = sizes[size]

  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/logo.jpg"
        alt="Bkeeper ADS"
        height={s.height}
        width={s.height * 6}
        priority
        style={{ objectFit: "contain", width: "auto" }}
      />
    </div>
  )
}
