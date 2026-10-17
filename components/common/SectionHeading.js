export function SectionHeading({ kicker, title, subtitle, align = "left", as = "h2" }) {
  const Title = as;
  const centered = align === "center";

  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {kicker ? (
        <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-brand-sage">
          {kicker}
        </p>
      ) : null}
      <Title
        className={`font-display text-3xl font-bold tracking-[-0.02em] text-content-primary sm:text-4xl ${kicker ? "mt-3" : ""}`}
      >
        {title}
      </Title>
      {subtitle ? (
        <p className="mt-4 text-lg leading-relaxed text-content-secondary">{subtitle}</p>
      ) : null}
    </div>
  );
}
