import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import {
  ArrowRight,
  Award,
  Boxes,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Cpu,
  Factory,
  Gamepad2,
  Globe2,
  Laptop,
  Mail,
  Monitor,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
  Zap,
} from 'lucide-react'

export const redesignImages = {
  homeHero: '/images/redesign/home-hero.png',
  productsHero: '/images/redesign/products-hero.png',
  oemHero: '/images/redesign/oem-hero.png',
  aboutHero: '/images/redesign/about-hero.png',
  blogHero: '/images/redesign/blog-hero.png',
  faqHero: '/images/redesign/faq-hero.png',
  contactHero: '/images/redesign/contact-hero.png',
  business: '/images/redesign/product-business.png',
  gaming: '/images/redesign/product-gaming.png',
  miniPc: '/images/redesign/product-mini-pc.png',
  factory: '/images/advanced-manufacturing-facility.webp',
  testing: '/images/quality-certification-lab.webp',
  logistics: '/images/global-supply-chain-logistics.webp',
  ce: '/images/certificates/ce-certificate-front-photo-v3.webp',
  fcc: '/images/certificates/fcc-certificate-front-photo-v3.webp',
  rohs: '/images/certificates/rohs-certificate-front-photo-v3.webp',
  iso: '/images/certificates/iso-9001-front-photo-v3.webp',
}

export const defaultHeroStats = [
  { icon: Boxes, label: 'MOQ', value: '100+', detail: 'Units' },
  { icon: Clock3, label: 'Delivery', value: '7-15', detail: 'Days' },
  { icon: Factory, label: 'Capacity', value: '50,000+', detail: '/ Month' },
  { icon: Users, label: 'Global Clients', value: '500+', detail: 'Partners' },
]

export const productFamilies = [
  {
    icon: Laptop,
    title: 'Business Laptop',
    description: 'Reliable, secure and efficient laptops for modern business and education.',
    image: redesignImages.business,
    specs: ['Intel Core', '8-64GB RAM', 'Custom Shell'],
  },
  {
    icon: Gamepad2,
    title: 'Gaming Laptop',
    description: 'High performance gaming laptops for immersive experiences and retail channels.',
    image: redesignImages.gaming,
    specs: ['RTX Ready', '144Hz Display', 'Thermal Design'],
  },
  {
    icon: Monitor,
    title: 'Mini PC',
    description: 'Compact, powerful and versatile Mini PCs for any workspace or deployment.',
    image: redesignImages.miniPc,
    specs: ['Intel/AMD', 'VESA Mount', 'Fanless Option'],
  },
]

export function GlowButton({
  href,
  children,
  variant = 'primary',
  className = '',
}: {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'dark'
  className?: string
}) {
  const styles = {
    primary:
      'border-blue-400/40 bg-blue-600 text-white shadow-[0_18px_46px_rgba(37,99,235,0.34)] hover:bg-blue-500',
    secondary:
      'border-white/30 bg-black/18 text-white backdrop-blur-md hover:border-blue-300/60 hover:bg-white/10',
    dark:
      'border-slate-900 bg-slate-950 text-white shadow-[0_18px_46px_rgba(2,6,23,0.2)] hover:bg-slate-800',
  }

  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-3 rounded-lg border px-6 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${styles[variant]} ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </Link>
  )
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  light?: boolean
}) {
  return (
    <div
      className={`mb-10 flex flex-col gap-4 ${
        align === 'center' ? 'items-center text-center' : 'lg:flex-row lg:items-end lg:justify-between'
      }`}
    >
      <div className={align === 'center' ? 'max-w-3xl' : 'max-w-2xl'}>
        {eyebrow ? (
          <div className={`mb-4 text-xs font-bold uppercase tracking-[0.2em] ${light ? 'text-blue-600' : 'text-cyan-300'}`}>
            {eyebrow}
          </div>
        ) : null}
        <h2 className={`text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl ${light ? 'text-slate-950' : 'text-white'}`}>
          {title}
        </h2>
      </div>
      {description ? (
        <p className={`max-w-xl text-base leading-7 ${light ? 'text-slate-600' : 'text-slate-300'}`}>
          {description}
        </p>
      ) : null}
    </div>
  )
}

export function StatusWidget({
  title,
  rows,
  compact = false,
}: {
  title: string
  compact?: boolean
  rows: Array<{ label: string; value: string; status?: 'live' | 'ok' | 'warn' }>
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-blue-300/35 bg-slate-950/58 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <div className="pointer-events-none absolute right-0 top-0 h-16 w-16 border-r border-t border-cyan-300/50" />
      <div className="mb-3 flex items-center justify-between gap-4">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-white">{title}</span>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-lime-300">
          <span className="h-2 w-2 rounded-full bg-lime-400 shadow-[0_0_14px_rgba(163,230,53,0.8)]" />
          Live
        </span>
      </div>
      <div className="space-y-2">
        {rows.map((row) => (
          <div
            key={`${title}-${row.label}`}
            className={`grid grid-cols-[1fr_auto] items-center gap-4 border-t border-white/10 pt-2 ${
              compact ? 'text-xs' : 'text-sm'
            }`}
          >
            <span className="flex items-center gap-2 text-slate-300">
              {row.status === 'ok' ? <CheckCircle2 className="h-3.5 w-3.5 text-lime-300" /> : null}
              {row.label}
            </span>
            <span className={row.status === 'warn' ? 'font-semibold text-amber-300' : 'font-semibold text-white'}>
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function TechHero({
  lang,
  image,
  eyebrow,
  title,
  subtitle,
  primaryLabel = 'Request Quote',
  secondaryLabel = 'View Products',
  secondaryHref,
  widgets,
  stats = defaultHeroStats,
}: {
  lang: string
  image: string
  eyebrow: string
  title: string
  subtitle: string
  primaryLabel?: string
  secondaryLabel?: string
  secondaryHref?: string
  widgets: Array<{ title: string; rows: Array<{ label: string; value: string; status?: 'live' | 'ok' | 'warn' }> }>
  stats?: typeof defaultHeroStats
}) {
  return (
    <section className="relative min-h-[760px] overflow-hidden bg-slate-950 text-white">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,14,0.96)_0%,rgba(5,8,14,0.82)_36%,rgba(5,8,14,0.24)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-slate-950 to-transparent" />
      <CircuitLines />

      <div className="relative z-10 mx-auto flex min-h-[760px] max-w-7xl items-center px-4 pb-12 pt-28 sm:px-6 lg:px-8">
        <div className="grid w-full gap-10 lg:grid-cols-[0.95fr_0.7fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/30 bg-slate-950/40 px-4 py-2 text-sm text-white shadow-[0_0_30px_rgba(14,165,233,0.15)] backdrop-blur-md">
              <span className="grid h-6 w-6 place-items-center rounded-full border border-blue-400/40 text-[10px] font-black text-blue-300">
                intel
              </span>
              <span>{eyebrow}</span>
            </div>
            <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              {subtitle}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <GlowButton href={`/${lang}/contact`}>{primaryLabel}</GlowButton>
              <GlowButton href={secondaryHref ?? `/${lang}/products`} variant="secondary">
                {secondaryLabel}
              </GlowButton>
            </div>
            <HeroStatBar stats={stats} />
          </div>

          <div className="hidden justify-self-end lg:block">
            <div className="w-[330px] space-y-4 xl:w-[360px]">
              {widgets.map((widget) => (
                <StatusWidget key={widget.title} title={widget.title} rows={widget.rows} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CircuitLines() {
  return (
    <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-[28%] opacity-70 lg:block">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(90deg, transparent 0 82%, rgba(96,165,250,0.25) 82% 83%, transparent 83%), linear-gradient(180deg, transparent 0 18%, rgba(96,165,250,0.35) 18% 19%, transparent 19% 100%)',
          backgroundSize: '90px 90px',
        }}
      />
      {[18, 32, 48, 64, 78].map((top, index) => (
        <div
          key={top}
          className="absolute right-0 h-px bg-cyan-300/70"
          style={{
            top: `${top}%`,
            width: `${110 + index * 34}px`,
          }}
        >
          <span className="absolute -left-1 -top-1 h-2 w-2 rounded-full border border-cyan-200 bg-slate-950" />
        </div>
      ))}
    </div>
  )
}

export function HeroStatBar({ stats = defaultHeroStats }: { stats?: typeof defaultHeroStats }) {
  return (
    <div className="mt-8 grid max-w-3xl grid-cols-2 overflow-hidden rounded-xl border border-white/16 bg-slate-950/36 shadow-[0_22px_70px_rgba(0,0,0,0.26)] backdrop-blur-md sm:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div key={stat.label} className="border-r border-white/12 px-4 py-4 last:border-r-0">
            <div className="flex items-center gap-3">
              <Icon className="h-5 w-5 text-blue-400" />
              <span className="text-sm text-slate-300">{stat.label}</span>
            </div>
            <div className="mt-2 text-2xl font-black text-white">{stat.value}</div>
            <div className="text-xs font-semibold text-slate-300">{stat.detail}</div>
          </div>
        )
      })}
    </div>
  )
}

export function ProductFamilyCard({
  family,
  href,
}: {
  family: (typeof productFamilies)[number]
  href: string
}) {
  const Icon = family.icon

  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_22px_60px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_28px_80px_rgba(37,99,235,0.16)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Image
          src={family.image}
          alt={family.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Icon className="h-7 w-7 text-blue-600" />
            <h3 className="text-xl font-bold text-slate-950">{family.title}</h3>
          </div>
          <ChevronRight className="h-5 w-5 text-slate-600 transition-transform group-hover:translate-x-1 group-hover:text-blue-600" />
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-600">{family.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {family.specs.map((spec) => (
            <span key={spec} className="rounded-full bg-cyan-50 px-3 py-1 text-[11px] font-bold uppercase text-blue-700">
              {spec}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

export function ProofStrip({
  light = true,
}: {
  light?: boolean
}) {
  const metrics = [
    { icon: Award, value: '10+', label: 'Years Experience' },
    { icon: Users, value: '500+', label: 'Global Clients' },
    { icon: Globe2, value: '50+', label: 'Countries Served' },
    { icon: ShieldCheck, value: '99.8%', label: 'Customer Satisfaction' },
  ]
  const certs = ['CE', 'FCC', 'RoHS', 'ISO 9001']

  return (
    <div className={`grid gap-0 overflow-hidden rounded-xl border ${light ? 'border-slate-200 bg-white' : 'border-white/12 bg-white/[0.04]'} shadow-[0_18px_55px_rgba(15,23,42,0.08)] md:grid-cols-8`}>
      {metrics.map((metric) => {
        const Icon = metric.icon
        return (
          <div key={metric.label} className={`border-b p-6 md:border-b-0 md:border-r ${light ? 'border-slate-200' : 'border-white/12'}`}>
            <div className="flex items-center gap-4">
              <Icon className={light ? 'h-7 w-7 text-slate-700' : 'h-7 w-7 text-cyan-300'} />
              <div>
                <div className={light ? 'text-2xl font-black text-slate-950' : 'text-2xl font-black text-white'}>{metric.value}</div>
                <div className={light ? 'text-xs text-slate-600' : 'text-xs text-slate-300'}>{metric.label}</div>
              </div>
            </div>
          </div>
        )
      })}
      {certs.map((cert) => (
        <div key={cert} className={`grid place-items-center border-b p-6 last:border-r-0 md:border-b-0 md:border-r ${light ? 'border-slate-200 text-slate-700' : 'border-white/12 text-white'}`}>
          <span className="text-xl font-black tracking-tight">{cert}</span>
        </div>
      ))}
    </div>
  )
}

export function TechCTA({
  title,
  description,
  href,
  label = 'Get Custom Quote',
}: {
  title: string
  description: string
  href: string
  label?: string
}) {
  return (
    <section className="relative overflow-hidden bg-[#07151d] py-20 text-white">
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url(/images/final-cta-background.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#07151d] via-[#07151d]/92 to-[#0f251e]/80" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">{title}</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">{description}</p>
        </div>
        <GlowButton href={href}>{label}</GlowButton>
      </div>
    </section>
  )
}

export function ProcessCards({
  steps,
  light = false,
}: {
  light?: boolean
  steps: Array<{ title: string; description: string }>
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
      {steps.map((step, index) => (
        <div
          key={step.title}
          className={`group rounded-xl border p-5 transition-all duration-300 hover:-translate-y-1 ${
            light
              ? 'border-slate-200 bg-white shadow-[0_20px_54px_rgba(15,23,42,0.08)] hover:border-blue-300'
              : 'border-white/12 bg-white/[0.045] hover:border-blue-400/50 hover:bg-white/[0.075]'
          }`}
        >
          <div className="text-3xl font-black text-cyan-400">{String(index + 1).padStart(2, '0')}</div>
          <h3 className={`mt-6 text-lg font-bold ${light ? 'text-slate-950' : 'text-white'}`}>{step.title}</h3>
          <p className={`mt-3 text-sm leading-6 ${light ? 'text-slate-600' : 'text-slate-300'}`}>{step.description}</p>
        </div>
      ))}
    </div>
  )
}

export function FeatureTile({
  icon,
  title,
  description,
  light = false,
}: {
  icon?: ReactNode
  title: string
  description: string
  light?: boolean
}) {
  return (
    <div
      className={`rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
        light
          ? 'border-slate-200 bg-white shadow-[0_20px_54px_rgba(15,23,42,0.08)] hover:border-blue-300'
          : 'border-white/12 bg-white/[0.045] hover:border-blue-400/50 hover:bg-white/[0.075]'
      }`}
    >
      <div className={light ? 'text-blue-600' : 'text-cyan-300'}>{icon ?? <Sparkles className="h-7 w-7" />}</div>
      <h3 className={`mt-5 text-xl font-bold ${light ? 'text-slate-950' : 'text-white'}`}>{title}</h3>
      <p className={`mt-3 text-sm leading-6 ${light ? 'text-slate-600' : 'text-slate-300'}`}>{description}</p>
    </div>
  )
}

export function iconFor(name: 'factory' | 'quality' | 'globe' | 'cpu' | 'package' | 'truck' | 'zap' | 'mail') {
  const icons = {
    factory: <Factory className="h-7 w-7" />,
    quality: <ShieldCheck className="h-7 w-7" />,
    globe: <Globe2 className="h-7 w-7" />,
    cpu: <Cpu className="h-7 w-7" />,
    package: <PackageCheck className="h-7 w-7" />,
    truck: <Truck className="h-7 w-7" />,
    zap: <Zap className="h-7 w-7" />,
    mail: <Mail className="h-7 w-7" />,
  }
  return icons[name]
}
