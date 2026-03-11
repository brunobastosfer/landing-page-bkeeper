interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function Logo({ className = "", size = "md" }: LogoProps) {
  const sizes = {
    sm: { hex: 28, text: "text-lg" },
    md: { hex: 36, text: "text-2xl" },
    lg: { hex: 48, text: "text-3xl" },
  }
  const s = sizes[size]

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width={s.hex}
        height={s.hex}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <polygon
          points="24,2 44,13 44,35 24,46 4,35 4,13"
          fill="#E6BF46"
          fillOpacity="0.12"
          stroke="#E6BF46"
          strokeWidth="1.5"
        />
        <polygon
          points="24,9 37,16 37,30 24,37 11,30 11,16"
          fill="#E6BF46"
          fillOpacity="0.18"
        />
        <text
          x="24"
          y="26"
          fontFamily="Arial, sans-serif"
          fontSize="16"
          fontWeight="900"
          fill="#E6BF46"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          B
        </text>
      </svg>
      <span className={`font-black tracking-tight text-foreground ${s.text}`}>
        Bkeeper <span style={{ color: "#E6BF46" }}>ADS</span>
      </span>
    </div>
  )
}
