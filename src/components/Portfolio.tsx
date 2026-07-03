'use client';

import { useState, type PointerEvent } from 'react';
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
      className="relative mx-auto aspect-[0.86/1] w-full max-w-[240px] select-none overflow-hidden sm:max-w-[520px] lg:max-w-[560px]"
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
  const [openProject, setOpenProject] = useState('');
  const [clickedButtons, setClickedButtons] = useState<Record<string, boolean>>({});
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const isContactReady =
    contactName.trim().length > 0 &&
    contactEmail.trim().length > 0 &&
    contactMessage.trim().length > 0;
  const contactMailto = `mailto:${profile.email}?subject=${encodeURIComponent(
    `Portfolio contact - ${contactName.trim() || 'Someone'}`,
  )}&body=${encodeURIComponent(
    `Hi ${profile.displayName},\n\nMy name is ${contactName.trim()}.\nYou can reach me back at ${contactEmail.trim()}.\n\n${contactMessage.trim()}\n\nLet's make it happen!`,
  )}`;
  const markClicked = (id: string) => {
    setClickedButtons((current) => ({ ...current, [id]: true }));
  };
  const clickedClass = (id: string) => (clickedButtons[id] ? ' clicked-cta' : '');
  const handlePressBleed = (event: PointerEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    const pressTarget = target.closest<HTMLElement>('.press-bleed');

    if (!pressTarget || pressTarget.getAttribute('aria-disabled') === 'true') {
      return;
    }

    if ('disabled' in pressTarget && pressTarget.disabled) {
      return;
    }

    pressTarget.dataset.pressing = 'false';
    window.requestAnimationFrame(() => {
      pressTarget.dataset.pressing = 'true';
      window.setTimeout(() => {
        delete pressTarget.dataset.pressing;
      }, 440);
    });
  };

  return (
    <main className="min-h-screen bg-[#f1eee7] text-[#181612]" onPointerDownCapture={handlePressBleed}>
      <ProgressPlayer />
      <nav className="fixed inset-x-4 top-4 z-40 flex items-center justify-between gap-4">
        <a
          href="#top"
          aria-label="Back to top"
          className="font-display text-lg font-light italic tracking-[-0.01em] text-[#181612]/75 transition-colors hover:text-[#181612] sm:text-xl"
        >
          {'//tuananh'}
        </a>
        <div className="hidden gap-2 font-mono text-[10px] font-black uppercase tracking-[0.16em] text-[#181612] md:flex">
          {[
            ['Work', '#work'],
            ['Stack', '#stack'],
            ['Contact', '#contact'],
          ].map(([label, href]) => {
            const clickId = `nav-${label.toLowerCase()}`;

            return (
              <a
                key={href}
                href={href}
                onClick={() => markClicked(clickId)}
                className={`press-bleed border border-[#181612]/15 bg-[#f1eee7]/80 px-3 py-2 backdrop-blur-xl transition-colors hover:bg-[#181612] hover:text-[#f1eee7]${clickedClass(clickId)}`}
              >
                {label}
              </a>
            );
          })}
        </div>
      </nav>

      <motion.section
        id="top"
        className="mx-auto grid max-w-[1600px] gap-6 px-5 pb-8 pt-20 sm:gap-10 sm:px-8 lg:min-h-screen lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10 lg:py-8"
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
          <h1 className="max-w-5xl font-display text-5xl font-bold uppercase leading-[1.02] tracking-normal sm:text-6xl">
            Java
            <br />
            Backend
            <br />
            Engineer
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-semibold leading-snug tracking-[-0.035em] text-[#181612]/70 sm:text-2xl">
            {profile.displayName} - {profile.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#work"
              onClick={() => markClicked('hero-work')}
              className={`press-bleed bg-[#181612] px-5 py-3 font-mono text-xs font-black uppercase tracking-[0.16em] text-[#f1eee7] transition-colors hover:bg-[#2a2722] [--clicked-fill:rgba(241,238,231,0.14)] [--press-color:rgba(241,238,231,0.18)]${clickedClass('hero-work')}`}
            >
              View work
            </a>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => markClicked('hero-resume')}
              className={`press-bleed border border-[#181612] px-5 py-3 font-mono text-xs font-black uppercase tracking-[0.16em] transition-colors hover:bg-[#181612] hover:text-[#f1eee7]${clickedClass('hero-resume')}`}
            >
              Resume
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={() => markClicked('hero-linkedin')}
              className={`press-bleed border border-[#181612]/30 px-5 py-3 font-mono text-xs font-black uppercase tracking-[0.16em] text-[#181612]/70 transition-colors hover:border-[#181612] hover:text-[#181612]${clickedClass('hero-linkedin')}`}
            >
              LinkedIn
            </a>
          </div>
          <div className="mt-8 hidden max-w-3xl gap-px bg-[#181612]/12 sm:mt-10 sm:grid sm:grid-cols-3">
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
          className="-order-1 grid gap-5 sm:gap-8 lg:order-none"
          variants={{
            hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: revealTransition },
          }}
        >
          <PortraitStage />
          <div className="hidden grid-cols-[80px_1fr] gap-4 border-t border-[#181612]/10 pt-5 font-mono text-xs uppercase tracking-[0.14em] sm:grid">
            <span className="font-black text-[#181612]/40">Role</span>
            <span className="font-black">{profile.title}</span>
            <span className="font-black text-[#181612]/40">Work</span>
            <span className="font-black">Enterprise backend, APIs, production stability</span>
          </div>
        </motion.div>
      </motion.section>

      <section id="work" className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
        <SectionNumber>selected work</SectionNumber>
        <div className="mt-8 divide-y divide-[#181612]/12 border-y border-[#181612]/12">
          {featuredProjects.map((project, index) => {
            const number = String(index + 1).padStart(2, '0');
            const isOpen = openProject === project.name;

            return (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 34, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.16, margin: '0px 0px -8% 0px' }}
              transition={{
                opacity: { duration: 0.55, delay: index * 0.04 },
                y: { duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] },
                filter: { duration: 0.55, delay: index * 0.04 },
              }}
              className="py-8"
            >
              <div className="grid gap-6 sm:grid-cols-[90px_0.8fr_1.2fr] sm:items-start">
                <p className="font-mono text-sm font-black text-[#181612]/35">{number}</p>
                <div>
                  <h2 className="font-display text-3xl font-bold uppercase leading-[1.08] tracking-normal sm:text-5xl">
                    {project.name}
                  </h2>
                  <div className="mt-5 flex flex-wrap gap-2 font-mono text-[10px] font-black uppercase tracking-[0.16em] text-[#181612]/55">
                    <span className="border border-[#181612]/15 px-3 py-2">{project.period}</span>
                    <span className="border border-[#181612]/15 px-3 py-2">{project.role}</span>
                  </div>
                </div>
                <div>
                  <motion.button
                    type="button"
                    aria-label={`Open details for ${project.name}`}
                    onClick={() => setOpenProject(isOpen ? '' : project.name)}
                    whileHover={{ y: -6 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                    className="group relative mb-6 block aspect-[16/10] w-full cursor-pointer overflow-hidden border border-[#181612]/15 bg-[#e6e1d8] text-left"
                  >
                    {/* Use a native image here so scroll-restored reloads do not wait on the Next image optimizer. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.imageUrl}
                      alt={`${project.name} visual concept`}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover opacity-95 grayscale transition duration-500 group-hover:scale-[1.035] group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,22,18,0)_35%,rgba(24,22,18,0.62)_100%)] opacity-80 transition-opacity group-hover:opacity-95" />
                    <div className="absolute left-4 top-4 rounded-full bg-[#d84a32] px-3 py-2 font-mono text-[10px] font-black uppercase tracking-[0.16em] text-[#f1eee7]">
                      {number}
                    </div>
                    <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4">
                      <span className="max-w-[70%] font-mono text-[10px] font-black uppercase tracking-[0.16em] text-[#f1eee7]/80">
                        Project visual
                      </span>
                    </div>
                  </motion.button>
                  <p className="max-w-2xl text-lg font-semibold leading-relaxed text-[#181612]/65">
                    {project.description}
                  </p>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`project-details-${index}`}
                    onClick={() => {
                      markClicked(`project-details-${project.name}`);
                      setOpenProject(isOpen ? '' : project.name);
                    }}
                    className={`press-bleed mt-6 inline-flex cursor-pointer items-center gap-3 border border-[#181612] px-4 py-3 font-mono text-xs font-black uppercase tracking-[0.16em] transition-colors hover:bg-[#181612] hover:text-[#f1eee7]${clickedClass(`project-details-${project.name}`)}`}
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
      </section>

      <motion.section id="stack" className="bg-[#181612] px-5 py-12 text-[#f1eee7] sm:px-8 sm:py-16 lg:px-10" {...revealProps}>
        <div className="mx-auto grid max-w-[1600px] gap-8">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
            <SectionNumber>technical stack</SectionNumber>
              <h2 className="mt-5 font-display text-3xl font-bold uppercase leading-[1.02] tracking-normal sm:text-6xl">
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

      <motion.section id="contact" className="mx-auto grid max-w-[1600px] gap-10 overflow-hidden px-5 py-20 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10" {...revealProps}>
        <div>
          <SectionNumber>contact</SectionNumber>
          <h2 className="mt-6 font-display text-4xl font-bold uppercase leading-[1.02] tracking-normal sm:text-6xl">
            Contact
            <br />
            <span className="mt-2 block whitespace-nowrap font-body text-[clamp(1.05rem,2.6vw,2.2rem)] font-extrabold normal-case leading-tight tracking-[-0.02em] text-[#181612]/85">
              {profile.email}
            </span>
            <br />
            <span className="text-[clamp(1.85rem,8vw,4.2rem)] tracking-[-0.02em]">{profile.location}</span>
          </h2>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            onClick={() => markClicked('contact-linkedin')}
            className={`press-bleed mt-6 inline-flex border border-[#181612]/30 px-5 py-3 font-mono text-xs font-black uppercase tracking-[0.16em] text-[#181612]/70 transition-colors hover:border-[#181612] hover:bg-[#181612] hover:text-[#f1eee7]${clickedClass('contact-linkedin')}`}
          >
            LinkedIn
          </a>
        </div>
        <div className="flex min-w-0 flex-col justify-end gap-6 border-[#181612]/12 sm:border-l sm:pl-6">
          <div className="max-w-3xl text-2xl font-semibold leading-[1.35] tracking-[-0.02em] text-[#181612]/76 sm:text-4xl">
            Hi {profile.displayName}, my name is{' '}
            <input
              aria-label="Your name"
              value={contactName}
              onChange={(event) => setContactName(event.target.value)}
              placeholder="your name"
              className="my-1 inline-block w-full min-w-0 border-0 border-b border-[#181612]/25 bg-transparent px-1 font-display italic text-[#181612] outline-none transition-colors placeholder:text-[#181612]/30 focus:border-[#181612] sm:w-auto sm:min-w-[8ch]"
            />
            {' '}You can reach me back at{' '}
            <input
              aria-label="Email address"
              value={contactEmail}
              onChange={(event) => setContactEmail(event.target.value)}
              placeholder="email address"
              inputMode="email"
              className="my-1 inline-block w-full min-w-0 border-0 border-b border-[#181612]/25 bg-transparent px-1 font-display italic text-[#181612] outline-none transition-colors placeholder:text-[#181612]/30 focus:border-[#181612] sm:w-auto sm:min-w-[12ch]"
            />
          </div>
          <textarea
            aria-label="Message"
            value={contactMessage}
            onChange={(event) => setContactMessage(event.target.value)}
            placeholder="Write the full message here..."
            rows={5}
            className="min-h-32 w-full resize-none border-0 border-l-2 border-[#181612]/20 bg-transparent px-4 py-3 text-lg font-semibold leading-relaxed text-[#181612] outline-none transition-colors placeholder:text-[#181612]/30 focus:border-[#181612] sm:min-h-40 sm:px-5 sm:py-4 sm:text-2xl"
          />
          <p className="text-2xl font-semibold leading-[1.35] tracking-[-0.02em] text-[#181612]/76 sm:text-4xl">
            Let&apos;s make it happen!
          </p>

          <motion.button
            type="button"
            disabled={!isContactReady}
            onClick={() => {
              if (isContactReady) {
                markClicked('contact-send');
                window.location.href = contactMailto;
              }
            }}
            animate={{
              opacity: isContactReady ? 1 : 0.42,
              y: isContactReady ? 0 : 4,
              filter: isContactReady ? 'blur(0px)' : 'blur(0.5px)',
            }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={`press-bleed w-fit bg-[#181612] px-5 py-3 font-mono text-xs font-black uppercase tracking-[0.16em] text-white shadow-[inset_0_0_0_1px_rgba(241,238,231,0.18)] transition-colors hover:bg-[#2a2722] disabled:cursor-not-allowed disabled:hover:bg-[#181612] [--clicked-fill:rgba(241,238,231,0.14)] [--press-color:rgba(241,238,231,0.18)]${clickedClass('contact-send')}`}
          >
            Send
          </motion.button>
        </div>
      </motion.section>

      <footer className="border-t border-[#f1eee7]/12 bg-[#181612]">
        <div className="mx-auto flex max-w-[1600px] justify-center px-5 py-8 font-mono text-[10px] font-black uppercase tracking-[0.16em] text-[#f1eee7]/55 sm:px-8 lg:px-10">
          <p className="inline-flex flex-wrap items-center justify-center gap-2 text-center">
            © 2026 · Built with
            <span aria-label="love" role="img" className="text-[#d84a32]">
              ♥
            </span>
            by Tuấn Anh
          </p>
        </div>
      </footer>
    </main>
  );
}
