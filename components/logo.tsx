import Image from "next/image"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

export function Logo({ className = "", size = "md", showText = false }: LogoProps) {
  const sizes = {
    sm: { circle: 36, icon: 18, pad: 6 },
    md: { circle: 52, icon: 26, pad: 8 },
    lg: { circle: 64, icon: 32, pad: 10 },
  }
  const s = sizes[size]

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Círculo com cor primária (dourado) */}
      <div
        className="flex items-center justify-center flex-shrink-0"
        style={{
          width: s.circle,
          height: s.circle,
          borderRadius: "50%",
          backgroundColor: "#E6BF46",
          padding: s.pad,
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
        <div className="flex flex-col leading-tight">
          <span className="font-black tracking-tight text-foreground text-lg">
            Bkeeper
          </span>
          <span className="font-black tracking-tight text-sm" style={{ color: "#E6BF46" }}>
            ADS
          </span>
        </div>
      )}
    </div>
  )
}
