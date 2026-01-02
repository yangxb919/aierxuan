import Link from 'next/link'
import { ShieldCheck, Globe, Box, Calendar } from 'lucide-react'

interface HeroSectionProps {
  texts: {
    mainTitle: string
    subtitle: string
    description: string
    contactSales: string
    downloadCatalog: string
  }
}

export function HeroSection({ texts }: HeroSectionProps) {
  return (
    <section className="relative isolate overflow-hidden text-white">
      {/* Background (no image): gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#04050a] via-[#070b18] to-[#04050a]" />
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            'radial-gradient(900px 520px at 18% 0%, rgba(59,130,246,0.22), transparent 60%), radial-gradient(820px 520px at 92% 24%, rgba(34,211,238,0.16), transparent 62%), radial-gradient(820px 520px at 40% 110%, rgba(99,102,241,0.10), transparent 62%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />
      <div className="pointer-events-none absolute -top-24 right-[-140px] h-[520px] w-[520px] rounded-full bg-blue-600/25 blur-[160px]" />
      <div className="pointer-events-none absolute -bottom-32 left-[-160px] h-[560px] w-[560px] rounded-full bg-cyan-500/15 blur-[180px]" />

      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-28 sm:px-8 lg:px-12 lg:pb-28 lg:pt-32">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur">
              <ShieldCheck className="h-4 w-4 text-cyan-200" />
              <span className="text-xs font-semibold tracking-[0.18em] text-white/85 uppercase">
                Intel Partner · CE/FCC · ISO 9001
              </span>
            </div>

            <h1 className="mt-7 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl">
              {texts.mainTitle}
            </h1>
            <p className="mt-6 text-2xl font-medium text-cyan-200 sm:text-3xl">{texts.subtitle}</p>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              {texts.description}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex h-14 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 via-blue-600 to-cyan-500 px-8 text-base font-semibold text-white shadow-[0_18px_60px_rgba(59,130,246,0.35)] transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 sm:w-auto"
              >
                {texts.contactSales}
              </Link>
              <button
                type="button"
                className="inline-flex h-14 w-full items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-8 text-base font-semibold text-white/90 backdrop-blur transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:w-auto"
              >
                {texts.downloadCatalog}
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-white/[0.06] p-7 shadow-[0_30px_110px_rgba(0,0,0,0.55)] backdrop-blur">
              <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/15 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

              <div className="flex items-center justify-between gap-4">
                <div className="text-xs font-semibold tracking-[0.2em] text-white/70 uppercase">At a glance</div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/70">
                  Manufacturing · QA · Delivery
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
                <div className="group rounded-2xl border border-white/10 bg-black/20 p-5 transition-colors hover:bg-black/30">
                  <div className="flex items-center gap-3 text-white/75">
                    <Calendar className="h-5 w-5 text-cyan-200" />
                    <div className="text-xs font-semibold tracking-[0.18em] uppercase">Experience</div>
                  </div>
                  <div className="mt-3 text-4xl font-bold text-white">10+</div>
                  <div className="mt-1 text-sm text-white/60">Years in OEM/ODM computing</div>
                </div>

                <div className="group rounded-2xl border border-white/10 bg-black/20 p-5 transition-colors hover:bg-black/30">
                  <div className="flex items-center gap-3 text-white/75">
                    <Box className="h-5 w-5 text-cyan-200" />
                    <div className="text-xs font-semibold tracking-[0.18em] uppercase">Scale</div>
                  </div>
                  <div className="mt-3 text-4xl font-bold text-white">500K+</div>
                  <div className="mt-1 text-sm text-white/60">Units shipped worldwide</div>
                </div>

                <div className="group rounded-2xl border border-white/10 bg-black/20 p-5 transition-colors hover:bg-black/30">
                  <div className="flex items-center gap-3 text-white/75">
                    <Globe className="h-5 w-5 text-cyan-200" />
                    <div className="text-xs font-semibold tracking-[0.18em] uppercase">Reach</div>
                  </div>
                  <div className="mt-3 text-4xl font-bold text-white">50+</div>
                  <div className="mt-1 text-sm text-white/60">Countries served</div>
                </div>
              </div>

              <div className="mt-6 border-t border-white/10 pt-6 text-sm text-white/65">
                From prototyping to mass production—built for reliability, compliance, and on-time delivery.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
