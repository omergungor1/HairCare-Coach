import Image from "next/image";

export function VitalLoopLogo({ className = "h-9 w-14" }) {
  return (
    <span
      className={`brand-mark relative inline-block shrink-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <Image
        src="/downloads/logo.png"
        alt=""
        width={500}
        height={500}
        className="pointer-events-none absolute left-1/2 h-[175%] w-auto max-w-none -translate-x-1/2"
        style={{ top: "-26%" }}
      />
    </span>
  );
}
