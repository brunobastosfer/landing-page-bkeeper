import Image from "next/image"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

export function Logo({ className = "", size = "md", showText = false }: LogoProps) {
  const sizes = {
    sm: { circle: 36, icon: 18, pad: 6, nameSize: "text-base", adsSize: "text-[10px]" },
    md: { circle: 44, icon: 22, pad: 7, nameSize: "text-lg", adsSize: "text-xs" },
    lg: { circle: 56, icon: 28, pad: 9, nameSize: "text-xl", adsSize: "text-sm" },
  }
  const s = sizes[size]

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Círculo dourado com a abelha */}
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
          style={{ objectFit: "contain", width: s.icon, height: s.icon }}
        />
      </div>

      {/* Texto sempre visível */}
      <div className="flex flex-col leading-none">
        <span className={`font-black tracking-tight text-foreground ${s.nameSize}`}>
          Bkeeper
        </span>
        <span className={`font-bold tracking-[0.2em] uppercase ${s.adsSize}`} style={{ color: "#E6BF46" }}>
          Ads
        </span>
      </div>
    </div>
  )
}
