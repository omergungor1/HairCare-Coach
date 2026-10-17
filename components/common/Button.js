import Link from "next/link";

export function Button({
  href,
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  const variants = {
    primary:
      "bg-brand-accent text-[#0F172A] shadow-accent hover:bg-brand-accent-hover",
    secondary:
      "border border-brand-ink bg-transparent text-brand-ink hover:bg-brand-ink hover:text-surface-bg",
    ghost: "bg-transparent text-brand-sage hover:bg-surface-subtle",
  };

  const classes = `inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 py-3 text-center font-display text-base font-semibold tracking-[0.01em] transition disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`;

  if (href) {
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={classes} {...props}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
