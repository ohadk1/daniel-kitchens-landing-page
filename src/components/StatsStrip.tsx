'use client';

import AnimatedCounter from '@/components/AnimatedCounter';
import SectionReveal from '@/components/SectionReveal';
import { stats } from '@/data/content';

export default function StatsStrip() {
  return (
    <section aria-label="נתונים על הנגרייה" className="w-full bg-kitchen-wood py-12 sm:py-14">
      <SectionReveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 gap-y-10 sm:grid-cols-4 sm:gap-y-0">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-2 px-2 text-center sm:border-s sm:border-white/25 sm:first:border-s-0"
            >
              <dd className="font-display text-3xl font-bold text-white tabular-nums sm:text-4xl lg:text-5xl">
                <AnimatedCounter
                  value={stat.value}
                  prefix={'prefix' in stat ? stat.prefix : undefined}
                  suffix={'suffix' in stat ? stat.suffix : undefined}
                  raw={'raw' in stat ? stat.raw : undefined}
                />
              </dd>
              {/* Full white on #8e6f4a is 4.64:1 — AA for the 14px label; any alpha fails. */}
              <dt className="text-sm text-white sm:text-base">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </SectionReveal>
    </section>
  );
}
