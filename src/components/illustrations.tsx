type P = { className?: string };

export const TShirt = ({ className }: P) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
    <path
      d="M35 18 22 28l-10 16 14 8 6-8v40h36V44l6 8 14-8-10-16-13-10-8 8H43l-8-8z"
      fill="#fff"
      stroke="#1a1a1a"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <path d="M43 26c2 5 12 5 14 0" fill="none" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <circle cx="50" cy="52" r="9" fill="#e8352b" />
  </svg>
);

export const Hoodie = ({ className }: P) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
    <path
      d="M36 22 24 32l-9 17 13 7 6-8v36h32V48l6 8 13-7-9-17-12-10-9 6H45l-9-6z"
      fill="#3f7fbf"
      stroke="#1a1a1a"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <path d="M42 30c1 8 15 8 16 0" fill="none" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <path d="M46 34v10M54 34v10" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
    <rect x="40" y="62" width="20" height="14" rx="4" fill="#2f5f8f" />
  </svg>
);

export const ToteBag = ({ className }: P) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
    <path
      d="M28 36h44l5 52H23l5-52z"
      fill="#f2e3c9"
      stroke="#1a1a1a"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <path
      d="M38 36V26c0-8 5-13 12-13s12 5 12 13v10"
      fill="none"
      stroke="#1a1a1a"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <circle cx="50" cy="60" r="10" fill="none" stroke="#e8352b" strokeWidth="3" />
    <path d="M50 54v12M44 60h12" stroke="#e8352b" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const Mug = ({ className }: P) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
    <rect x="24" y="28" width="44" height="52" rx="7" fill="#fff" stroke="#1a1a1a" strokeWidth="3" />
    <path
      d="M68 38h8a10 10 0 0 1 0 26h-9"
      fill="none"
      stroke="#1a1a1a"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <rect x="24" y="28" width="44" height="14" rx="7" fill="#e8352b" stroke="#1a1a1a" strokeWidth="3" />
    <path d="M36 56l6 6 10-12" fill="none" stroke="#2679f3" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const PhoneCase = ({ className }: P) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
    <rect x="32" y="12" width="36" height="76" rx="10" fill="#fff" stroke="#1a1a1a" strokeWidth="3" />
    <rect x="38" y="18" width="14" height="10" rx="4" fill="#1a1a1a" />
    <path d="M38 60c6-14 18-18 24-8 4 8-4 18-12 14s-8-16 0-18" fill="none" stroke="#ff8a5c" strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

export const Leggings = ({ className }: P) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
    <path
      d="M34 14h32l3 30-4 44H52l-2-36-2 36H35l-4-44 3-30z"
      fill="#fff"
      stroke="#1a1a1a"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <path d="M34 22h32" stroke="#1a1a1a" strokeWidth="3" />
    <path d="M38 34h9M56 50h9M40 66h8" stroke="#2679f3" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const BusinessCards = ({ className }: P) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
    <rect x="30" y="22" width="52" height="34" rx="4" fill="#a8cde8" stroke="#1a1a1a" strokeWidth="3" transform="rotate(6 56 39)" />
    <rect x="24" y="34" width="52" height="34" rx="4" fill="#ffd45c" stroke="#1a1a1a" strokeWidth="3" transform="rotate(-4 50 51)" />
    <rect x="26" y="46" width="52" height="34" rx="4" fill="#fff" stroke="#1a1a1a" strokeWidth="3" />
    <rect x="34" y="56" width="24" height="4" rx="2" fill="#1a1a1a" />
    <rect x="34" y="64" width="16" height="3" rx="1.5" fill="#b9b9b9" />
  </svg>
);

export const Sticker = ({ className }: P) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
    <path
      d="M50 12l9 18 20 3-14 14 3 20-18-9-18 9 3-20-14-14 20-3 9-18z"
      fill="#ffd45c"
      stroke="#1a1a1a"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <circle cx="44" cy="42" r="2.5" fill="#1a1a1a" />
    <circle cx="56" cy="42" r="2.5" fill="#1a1a1a" />
    <path d="M43 50c3 4 11 4 14 0" fill="none" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const Poster = ({ className }: P) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
    <rect x="26" y="14" width="48" height="72" rx="4" fill="#fff" stroke="#1a1a1a" strokeWidth="3" />
    <rect x="34" y="22" width="32" height="30" fill="#ffb3a7" />
    <circle cx="50" cy="37" r="9" fill="#1a1a1a" />
    <circle cx="50" cy="34" r="2" fill="#fff" />
    <circle cx="46" cy="38" r="2" fill="#fff" />
    <circle cx="54" cy="38" r="2" fill="#fff" />
    <rect x="34" y="60" width="20" height="4" rx="2" fill="#1a1a1a" />
    <rect x="34" y="68" width="28" height="3" rx="1.5" fill="#b9b9b9" />
  </svg>
);

export const Cap = ({ className }: P) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
    <path
      d="M24 58c0-20 11-32 26-32s26 12 26 32H24z"
      fill="#e8352b"
      stroke="#1a1a1a"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <path d="M24 58h60c0 8-8 12-20 12s-28-4-40-12z" fill="#fff" stroke="#1a1a1a" strokeWidth="3" strokeLinejoin="round" />
    <circle cx="50" cy="24" r="4" fill="#1a1a1a" />
    <path d="M50 28v30" stroke="#1a1a1a" strokeWidth="2.5" />
  </svg>
);

export const Notebook = ({ className }: P) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
    <rect x="26" y="14" width="48" height="72" rx="6" fill="#bfe3c8" stroke="#1a1a1a" strokeWidth="3" />
    <path d="M38 14v72" stroke="#1a1a1a" strokeWidth="3" />
    <path d="M46 36h20M46 48h20M46 60h13" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <circle cx="32" cy="26" r="2.5" fill="#1a1a1a" />
    <circle cx="32" cy="50" r="2.5" fill="#1a1a1a" />
    <circle cx="32" cy="74" r="2.5" fill="#1a1a1a" />
  </svg>
);

export const Star = ({ filled = true }: { filled?: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
    <path
      d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z"
      fill={filled ? "#1db584" : "#d8d8d8"}
    />
  </svg>
);

export const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="9" cy="9" r="6.5" stroke="#8a8a8a" strokeWidth="2" />
    <path d="M14 14l4 4" stroke="#8a8a8a" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <path d="M3 6h16M3 11h16M3 16h16" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const Dog = ({ className }: P) => (
  <svg viewBox="0 0 140 160" className={className} aria-hidden="true">
    {/* tail */}
    <path d="M118 96c10-4 14-14 10-24" fill="none" stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" />
    {/* body */}
    <ellipse cx="84" cy="104" rx="38" ry="44" fill="#f5a623" stroke="#1a1a1a" strokeWidth="3.5" />
    <ellipse cx="76" cy="112" rx="20" ry="28" fill="#f9c96b" />
    {/* legs */}
    <path d="M62 140v14M104 138v16" stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" />
    <path d="M58 154h10M100 154h10" stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" />
    {/* arm holding package */}
    <path d="M52 96c-8 2-12 8-10 16" fill="none" stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" />
    {/* package */}
    <rect x="14" y="104" width="34" height="28" rx="3" fill="#d9b98a" stroke="#1a1a1a" strokeWidth="3" />
    <path d="M14 114h34M31 104v28" stroke="#1a1a1a" strokeWidth="3" />
    {/* head */}
    <circle cx="84" cy="52" r="32" fill="#f5a623" stroke="#1a1a1a" strokeWidth="3.5" />
    {/* ears */}
    <path d="M58 34c-14-10-30-8-34 6-3 12 2 26 14 30 8 3 16-2 18-10" fill="#e8930c" stroke="#1a1a1a" strokeWidth="3.5" strokeLinejoin="round" />
    <path d="M110 34c14-10 30-8 34 6 3 12-2 26-14 30-8 3-16-2-18-10" fill="#e8930c" stroke="#1a1a1a" strokeWidth="3.5" strokeLinejoin="round" />
    {/* snout */}
    <ellipse cx="84" cy="62" rx="16" ry="12" fill="#f9c96b" stroke="#1a1a1a" strokeWidth="3" />
    <circle cx="84" cy="56" r="5" fill="#1a1a1a" />
    <path d="M78 66c3 3 9 3 12 0" fill="none" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    {/* eyes */}
    <circle cx="72" cy="44" r="3" fill="#1a1a1a" />
    <circle cx="96" cy="44" r="3" fill="#1a1a1a" />
    {/* bow tie */}
    <path d="M72 84l12 6 12-6v14l-12-6-12 6V84z" fill="#2679f3" stroke="#1a1a1a" strokeWidth="3" strokeLinejoin="round" />
    <circle cx="84" cy="91" r="4" fill="#1a1a1a" />
  </svg>
);

export const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M9 15V3M9 3L4 8M9 3l5 5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
