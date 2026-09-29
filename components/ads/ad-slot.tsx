import { adConfig, type AdPlacement } from "@/config/ads";

type Props = {
  placement: AdPlacement;
  className?: string;
  label?: string;
};

export function AdSlot({ placement, className = "", label }: Props) {
  const config = adConfig[placement];
  return (
    <aside
      aria-label="Advertisement"
      data-ad-placement={placement}
      data-ad-slot={config.slot || undefined}
      className={`my-6 flex min-h-24 w-full items-center justify-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--card)] px-4 py-5 text-center ${className}`}
    >
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--muted)]">Advertisement</p>
        <p className="mt-1 text-xs text-[var(--muted)]">{label || config.label} · AdSense-ready placeholder</p>
      </div>
    </aside>
  );
}
