interface LogoProps {
  className?: string
  size?: number
}

export function BeeIcon({ size = 40, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Body */}
      <ellipse cx="32" cy="38" rx="11" ry="15" fill="#E6BF46" />
      {/* Stripes */}
      <rect x="21" y="34" width="22" height="5" rx="1.5" fill="#080808" opacity="0.65" />
      <rect x="21" y="42" width="22" height="5" rx="1.5" fill="#080808" opacity="0.65" />
      {/* Head */}
      <circle cx="32" cy="22" r="8" fill="#E6BF46" />
      {/* Antennae */}
      <line x1="28" y1="15" x2="23" y2="8" stroke="#E6BF46" strokeWidth="2" strokeLinecap="round" />
      <circle cx="22.5" cy="7" r="2.5" fill="#E6BF46" />
      <line x1="36" y1="15" x2="41" y2="8" stroke="#E6BF46" strokeWidth="2" strokeLinecap="round" />
      <circle cx="41.5" cy="7" r="2.5" fill="#E6BF46" />
      {/* Wings */}
      <ellipse cx="18" cy="28" rx="9" ry="6" fill="white" opacity="0.2" transform="rotate(-25 18 28)" />
      <ellipse cx="46" cy="28" rx="9" ry="6" fill="white" opacity="0.2" transform="rotate(25 46 28)" />
      {/* Eyes */}
      <circle cx="29" cy="21" r="2" fill="#080808" />
      <circle cx="35" cy="21" r="2" fill="#080808" />
      {/* Stinger */}
      <path d="M32 52 L29 58 L32 55 L35 58 Z" fill="#c9a83a" />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className ?? ''}`}>
      <BeeIcon size={36} />
      <div className="flex flex-col leading-none">
        <span className="text-foreground font-bold text-lg tracking-tight">bkeeper</span>
        <span className="text-gold font-black text-xs tracking-widest uppercase">ADS</span>
      </div>
    </div>
  )
}
