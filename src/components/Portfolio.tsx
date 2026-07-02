'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { featuredProjects, profile, skills } from '@/data/portfolio';

const portraitCutoutUrl = '/portrait-nguyen-tuan-anh-cutout.png';

const revealTransition = { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const };

const revealProps = {
  initial: { opacity: 0, y: 34, filter: 'blur(8px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, amount: 0.22 },
  transition: revealTransition,
};

function ProgressPlayer() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.45,
    restDelta: 0.001,
  });
  const barColor = useTransform(scrollYProgress, [0, 0.5, 1], ['#9b9690', '#4d4943', '#181612']);

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-1.5 bg-[#181612]/10">
      <motion.div
        className="h-full origin-left"
        style={{ scaleX, backgroundColor: barColor }}
      />
    </div>
  );
}

function PortraitStage() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const portraitY = useTransform(scrollYProgress, [0, 0.28], [0, prefersReducedMotion ? 0 : -26]);
  const frameY = useTransform(scrollYProgress, [0, 0.28], [0, prefersReducedMotion ? 0 : 18]);
  const portraitScale = useTransform(scrollYProgress, [0, 0.28], [1, prefersReducedMotion ? 1 : 1.035]);

  return (
    <div
      className="relative mx-auto aspect-[0.86/1] w-full max-w-[420px] select-none overflow-hidden sm:max-w-[520px] lg:max-w-[560px]"
      onContextMenu={(event) => event.preventDefault()}
    >
      <motion.div
        className="absolute inset-x-[8%] bottom-[6%] top-[10%] rounded-[2.25rem] border border-[#181612]/10 bg-[#e3ddd4] shadow-[0_36px_90px_rgba(24,22,18,0.13)]"
        style={{ y: frameY }}
      />
      <motion.div className="absolute inset-x-[16%] top-[18%] h-px bg-[#181612]/10" style={{ y: frameY }} />
      <motion.div className="absolute inset-x-[22%] top-[24%] h-px bg-[#181612]/8" style={{ y: frameY }} />
      <div className="absolute left-[4%] top-[6%] h-36 w-36 rounded-full bg-white/60 blur-3xl" />
      <div className="absolute bottom-[8%] right-[4%] h-44 w-44 rounded-full bg-[#d7d1c8]/80 blur-3xl" />
      <div className="absolute inset-x-[1%] bottom-0 h-[28%] border-t border-[#181612]/10 bg-[linear-gradient(180deg,rgba(241,238,231,0)_0%,#f1eee7_62%)]" />
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
        style={{ y: portraitY, scale: portraitScale }}
      >
        <Image
          src={portraitCutoutUrl}
          alt={profile.displayName}
          fill
          priority
          draggable={false}
          sizes="(max-width: 768px) 92vw, 560px"
          className="pointer-events-none object-contain object-bottom drop-shadow-[0_28px_42px_rgba(24,22,18,0.2)]"
        />
      </motion.div>
    </div>
  );
}

function SectionNumber({ children }: { children: string }) {
  return (
    <p className="font-mono text-xs font-black uppercase tracking-[0.22em] text-[#181612]/40">
      {children}
    </p>
  );
}

function StackCarousel() {
  const carouselSkills = [...skills, ...skills];

  return (
    <div className="group relative overflow-hidden border-y border-[#f1eee7]/18 py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-[linear-gradient(90deg,#181612_0%,rgba(24,22,18,0)_100%)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-[linear-gradient(270deg,#181612_0%,rgba(24,22,18,0)_100%)]" />
      <div className="flex w-max gap-3 animate-[stack-carousel_26s_linear_infinite] group-hover:[animation-play-state:paused]">
        {carouselSkills.map((item, index) => (
          <motion.div
            key={`${item}-${index}`}
            whileHover={{ y: -4, backgroundColor: '#f1eee7', color: '#181612' }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="min-w-[190px] border border-[#f1eee7]/18 bg-[#211f1b] px-5 py-5 font-mono text-sm font-black uppercase tracking-[0.16em] text-[#f1eee7]"
          >
            {item}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [openProject, setOpenProject] = useState(featuredProjects[0].name);

  return (
    <main className="min-h-screen bg-[#f1eee7] pb-24 text-[#181612]">
      <ProgressPlayer />
      <nav className="fixed right-4 top-4 z-40 hidden gap-2 font-mono text-[10px] font-black uppercase tracking-[0.16em] text-[#181612] md:flex">
        {[
          ['Work', '#work'],
          ['Stack', '#stack'],
          ['Contact', '#contact'],
        ].map(([label, href]) => (
          <a
            key={href}
            href={href}
            className="border border-[#181612]/15 bg-[#f1eee7]/80 px-3 py-2 backdrop-blur-xl transition-colors hover:bg-[#181612] hover:text-[#f1eee7]"
          >
            {label}
          </a>
        ))}
      </nav>

      <motion.section
        id="top"
        className="mx-auto grid min-h-screen max-w-[1600px] gap-12 px-5 py-8 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.06,
            },
          },
        }}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: revealTransition },
          }}
        >
          <SectionNumber>portfolio</SectionNumber>
          <h1 className="mt-8 max-w-5xl text-[clamp(4.5rem,11vw,12rem)] font-black uppercase leading-[0.76] tracking-[-0.09em]">
            Java
            <br />
            Backend
            <br />
            Engineer
          </h1>
          <p className="mt-8 max-w-2xl text-xl font-semibold leading-snug tracking-[-0.035em] text-[#181612]/70 sm:text-2xl">
            {profile.displayName} - {profile.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#work"
              className="bg-[#181612] px-5 py-3 font-mono text-xs font-black uppercase tracking-[0.16em] text-[#f1eee7] transition-colors hover:bg-[#2a2722]"
            >
              View work
            </a>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="border border-[#181612] px-5 py-3 font-mono text-xs font-black uppercase tracking-[0.16em] transition-colors hover:bg-[#181612] hover:text-[#f1eee7]"
            >
              Resume
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="border border-[#181612]/30 px-5 py-3 font-mono text-xs font-black uppercase tracking-[0.16em] text-[#181612]/70 transition-colors hover:border-[#181612] hover:text-[#181612]"
            >
              LinkedIn
            </a>
          </div>
          <div className="mt-10 grid max-w-3xl gap-px bg-[#181612]/12 sm:grid-cols-3">
            <div className="bg-[#f1eee7] py-5 pr-6">
              <p className="font-mono text-xs font-black uppercase tracking-[0.18em] text-[#181612]/40">
                Focus
              </p>
              <p className="mt-3 text-xl font-black uppercase leading-none tracking-[-0.05em]">
                APIs / Systems
              </p>
            </div>
            <div className="bg-[#f1eee7] py-5 pr-6 sm:px-6">
              <p className="font-mono text-xs font-black uppercase tracking-[0.18em] text-[#181612]/40">
                Base
              </p>
              <p className="mt-3 text-xl font-black uppercase leading-none tracking-[-0.05em]">
                Ho Chi Minh
              </p>
            </div>
            <div className="bg-[#f1eee7] py-5 pr-6 sm:px-6">
              <p className="font-mono text-xs font-black uppercase tracking-[0.18em] text-[#181612]/40">
                Stack
              </p>
              <p className="mt-3 text-xl font-black uppercase leading-none tracking-[-0.05em]">
                Java / Spring
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="-order-1 grid gap-8 lg:order-none"
          variants={{
            hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: revealTransition },
          }}
        >
          <PortraitStage />
          <div className="grid grid-cols-[80px_1fr] gap-4 border-t border-[#181612]/10 pt-5 font-mono text-xs uppercase tracking-[0.14em]">
            <span className="font-black text-[#181612]/40">Role</span>
            <span className="font-black">{profile.title}</span>
            <span className="font-black text-[#181612]/40">Work</span>
            <span className="font-black">Enterprise backend, APIs, production stability</span>
          </div>
        </motion.div>
      </motion.section>

      <motion.section id="work" className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 lg:px-10" {...revealProps}>
        <SectionNumber>selected work</SectionNumber>
        <div className="mt-8 divide-y divide-[#181612]/12 border-y border-[#181612]/12">
          {featuredProjects.map((project, index) => {
            const number = String(index + 1).padStart(2, '0');
            const isOpen = openProject === project.name;

            return (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                opacity: { duration: 0.55, delay: index * 0.06 },
                y: { duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] },
              }}
              className="py-8"
            >
              <div className="grid gap-6 sm:grid-cols-[90px_0.8fr_1.2fr] sm:items-start">
                <p className="font-mono text-sm font-black text-[#181612]/35">{number}</p>
                <div>
                  <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-[-0.07em] sm:text-6xl">
                    {project.name}
                  </h2>
                  <div className="mt-5 flex flex-wrap gap-2 font-mono text-[10px] font-black uppercase tracking-[0.16em] text-[#181612]/55">
                    <span className="border border-[#181612]/15 px-3 py-2">{project.period}</span>
                    <span className="border border-[#181612]/15 px-3 py-2">{project.role}</span>
                  </div>
                </div>
                <div>
                  <p className="max-w-2xl text-lg font-semibold leading-relaxed text-[#181612]/65">
                    {project.description}
                  </p>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`project-details-${index}`}
                    onClick={() => setOpenProject(isOpen ? '' : project.name)}
                    className="mt-6 inline-flex cursor-pointer items-center gap-3 border border-[#181612] px-4 py-3 font-mono text-xs font-black uppercase tracking-[0.16em] transition-colors hover:bg-[#181612] hover:text-[#f1eee7]"
                  >
                    <span>{isOpen ? 'Hide details' : 'View details'}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                      className="text-base leading-none"
                    >
                      +
                    </motion.span>
                  </button>
                </div>
              </div>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`project-details-${index}`}
                    initial={{ height: 0, opacity: 0, y: -8 }}
                    animate={{ height: 'auto', opacity: 1, y: 0 }}
                    exit={{ height: 0, opacity: 0, y: -8 }}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-8 grid gap-8 border-t border-[#181612]/10 pt-8 sm:ml-[90px] lg:grid-cols-[0.8fr_1.2fr]">
                      <div>
                        <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-[#181612]/40">
                          Impact
                        </p>
                        <div className="mt-4 grid gap-2">
                          {project.metrics.map((item) => (
                            <span
                              key={item}
                              className="border border-[#181612]/15 px-3 py-3 font-mono text-[10px] font-black uppercase tracking-[0.14em] text-[#181612]/70"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                        <p className="mt-6 font-mono text-xs font-black uppercase tracking-[0.2em] text-[#181612]/40">
                          Stack
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.stack.map((item) => (
                            <span
                              key={item}
                              className="bg-[#181612] px-3 py-2 font-mono text-[10px] font-black uppercase tracking-[0.14em] text-[#f1eee7]"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-[#181612]/40">
                          Details
                        </p>
                        <div className="mt-4 grid gap-3">
                          {project.details.map((item) => (
                            <p
                              key={item}
                              className="border-l-2 border-[#181612] pl-4 text-base font-semibold leading-relaxed text-[#181612]/70"
                            >
                              {item}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
            );
          })}
        </div>
      </motion.section>

      <motion.section id="stack" className="bg-[#181612] px-5 py-12 text-[#f1eee7] sm:px-8 sm:py-16 lg:px-10" {...revealProps}>
        <div className="mx-auto grid max-w-[1600px] gap-8">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
            <SectionNumber>technical stack</SectionNumber>
              <h2 className="mt-5 text-4xl font-black uppercase leading-[0.82] tracking-[-0.08em] sm:text-7xl">
              Systems
              <br />
              built
              <br />
              to ship
            </h2>
          </div>
            <p className="max-w-2xl text-lg font-semibold leading-snug text-[#f1eee7]/62 sm:text-xl">
              Core tools I use across backend systems, APIs, integrations, and product-facing workflows.
            </p>
          </div>
          <StackCarousel />
        </div>
      </motion.section>

      <motion.section id="contact" className="mx-auto grid max-w-[1600px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10" {...revealProps}>
        <div>
          <SectionNumber>contact</SectionNumber>
          <h2 className="mt-6 text-5xl font-black uppercase leading-[0.84] tracking-[-0.08em] sm:text-7xl">
            Contact
            <br />
            <span className="mt-2 block break-all text-[clamp(1.6rem,4vw,3.4rem)] lowercase tracking-[-0.04em]">
              {profile.email}
            </span>
            <br />
            <span className="text-[clamp(2.4rem,6vw,5.4rem)]">{profile.location}</span>
          </h2>
        </div>
        <div className="flex flex-col justify-end gap-4 border-l border-[#181612]/12 pl-6">
          <p className="max-w-xl text-xl font-semibold leading-snug text-[#181612]/65">
            {profile.impact}
          </p>
          <div className="flex flex-wrap gap-3 pt-4">
            <a className="bg-[#181612] px-5 py-3 font-mono text-xs font-black uppercase tracking-[0.16em] text-white shadow-[inset_0_0_0_1px_rgba(241,238,231,0.18)] transition-colors hover:bg-[#2a2722]" href={`mailto:${profile.email}`}>
              Email
            </a>
            <a className="border border-[#181612] px-5 py-3 font-mono text-xs font-black uppercase tracking-[0.16em] transition-colors hover:bg-[#181612] hover:text-[#f1eee7]" href={profile.resumeUrl} target="_blank" rel="noreferrer">
              Resume
            </a>
            <a className="border border-[#181612]/30 px-5 py-3 font-mono text-xs font-black uppercase tracking-[0.16em] transition-colors hover:border-[#181612] hover:bg-[#181612] hover:text-[#f1eee7]" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
