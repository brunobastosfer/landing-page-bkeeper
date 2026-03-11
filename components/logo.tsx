import Image from "next/image"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

export function Logo({ className = "", size = "md", showText = false }: LogoProps) {
  const sizes = {
    sm: { circle: 36, icon: 24 },
    md: { circle: 44, icon: 28 },
    lg: { circle: 56, icon: 36 },
  }
  const s = sizes[size]

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Círculo com cor secundária */}
      <div
        className="flex items-center justify-center flex-shrink-0"
        style={{
          width: s.circle,
          height: s.circle,
          borderRadius: "50%",
          backgroundColor: "#1a1a1a",
        }}
      >
        <Image
          src="/bee-icon.png"
          alt="Bkeeper ADS"
          height={s.icon}
          width={s.icon}
          priority
          style={{ objectFit: "contain", width: "auto", height: "auto" }}
        />
      </div>
      
      {showText && (
        <span className="font-black tracking-tight text-foreground text-lg">
          Bkeeper <span style={{ color: "#E6BF46" }}>ADS</span>
        </span>
      )}
    </div>
  )
}
