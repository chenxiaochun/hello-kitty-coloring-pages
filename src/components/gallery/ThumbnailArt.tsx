type ThumbnailArtProps = {
  variant: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
};

export function ThumbnailArt({ variant, className = "" }: ThumbnailArtProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="200" height="200" fill="#FFFBF7" rx="16" />
      {variant === 1 && (
        <>
          <ellipse cx="100" cy="118" rx="52" ry="46" fill="none" stroke="#5C4A5A" strokeWidth="3" />
          <circle cx="72" cy="88" r="18" fill="none" stroke="#5C4A5A" strokeWidth="3" />
          <circle cx="128" cy="88" r="18" fill="none" stroke="#5C4A5A" strokeWidth="3" />
          <path d="M55 78 C45 40, 75 35, 88 62" fill="none" stroke="#5C4A5A" strokeWidth="3" />
          <path d="M145 78 C155 40, 125 35, 112 62" fill="none" stroke="#5C4A5A" strokeWidth="3" />
          <ellipse cx="100" cy="52" rx="22" ry="14" fill="none" stroke="#E84C6F" strokeWidth="3" />
          <circle cx="100" cy="52" r="6" fill="none" stroke="#E84C6F" strokeWidth="2" />
        </>
      )}
      {variant === 2 && (
        <>
          <path d="M30 150 Q100 120 170 150" fill="none" stroke="#5C4A5A" strokeWidth="3" />
          <circle cx="70" cy="130" r="8" fill="none" stroke="#5C4A5A" strokeWidth="2" />
          <circle cx="130" cy="125" r="10" fill="none" stroke="#5C4A5A" strokeWidth="2" />
          <ellipse cx="100" cy="95" rx="40" ry="36" fill="none" stroke="#5C4A5A" strokeWidth="3" />
          <ellipse cx="100" cy="42" rx="18" ry="12" fill="none" stroke="#FF6B9D" strokeWidth="3" />
        </>
      )}
      {variant === 3 && (
        <>
          <ellipse cx="75" cy="110" rx="32" ry="28" fill="none" stroke="#5C4A5A" strokeWidth="3" />
          <ellipse cx="125" cy="110" rx="32" ry="28" fill="none" stroke="#5C4A5A" strokeWidth="3" />
          <ellipse cx="75" cy="48" rx="14" ry="9" fill="none" stroke="#7EC8E3" strokeWidth="2" />
          <ellipse cx="125" cy="48" rx="14" ry="9" fill="none" stroke="#C9A0FF" strokeWidth="2" />
          <path d="M95 120 L105 120" stroke="#5C4A5A" strokeWidth="3" strokeLinecap="round" />
        </>
      )}
      {variant === 4 && (
        <>
          <rect x="55" y="120" width="90" height="40" rx="8" fill="none" stroke="#5C4A5A" strokeWidth="3" />
          <ellipse cx="100" cy="88" rx="38" ry="34" fill="none" stroke="#5C4A5A" strokeWidth="3" />
          <path d="M70 70 L55 45 M130 70 L145 45" stroke="#5C4A5A" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="100" cy="38" rx="16" ry="10" fill="none" stroke="#FFD166" strokeWidth="3" />
        </>
      )}
      {variant === 5 && (
        <>
          <polygon points="100,30 115,70 155,70 122,95 133,135 100,110 67,135 78,95 45,70 85,70" fill="none" stroke="#FFD166" strokeWidth="3" />
          <ellipse cx="100" cy="118" rx="44" ry="40" fill="none" stroke="#5C4A5A" strokeWidth="3" />
          <ellipse cx="100" cy="62" rx="20" ry="12" fill="none" stroke="#E84C6F" strokeWidth="3" />
        </>
      )}
      {variant === 6 && (
        <>
          <ellipse cx="100" cy="130" rx="60" ry="18" fill="none" stroke="#5C4A5A" strokeWidth="3" />
          <rect x="62" y="108" width="76" height="14" rx="7" fill="none" stroke="#5C4A5A" strokeWidth="2" />
          <ellipse cx="100" cy="82" rx="36" ry="32" fill="none" stroke="#5C4A5A" strokeWidth="3" />
          <ellipse cx="100" cy="36" rx="18" ry="11" fill="none" stroke="#FF6B9D" strokeWidth="3" />
          <path d="M78 108 C85 98, 115 98, 122 108" fill="none" stroke="#5C4A5A" strokeWidth="2" />
        </>
      )}
    </svg>
  );
}
