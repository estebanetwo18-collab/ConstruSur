/** Dibujo arquitectónico de línea (elevación + planta), propio, muy tenue. */
export function BlueprintLines({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 700" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.2">
      {/* Grilla de cotas */}
      <g strokeDasharray="4 8" opacity=".6">
        <path d="M80 620H1120M80 120V640M1120 120V640" />
        <path d="M80 660H560M640 660H1120" />
      </g>
      {/* Elevación de casa */}
      <path d="M140 620V380l220-150 220 150v240" />
      <path d="M580 620V420h300v200" />
      <path d="M560 420h340l-20-40H600z" />
      <path d="M200 620V470h80v150M410 470h110v80H410zM465 470v80M410 510h110" />
      <path d="M640 470h70v60h-70zM760 470h70v60h-70zM675 470v60M795 470v60" />
      <path d="M360 230v-40h40v67" />
      {/* Cotas */}
      <path d="M140 600h440M140 594v12M580 594v12" />
      <path d="M580 400h300M580 394v12M880 394v12" />
      {/* Planta */}
      <g transform="translate(930 150)">
        <path d="M0 0h170v220H0z" />
        <path d="M0 90h100v130M100 140h70M60 0v60M60 60h40" />
        <path d="M100 90a40 40 0 0 1 40 40" />
        <circle cx="135" cy="40" r="18" />
      </g>
      {/* Norte */}
      <g transform="translate(150 140)">
        <circle r="28" />
        <path d="M0-24 8 10 0 4-8 10z" />
      </g>
    </svg>
  );
}
