'use client';

import Image from 'next/image';
import { motion, useScroll, useSpring } from 'framer-motion';
import { featuredProjects, profile, skills } from '@/data/portfolio';

const heroWords = ['PORT', 'FOLIO'];
const reveal = {
  initial: { opacity: 0, y: 28, filter: 'blur(10px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, amount: 0.28 },
  transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const },
};

function V2Progress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 28,
    mass: 0.45,
  });

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-1 bg-[#ead9bd]/12">
      <motion.div className="h-full origin-left bg-[#ead9bd]" style={{ scaleX }} />
    </div>
  );
}

function V2Nav() {
  return (
    <nav className="fixed inset-x-5 top-5 z-40 flex items-center justify-between gap-4 font-mono text-[10px] font-black uppercase tracking-[0.18em] text-[#ead9bd]">
      <a href="#top" className="font-display text-lg font-light italic normal-case tracking-normal text-[#ead9bd]/80 transition-colors hover:text-[#ead9bd]">
        {'//tuananh'}
      </a>
      <div className="hidden items-center gap-2 sm:flex">
        {[
          ['Work', '#work'],
          ['Stack', '#stack'],
          ['Contact', '#contact'],
          ['V1', '/'],
        ].map(([label, href]) => (
          <a
            key={href}
            href={href}
            className="border border-[#ead9bd]/18 bg-[#161616]/55 px-4 py-3 backdrop-blur-xl transition-colors hover:bg-[#ead9bd] hover:text-[#161616]"
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}

export default function PortfolioV2() {
  return (
    <main className="min-h-screen bg-[#151515] text-[#ead9bd]">
      <V2Progress />
      <V2Nav />

      <section id="top" className="relative min-h-screen overflow-hidden px-5 py-24 sm:px-8 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(234,217,189,0.12),rgba(21,21,21,0)_34%)]" />
        <div className="relative mx-auto flex min-h-[calc(100vh-12rem)] max-w-[1600px] flex-col justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-start justify-between gap-8 pt-6"
          >
            <p className="max-w-xs text-lg font-semibold leading-snug text-[#ead9bd]/80">
              Backend systems, APIs, and product work with a cinematic portfolio frame.
            </p>
            <a href="#work" aria-label="Go to work section" className="hidden text-6xl font-light leading-none text-[#ead9bd]/80 transition-transform hover:translate-x-2 md:block">
              →
            </a>
          </motion.div>

          <div className="relative grid min-h-[620px] place-items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-0 z-10 h-[78%] w-[min(72vw,620px)]"
            >
              <Image
                src="/portrait-nguyen-tuan-anh-cutout.png"
                alt={profile.displayName}
                fill
                priority
                sizes="(max-width: 768px) 80vw, 620px"
                className="object-contain object-bottom drop-shadow-[0_44px_80px_rgba(0,0,0,0.45)]"
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, letterSpacing: '-0.08em' }}
              animate={{ opacity: 1, letterSpacing: '-0.055em' }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-20 flex w-full flex-col items-center justify-center font-display text-[clamp(4.7rem,18vw,18rem)] font-black uppercase leading-[0.78] text-[#ead9bd]"
            >
              {heroWords.map((word, index) => (
                <span key={word} className={index === 1 ? 'text-transparent [-webkit-text-stroke:2px_#ead9bd]' : ''}>
                  {word}
                </span>
              ))}
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.74, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-6 pb-4 font-mono text-xs font-black uppercase tracking-[0.16em] text-[#ead9bd]/74 sm:grid-cols-3"
          >
            <p>{profile.displayName}</p>
            <p className="sm:text-center">Java Backend Engineer</p>
            <p className="sm:text-right">{profile.email}</p>
          </motion.div>
        </div>
      </section>

      <motion.section id="work" className="border-y border-[#ead9bd]/12 bg-[#ead9bd] px-5 py-20 text-[#151515] sm:px-8 lg:px-10" {...reveal}>
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <h2 className="font-display text-5xl font-black uppercase leading-none sm:text-6xl">Selected Work</h2>
            <p className="max-w-2xl text-xl font-semibold leading-relaxed text-[#151515]/68">
              Enterprise projects translated into concise, visual case cards.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <motion.article
                key={project.name}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                className="group overflow-hidden border border-[#151515]/16 bg-[#151515] text-[#ead9bd]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={`${project.name} concept`}
                    fill
                    sizes="(max-width: 768px) 92vw, 48vw"
                    className="object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,21,21,0)_30%,rgba(21,21,21,0.86)_100%)]" />
                  <span className="absolute left-4 top-4 bg-[#ead9bd] px-3 py-2 font-mono text-[10px] font-black uppercase tracking-[0.16em] text-[#151515]">
                    0{index + 1}
                  </span>
                </div>
                <div className="grid gap-5 p-5">
                  <h3 className="font-display text-3xl font-black uppercase leading-none">{project.name}</h3>
                  <p className="text-base font-semibold leading-relaxed text-[#ead9bd]/65">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.slice(0, 4).map((item) => (
                      <span key={item} className="border border-[#ead9bd]/16 px-3 py-2 font-mono text-[10px] font-black uppercase tracking-[0.14em] text-[#ead9bd]/76">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section id="stack" className="px-5 py-20 sm:px-8 lg:px-10" {...reveal}>
        <div className="mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <h2 className="font-display text-5xl font-black uppercase leading-none sm:text-6xl">
            Systems
            <br />
            Stack
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
              <motion.div
                key={skill}
                whileHover={{ backgroundColor: '#ead9bd', color: '#151515' }}
                className="border border-[#ead9bd]/14 px-5 py-6 font-mono text-sm font-black uppercase tracking-[0.16em] text-[#ead9bd]/78"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section id="contact" className="bg-[#ead9bd] px-5 py-20 text-[#151515] sm:px-8 lg:px-10" {...reveal}>
        <div className="mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-[#151515]/42">Contact</p>
            <h2 className="mt-6 font-display text-5xl font-black uppercase leading-none sm:text-7xl">
              Let&apos;s build
              <br />
              something useful.
            </h2>
          </div>
          <div className="grid gap-4 font-mono text-xs font-black uppercase tracking-[0.16em]">
            <a className="border border-[#151515]/20 px-5 py-4 transition-colors hover:bg-[#151515] hover:text-[#ead9bd]" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <a className="border border-[#151515]/20 px-5 py-4 transition-colors hover:bg-[#151515] hover:text-[#ead9bd]" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="border border-[#151515]/20 px-5 py-4 transition-colors hover:bg-[#151515] hover:text-[#ead9bd]" href={profile.resumeUrl} target="_blank" rel="noreferrer">
              Resume
            </a>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
