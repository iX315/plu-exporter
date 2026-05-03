interface HeroProps {
  hero?: string
  estabilished?: string
  name?: string
  description?: string
}

export const Hero = ({ hero, estabilished, name, description }: HeroProps) => (
  <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-primary/60">
    <div className="absolute inset-0">
      {hero ? (
        <img
          src={hero}
          className="object-cover opacity-40"
          style={{
            width: '100%',
            height: '100%'
          }}
          alt="Cover image"
        />
      ) : null}
      <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/20 to-transparent"></div>
    </div>
    <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 lg:px-8">
      <div className="max-w-3xl">
        {estabilished ? (
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            Since {estabilished}
          </p>
        ) : null}
        <h1 className="font-serif text-5xl font-bold leading-[1.1] tracking-tight text-primary-foreground md:text-7xl lg:text-8xl">
          {name}
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-primary-foreground/80 md:text-xl">
          {description}
        </p>
      </div>
    </div>
    <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs uppercase tracking-widest text-primary-foreground/40">Scroll</span>
        <div className="h-10 w-px bg-linear-to-b from-primary-foreground/40 to-transparent"></div>
      </div>
    </div>
  </section>
)