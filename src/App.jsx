import { useEffect, useRef, useState } from 'react';
import Particles from './Particles';
import GooeyNav from "./navbar";
import CustomCursor from "./CustomCursor";
import ProfileCard from "./ProfileCard";
import SpotlightCard from "./SpotlightCard";
import TiltCard from "./TiltCard";
import LineSidebar from "./LineSidebar";
import RotatingText from "./RotatingText";
import heroImage from "./assets/user_profile.jpg";
import hrDashboard from "./assets/board-1.png";
import escortsKubota from "./assets/board-2.png";
import touristaTravels from "./assets/Tourista.png";
import universalRemote from "./assets/universal-remote.png";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

const items = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Expertise", href: "#expertise" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const statsData = [
  { label: "Projects Built", value: 4, suffix: "+" },
  { label: "Technologies", value: 15, suffix: "+" },
  { label: "Lines of Code", value: 10, suffix: "k+" },
  { label: "Internships", value: 1, suffix: "" },
];

const skills = [
  { title: "Languages", items: ["Python", "JavaScript", "C", "C++", "SQL"], color: "rgba(255,0,255,0.14)", level: 85 },
  { title: "Frontend", items: ["React.js", "HTML5", "CSS3", "Bootstrap", "Responsive Design"], color: "rgba(0,255,255,0.10)", level: 90 },
  { title: "Backend", items: ["Django", "REST APIs"], color: "rgba(168,85,247,0.14)", level: 75 },
  { title: "Databases", items: ["MySQL", "MongoDB"], color: "rgba(251,191,36,0.10)", level: 78 },
  { title: "Tools", items: ["Git", "GitHub", "VS Code", "Postman", "Chart.js"], color: "rgba(34,211,238,0.10)", level: 82 },
  { title: "Concepts", items: ["OOP", "CRUD", "JWT Auth", "API Integration", "DB Design"], color: "rgba(245,101,101,0.10)", level: 80 },
];

const industryExpertise = [
  "Full Stack Web Development", "Dashboard Development",
  "Business Management Systems", "REST API Development & Integration",
  "Frontend Development with React.js", "Backend Development with Django",
  "Database Design & Management", "Responsive Web Design",
  "Authentication & User Management", "Version Control using Git & GitHub",
];

const projects = [
  {
    title: "HR Dashboard",
    tech: "React.js · Django · MySQL",
    description: "Production-ready HR dashboard with employee management, salary details, and analytics visualizations.",
    image: hrDashboard,
    link: "#",
  },
  {
    title: "Escorts Kubota Dashboard",
    tech: "React.js · Django · MySQL",
    description: "Enterprise dashboard for Escorts Kubota with sales, orders, and visitor analytics.",
    image: escortsKubota,
    link: "#",
  },
  {
    title: "Universal Remote Dashboard",
    tech: "Python · Home Assistant",
    description: "Custom Home Assistant integration supporting TV, AVR, source switching, navigation controls, and live device status.",
    image: universalRemote,
    imagePosition: "right center",
    link: "#",
  },
  {
    title: "Tourista Travels",
    tech: "React.js · HTML · CSS · JS",
    description: "Responsive travel booking website with package listings, booking interface, destination pages, and modern UI animations.",
    image: touristaTravels,
    link: "https://nmayank1621.github.io/website/",
  },
];

const experience = [
  {
    title: "Full Stack Developer Intern",
    company: "Escorts Kubota",
    date: "Jun 2026 – Jul 2026",
    points: [
      "Developed two production-ready business dashboards with React.js, Django, and MySQL.",
      "Designed responsive UI components and integrated backend REST APIs.",
      "Implemented JWT authentication, CRUD operations, and database schemas.",
      "Collaborated with senior developers to test, debug, and deploy features.",
      "Improved dashboard performance and usability for internal business teams.",
    ],
  },
];

const achievements = [
  "Full Stack Developer Intern at Escorts Kubota — Jun 2026",
  "Built multiple production full-stack apps using React.js & Django",
  "Qualified JEE Main — 86 Percentile",
];

const education = [
  {
    degree: "B.Tech — Computer Science & Engineering",
    institution: "IILM University, Greater Noida",
    date: "2023 – 2027",
  },
];

/* ─────────────────────────────────────────── */
export default function App() {
  const heroTitleRef = useRef(null);
  const heroSubRef = useRef(null);
  const heroBadgeRef = useRef(null);
  const heroCTARef = useRef(null);
  const trackRef = useRef(null);
  const projectsTriggerRef = useRef(null);
  const heroRightRef = useRef(null);
  const heroLeftRef = useRef(null);
  const timelineLineRef = useRef(null);
  const [activeNavIndex, setActiveNavIndex] = useState(0);

  useEffect(() => {
    /* ── 1. Lenis smooth scroll ── */
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.on("scroll", () => ScrollTrigger.update());
    const ticker = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    /* ── 2. Scroll-based active nav ── */
    const sectionIds = items.map((item) => item.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionIds.indexOf(entry.target.id);
            if (idx !== -1) setActiveNavIndex(idx);
          }
        });
      },
      { root: null, rootMargin: "-20% 0px -65% 0px", threshold: 0 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    /* ── 3. Hero entrance ── */
    const titleEl = heroTitleRef.current;
    if (titleEl) {
      const words = titleEl.innerText.trim().split(/[\s\u00a0]+/);
      titleEl.innerHTML = words
        .map(
          (w) =>
            `<span class="hero-word" style="display:inline-block;overflow:hidden;vertical-align:bottom;margin-right:0.25em">` +
            `<span class="hero-word-inner" style="display:inline-block">${w}</span></span>`
        )
        .join("");
      gsap.fromTo(
        titleEl.querySelectorAll(".hero-word-inner"),
        { y: "110%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.95, stagger: 0.12, ease: "power4.out", delay: 0.3 }
      );
    }
    gsap.fromTo(heroBadgeRef.current, { y: -12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.2 });
    gsap.fromTo(heroSubRef.current, { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 1.1 });
    gsap.fromTo(heroCTARef.current, { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 1.3 });

    /* ── 4. Hero parallax depth ── */
    if (heroRightRef.current) {
      gsap.to(heroRightRef.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: { trigger: "#home", start: "top top", end: "bottom top", scrub: 1 },
      });
    }


    /* ── 5. Section divider line scale ── */
    gsap.utils.toArray(".section-divider").forEach((line) => {
      gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
      ScrollTrigger.create({
        trigger: line,
        start: "top 92%",
        once: true,
        onEnter: () => gsap.to(line, { scaleX: 1, duration: 1.1, ease: "power3.inOut" }),
      });
    });

    /* ── 6. h2 character-split reveal helper ── */
    function charReveal(selector) {
      gsap.utils.toArray(selector).forEach((el) => {
        const originalText = el.innerText;
        el.innerHTML = originalText
          .split("")
          .map((ch) =>
            ch === " "
              ? `<span style="display:inline-block;white-space:pre"> </span>`
              : `<span class="h2-wrap" style="display:inline-block;overflow:hidden;vertical-align:bottom">` +
              `<span class="h2-char" style="display:inline-block">${ch}</span></span>`
          )
          .join("");
        gsap.set(el.querySelectorAll(".h2-char"), { y: "115%" });
        ScrollTrigger.create({
          trigger: el,
          start: "top 89%",
          once: true,
          onEnter: () =>
            gsap.to(el.querySelectorAll(".h2-char"), {
              y: "0%",
              duration: 0.7,
              stagger: 0.028,
              ease: "power4.out",
            }),
        });
      });
    }

    /* ── 7. Generic fade-up reveal ── */
    function revealOnScroll(targets, vars = {}) {
      const els = gsap.utils.toArray(targets);
      if (!els.length) return;
      gsap.set(els, { opacity: 0, y: vars.y ?? 32 });
      ScrollTrigger.create({
        trigger: els[0],
        start: "top 88%",
        once: true,
        onEnter: () =>
          gsap.to(els, {
            opacity: 1, y: 0,
            duration: vars.duration ?? 0.7,
            stagger: vars.stagger ?? 0,
            ease: vars.ease ?? "power2.out",
          }),
      });
    }

    /* ── 8. ABOUT ── */
    charReveal("#about h2");
    revealOnScroll(["#about .about-lead", "#about .about-text"], { stagger: 0.14 });

    // Animated stat counters
    ScrollTrigger.create({
      trigger: ".about-stats",
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.utils.toArray(".stat-block").forEach((block, i) => {
          const valueEl = block.querySelector(".stat-value");
          const target = parseFloat(valueEl.dataset.value);
          const suffix = valueEl.dataset.suffix || "";
          const proxy = { val: 0 };
          gsap.to(proxy, {
            val: target,
            duration: 2,
            delay: i * 0.13,
            ease: "power2.out",
            onUpdate() { valueEl.textContent = Math.round(proxy.val) + suffix; },
          });
          gsap.fromTo(
            block,
            { opacity: 0, y: 28, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.65, delay: i * 0.13, ease: "back.out(1.5)" }
          );
        });
      },
    });

    /* ── 9. SKILLS ── */
    charReveal("#skills h2");
    gsap.utils.toArray(".skill-card").forEach((card, i) => {
      gsap.set(card, { opacity: 0, y: 44 });
      ScrollTrigger.create({
        trigger: card,
        start: "top 91%",
        once: true,
        onEnter: () => {
          gsap.to(card, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out", delay: i * 0.065 });
          const bar = card.querySelector(".skill-progress-fill");
          if (bar) {
            gsap.fromTo(
              bar,
              { width: "0%" },
              { width: `${bar.dataset.level}%`, duration: 1.2, ease: "power3.out", delay: i * 0.065 + 0.35 }
            );
          }
        },
      });
    });

    /* ── 10. EXPERTISE ── */
    charReveal("#expertise h2");
    gsap.set(".expertise-pill", { opacity: 0, scale: 0.72, y: 18 });
    ScrollTrigger.create({
      trigger: ".expertise-cloud",
      start: "top 88%",
      once: true,
      onEnter: () =>
        gsap.to(".expertise-pill", {
          opacity: 1, scale: 1, y: 0,
          duration: 0.48,
          stagger: { each: 0.04, from: "start" },
          ease: "back.out(1.7)",
        }),
    });

    /* ── 11. EXPERIENCE — timeline line draw ── */
    charReveal("#experience h2");
    if (timelineLineRef.current) {
      gsap.set(timelineLineRef.current, { scaleY: 0, transformOrigin: "top center" });
      gsap.to(timelineLineRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline",
          start: "top 72%",
          end: "bottom 38%",
          scrub: 1.2,
        },
      });
    }
    gsap.utils.toArray(".timeline-item").forEach((item, i) => {
      gsap.set(item, { opacity: 0, x: -44 });
      ScrollTrigger.create({
        trigger: item,
        start: "top 89%",
        once: true,
        onEnter: () =>
          gsap.to(item, { opacity: 1, x: 0, duration: 0.72, ease: "power3.out", delay: i * 0.1 }),
      });
    });

    /* ── 12. PROJECTS — horizontal pin-scroll ── */
    const track = trackRef.current;
    const pin = projectsTriggerRef.current;
    let pinAnim = null;
    if (track && pin) {
      const getW = () => track.scrollWidth - window.innerWidth;
      pinAnim = gsap.to(track, {
        x: () => -getW(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          pin: true,
          scrub: 0.6,
          start: "top top",
          end: () => `+=${getW()}`,
          invalidateOnRefresh: true,
        },
      });
    }

    /* ── 13. ACHIEVEMENTS ── */
    charReveal("#achievements h2");
    gsap.set(".achievement-item", { opacity: 0, x: 52 });
    ScrollTrigger.create({
      trigger: ".achievements-list",
      start: "top 88%",
      once: true,
      onEnter: () =>
        gsap.to(".achievement-item", { opacity: 1, x: 0, duration: 0.72, stagger: 0.13, ease: "power3.out" }),
    });

    /* ── 14. EDUCATION ── */
    charReveal("#education h2");

    /* ── 15. CONTACT ── */
    charReveal("#contact h2");
    revealOnScroll(".contact-link-card", { stagger: 0.08, y: 22 });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(ticker);
      ScrollTrigger.getAll().forEach((s) => s.kill());
      pinAnim?.kill();
      observer.disconnect();
    };
  }, []);

  /* ─────────────────────────────────────────── */
  return (
    <main className="app">
      <CustomCursor />

      {/* Volumetric glow blobs */}
      <div className="glow-blob glow-blob-1" />
      <div className="glow-blob glow-blob-2" />
      <div className="glow-blob glow-blob-3" />

      {/* Ambient particle background */}
      <div className="floating-background">
        <Particles
          particleColors={["#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      {/* Navbar (Desktop) */}
      <header className="navbar-container">
        <GooeyNav
          items={items}
          particleCount={15}
          particleDistances={[90, 10]}
          particleR={100}
          initialActiveIndex={0}
          animationTime={600}
          timeVariance={300}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          activeIndex={activeNavIndex}
          onActiveIndexChange={setActiveNavIndex}
        />
      </header>

      {/* Sidebar (Mobile) */}
      <div className="line-sidebar-container">
        <LineSidebar
          items={items.map((item) => item.label)}
          accentColor="#A855F7"
          textColor="#ffffff"
          markerColor="#6c6c6c"
          showIndex
          showMarker
          proximityRadius={100}
          maxShift={30}
          falloff="smooth"
          markerLength={60}
          markerGap={0}
          tickScale={0.5}
          scaleTick
          itemGap={20}
          fontSize={1.1}
          smoothing={100}
          defaultActive={activeNavIndex}
          onItemClick={(index) => {
            setActiveNavIndex(index);
            const href = items[index].href;
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: "smooth" });
          }}
        />
      </div>

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section id="home" className="hero-section">
        {/* Dot-grid overlay */}
        <div className="hero-grid-overlay" />

        {/* LEFT — Profile Card */}
        <div ref={heroLeftRef} className="hero-left">
          <ProfileCard
            name="Mayank Joshi"
            title="Full Stack Developer"
            handle="nMayank1621"
            status="Online"
            contactText="Contact Me"
            avatarUrl={heroImage}
            showUserInfo={false}
            enableTilt={true}
            enableMobileTilt={false}
            onContactClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
            }}
            behindGlowColor="rgba(125, 190, 255, 0.67)"
            behindGlowEnabled
            innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
          />
        </div>

        {/* RIGHT — text */}
        <div ref={heroRightRef} className="hero-right">
          <div ref={heroBadgeRef} className="hero-badge">
            <span className="badge-pulse" />
            Available for opportunities
          </div>

          <h1 ref={heroTitleRef} className="hero-title">
            Mayank&nbsp; Joshi
          </h1>

          <div ref={heroSubRef} className="hero-subtitle-row">
            <span className="hero-subtitle-prefix">I&apos;m a&nbsp;</span>
            <RotatingText
              texts={[
                "Full Stack Developer",
                "React.js Developer",
                "Django Developer",
                "CS Undergraduate",
                "Problem Solver",
                "API Integrator",
              ]}
              mainClassName="hero-rotating-text"
              splitLevelClassName="hero-rotating-split"
              staggerFrom="last"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-120%", opacity: 0 }}
              staggerDuration={0.025}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2200}
            />
          </div>

          <div ref={heroCTARef} className="hero-ctas">
            <a href="#projects" className="cta-primary">
              View Projects
              <span className="cta-arrow">→</span>
            </a>
            <a href="#contact" className="cta-ghost">
              Contact Me
            </a>
          </div>
        </div>

        <div className="scroll-indicator">
          <span className="scroll-mouse">
            <span className="scroll-wheel" />
          </span>
          <span className="scroll-label">Scroll Down</span>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          ABOUT
      ═══════════════════════════════════════ */}
      <div className="section-divider" />
      <section id="about" className="content-section">
        <span className="section-label">01 / About</span>
        <h2>About Me</h2>
        <div className="about-grid">
          <div className="about-text-col">
            <p className="about-lead">
              Computer Science undergraduate with hands-on experience building
              full-stack web applications using React.js, Django, MySQL, and MongoDB.
            </p>
            <p className="about-text">
              Completed a Full Stack Developer internship at Escorts Kubota, where I
              built internal business dashboards and integrated backend APIs. Strong
              foundation in responsive design, database architecture, and REST APIs —
              with a passion for creating scalable, high-quality software.
            </p>
          </div>
          <div className="about-stats">
            {statsData.map((s, i) => (
              <div key={i} className="stat-block">
                <div className="stat-value" data-value={s.value} data-suffix={s.suffix}>
                  0{s.suffix}
                </div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SKILLS
      ═══════════════════════════════════════ */}
      <div className="section-divider" />
      <section id="skills" className="content-section">
        <span className="section-label">02 / Skills</span>
        <h2>Skills</h2>
        <div className="skills-grid">
          {skills.map((skill, idx) => (
            <SpotlightCard key={idx} className="skill-card" spotlightColor={skill.color}>
              <div className="skill-card-inner">
                <h3>{skill.title}</h3>
                <ul>
                  {skill.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <div className="skill-progress">
                  <div
                    className="skill-progress-fill"
                    data-level={skill.level}
                    style={{ width: 0 }}
                  />
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          EXPERTISE
      ═══════════════════════════════════════ */}
      <div className="section-divider" />
      <section id="expertise" className="content-section">
        <span className="section-label">03 / Expertise</span>
        <h2>Industry Expertise</h2>
        <div className="expertise-cloud">
          {industryExpertise.map((item, idx) => (
            <span key={idx} className="expertise-pill">{item}</span>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          EXPERIENCE
      ═══════════════════════════════════════ */}
      <div className="section-divider" />
      <section id="experience" className="content-section">
        <span className="section-label">04 / Experience</span>
        <h2>Work Experience</h2>
        <div className="timeline">
          <div ref={timelineLineRef} className="timeline-line" />
          {experience.map((exp, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-bullet" />
              <h3>{exp.title}</h3>
              <div className="subtitle">{exp.company}</div>
              <div className="date">{exp.date}</div>
              <ul>
                {exp.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PROJECTS — horizontal pin scroll
      ═══════════════════════════════════════ */}
      <div ref={projectsTriggerRef} id="projects" className="projects-horizontal-section">
        <div className="horizontal-sticky-inner">
          <div className="horizontal-header">
            <div>
              <span className="section-label section-label-light">05 / Projects</span>
              <h2>Projects</h2>
            </div>
            <div className="scroll-hint">
              <span>Scroll to explore</span>
              <span className="scroll-hint-arrow">→</span>
            </div>
          </div>

          <div ref={trackRef} className="projects-track">
            {projects.map((project, idx) => (
              <TiltCard key={idx} className="project-horizontal-card" maxTilt={7}>
                <div className="project-image-wrapper">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-horizontal-image"
                    style={project.imagePosition ? { objectPosition: project.imagePosition } : undefined}
                  />
                  <div className="project-image-overlay" />
                </div>
                <div className="project-horizontal-content">
                  <span className="project-number">0{idx + 1}</span>
                  <h3>{project.title}</h3>
                  <div className="project-tech">{project.tech}</div>
                  <p>{project.description}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          ACHIEVEMENTS
      ═══════════════════════════════════════ */}
      <div className="section-divider" />
      <section id="achievements" className="content-section">
        <span className="section-label">06 / Achievements</span>
        <h2>Achievements</h2>
        <div className="achievements-list">
          {achievements.map((achievement, idx) => (
            <div key={idx} className="achievement-item">
              <div className="achievement-icon">★</div>
              <div className="achievement-text">{achievement}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          EDUCATION
      ═══════════════════════════════════════ */}
      <div className="section-divider" />
      <section id="education" className="content-section">
        <span className="section-label">07 / Education</span>
        <h2>Education</h2>
        <div className="timeline">
          <div className="timeline-line" />
          {education.map((edu, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-bullet" />
              <h3>{edu.degree}</h3>
              <div className="subtitle">{edu.institution}</div>
              <div className="date">{edu.date}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CONTACT
      ═══════════════════════════════════════ */}
      <div className="section-divider" />
      <section id="contact" className="content-section">
        <span className="section-label">08 / Contact</span>
        <h2>Contact Me</h2>
        <div className="contact-grid">
          <a href="mailto:nmayankjoshi@gmail.com" className="contact-link-card">
            <span className="contact-icon">📧</span>
            <span className="contact-label">Email</span>
            <span className="contact-value">nmayankjoshi@gmail.com</span>
          </a>
          <a href="https://github.com/nMayank1621" target="_blank" rel="noopener noreferrer" className="contact-link-card">
            <span className="contact-icon">🐙</span>
            <span className="contact-label">GitHub</span>
            <span className="contact-value">github.com/nMayank1621</span>
          </a>
          <a href="https://nmayankjoshi.github.io/website/" target="_blank" rel="noopener noreferrer" className="contact-link-card">
            <span className="contact-icon">🌐</span>
            <span className="contact-label">Portfolio</span>
            <span className="contact-value">nmayankjoshi.github.io/website/</span>
          </a>
          <div className="contact-link-card no-link">
            <span className="contact-icon">📱</span>
            <span className="contact-label">Phone</span>
            <span className="contact-value">+91 97178 80082</span>
          </div>
        </div>
      </section>
    </main>
  );
}