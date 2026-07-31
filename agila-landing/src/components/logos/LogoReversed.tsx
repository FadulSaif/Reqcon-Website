// Agil logo – orange symbol + theme-aware wordmark
export default function LogoReversed({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 110"
      className={className}
      style={style}
      aria-label="Agil Arbetskraft"
    >
      <defs>
        {/* Symbol uses the official brand colors (orange #F2683E + golden #FAA632).
            Only the text color stays theme-aware (dark/light/white navbar). */}
        <style>{`
          .lr-1 { fill: #FAA632; stroke-width: 0px; }
          /* Wordmark is live text so it follows the site typeface: Outfit
             once the licensed files land, Outfit until then. Sized to sit on
             the original artwork's cap-height and baselines. */
          .lr-word {
            fill: var(--text-primary);
            font-family: var(--font-heading);
            font-weight: 600;
            font-size: 46px;
            letter-spacing: 5.7px;
          }
          .lr-3 { fill: #F2683E; stroke-width: 0px; }
        `}</style>
      </defs>
      {/* x/y are the outgoing paths' measured centre line and baselines, so
          the lockup with the symbol is unchanged. */}
      <text className="lr-word" x="305.65" y="47.22" textAnchor="middle">AGIL</text>
      <text className="lr-word" x="305.65" y="95.19" textAnchor="middle">ARBETSKRAFT</text>
      <g>
        <path className="lr-3" d="M62.0226,10.4168c-13.1549,0-24.993,5.7304-33.1609,14.8217,7.2843-6.8045,17.0529-10.9811,27.7835-10.9811,22.4658,0,40.7426,18.2768,40.7426,40.7426,0,5.6493-1.1577,11.0328-3.2451,15.9283l-17.3923-38.8156h-12.5394l-26.4285,58.9815c-3.2571-1.711-6.2586-3.8453-8.9246-6.3363,8.168,9.0938,20.0079,14.826,33.1646,14.826,24.5836,0,44.5836-20,44.5836-44.5836S86.6062,10.4168,62.0226,10.4168ZM56.6453,95.7426c-3.5418,0-6.9754-.4637-10.253-1.3181l8.2288-18.3645h26.9576l-4.1305-9.2183h-18.6965l11.431-25.5108h.5964l17.572,39.2163c-7.4747,9.2585-18.9073,15.1953-31.7057,15.1953Z"/>
        <path className="lr-1" d="M22.7637,81.9743l2.65-5.9142h13.7884l4.1305-9.2183h-13.7884l11.4306-25.5108h.5964l9.2547,20.654,5.051-11.2725-8.3342-18.5999h-12.5394l-17.6699,39.4352c-1.916-5.1573-2.9672-10.7315-2.9672-16.5475C14.3663,28.7228,35.7451,7.344,62.0226,7.344c12.6995,0,24.2457,5.0032,32.7967,13.1298C85.3896,10.0576,71.7694,3.5027,56.6453,3.5027,28.2492,3.5027,5.148,26.6039,5.148,55s23.1013,51.4973,51.4973,51.4973c15.1221,0,28.7408-6.5531,38.1703-16.9668-8.5506,8.1245-20.0951,13.1262-32.7929,13.1262-16.2708,0-30.6568-8.2016-39.259-20.6825Z"/>
      </g>
    </svg>
  );
}
