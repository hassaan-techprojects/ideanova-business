
import Image from "next/image";
import Link from "next/link";

const focusAreas = [
  {
    number: "01",
    icon: "lightbulb",
    title: "Entrepreneurship Development",
    description:
      "Cultivating entrepreneurial mindsets, leadership and business acumen.",
  },
  {
    number: "02",
    icon: "rocket",
    title: "Startup & Venture Creation",
    description:
      "Encouraging students to develop, pitch and explore their business ideas.",
  },
  {
    number: "03",
    icon: "sparkles",
    title: "Innovation & Creativity",
    description:
      "Promoting creative thinking, problem-solving and innovative business solutions.",
  },
  {
    number: "04",
    icon: "globe",
    title: "Industry Interaction",
    description:
      "Connecting students with entrepreneurs, startup founders, investors and industry professionals.",
  },
  {
    number: "05",
    icon: "graduation",
    title: "Experiential Learning",
    description:
      "Organising business competitions, startup challenges, workshops, networking sessions and entrepreneurial events.",
  },
  {
    number: "06",
    icon: "users",
    title: "Leadership & Collaboration",
    description:
      "Developing teamwork, communication, decision-making and leadership capabilities.",
  },
];

const boardMembers = [
  { designation: "President", name: "Mohamed Arshan K", number: "01"},
  { designation: "Vice President", name: "Abhishek K", number: "02" },
  { designation: "Secretary", name: "Vaishnavi K Revankar", number: "03" },
  { designation: "Treasurer", name: "Mohammed Sulaiman", number: "04" },
  { designation: "Lead Coordinator", name: "Kuldeep Paul", number: "05" },
];

function Icon({
  name,
  size = 22,
}: {
  name: string;
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "home":
      return (
        <svg {...common}>
          <path d="m3 10 9-7 9 7" />
          <path d="M5 9v12h14V9M9 21v-7h6v7" />
        </svg>
      );
    case "news":
      return (
        <svg {...common}>
          <path d="M5 4h14v16H5z" />
          <path d="M8 8h8M8 12h8M8 16h5" />
        </svg>
      );
    case "quiz":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9a2.6 2.6 0 1 1 4.5 1.8c-1.2 1.1-2 1.4-2 3" />
          <path d="M12 17.5h.01" />
        </svg>
      );
    case "lightbulb":
      return (
        <svg {...common}>
          <path d="M9 18h6M10 22h4M8.5 14.5a6 6 0 1 1 7 0c-.8.6-1.2 1.5-1.2 2.5h-4.6c0-1-.4-1.9-1.2-2.5Z" />
        </svg>
      );
    case "rocket":
      return (
        <svg {...common}>
          <path d="M5 15c-1.5 1-2 3-2 4 1 0 3-.5 4-2" />
          <path d="M9 15 5 11c2-5 7-8 14-8 0 7-3 12-8 14l-2-2Z" />
          <circle cx="14.5" cy="9.5" r="2" />
          <path d="m8 16-1 5 5-2" />
        </svg>
      );
    case "sparkles":
      return (
        <svg {...common}>
          <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" />
          <path d="m19 14 1.1 2.9L23 18l-2.9 1.1L19 22l-1.1-2.9L15 18l2.9-1.1L19 14Z" />
        </svg>
      );
    case "globe":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
        </svg>
      );
    case "graduation":
      return (
        <svg {...common}>
          <path d="m2 9 10-5 10 5-10 5L2 9Z" />
          <path d="M6 11v5c4 3 8 3 12 0v-5M22 9v6" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20v-1a6 6 0 0 1 12 0v1H3Z" />
          <path d="M16 5a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 5v1h-3" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 19 19 5M7 5h12v12" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="m5 12 4 4L19 6" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Home() {
  return (
    <main className="ideanova-page">
      {/* HEADER */}

      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="brand" aria-label="IDEANOVA home">
            <Image
              src="/ideanova-logo.png"
              alt="IDEANOVA - Entrepreneurship Club"
              width={240}
              height={160}
              priority
              className="ideanova-logo"
            />
          </Link>

          <nav className="main-navigation" aria-label="Main navigation">
            <Link href="/" className="nav-link active">
              <Icon name="home" size={16} />
              <span>About Club</span>
            </Link>

            <Link href="/news" className="nav-link">
              <Icon name="news" size={16} />
              <span>Business News</span>
            </Link>

            <Link href="/quiz" className="nav-link">
              <Icon name="quiz" size={16} />
              <span>Quiz Arena</span>
            </Link>
          </nav>

          <a href="#about" className="header-cta">
            Explore Club <Icon name="arrow" size={15} />
          </a>
        </div>
      </header>

      {/* HERO */}

      <section className="hero-section">
        <div className="hero-grid-pattern" />

        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-kicker">
              <span className="status-dot" />
              PRESIDENCY BUSINESS SCHOOL
            </div>

            <h1 className="hero-title">
              Ideas are
              <br />
              just the <span>beginning.</span>
            </h1>

            <p className="hero-description">
              A space for ambitious thinkers, creative minds and future
              entrepreneurs to turn bold ideas into meaningful impact.
            </p>

            <div className="hero-actions">
              <a href="#about" className="button-primary">
                Discover IDEANOVA
                <Icon name="arrow" size={17} />
              </a>

              <a href="#focus" className="button-text">
                Explore what we do
                <span>↓</span>
              </a>
            </div>

            {/* IISc BOOT CAMP REGISTRATION */}

            <div className="mt-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-[#ed7839]/30 bg-white/[0.96] shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
              <div className="p-6 sm:p-8">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#ed7839]/30 bg-[#ed7839]/[0.07] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#d96529]">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#ed7839]" />
                  Student Registration Open
                </span>

                <h2 className="mt-5 text-2xl font-semibold leading-tight text-[#171916] sm:text-3xl">
                  Two-Day Boot Camp on Ideation
                </h2>

                <p className="mt-3 text-sm font-semibold text-[#d96529]">
                  IISc Bengaluru · 25–26 November 2026
                </p>

                <p className="mt-4 text-sm leading-7 text-[#555650]">
                  Dear Students, please use the registration form to register
                  for the Two-Day Boot Camp on Ideation at IISc Bengaluru.
                  Take this opportunity to explore ideas, develop creative
                  thinking and strengthen your entrepreneurial perspective.
                </p>

                <div className="mt-5 border-l-2 border-[#ed7839] pl-4">
                  <p className="text-sm font-semibold text-[#171916]">
                    Dr. Adil Ellikkal
                  </p>
                  <p className="mt-1 text-xs text-[#77786f]">
                    Entrepreneurship Club Coordinator
                  </p>
                </div>

                <div className="mt-7 flex flex-col items-start gap-3">
                 <a
  href="https://forms.gle/PJksWnT7RNWrJUep8"
  target="_blank"
  rel="noopener noreferrer"
  className="register inline-flex min-h-14 items-center justify-center gap-3 rounded-full px-9 py-4 text-base font-bold shadow-[0_0_24px_rgba(237,120,57,0.35)] ring-4 ring-[#ed7839]/10 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03]"
>
  Register Now
  <Icon name="arrow" size={18} />
</a>
                  <span className="text-xs text-[#77786f]">
                    Opens Google Forms in a new tab
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 border-t border-[#ed7839]/15 bg-[#ed7839]/[0.04] px-6 py-4 text-[10px] font-medium tracking-[0.12em] text-[#77786f] sm:flex-row sm:items-center sm:justify-between sm:px-8">
                <span>ORGANISED THROUGH IDEANOVA</span>
                <span>IDEAS → LEARNING → INNOVATION</span>
              </div>
            </div>

            <div className="hero-tagline">
              <span className="tagline-line" />
              WHERE IDEAS BECOME IMPACT.
            </div>
          </div>

          <div className="hero-art" aria-label="IDEANOVA brand graphic">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="art-center">
              <span>IDEA</span>
              <strong>NOVA.</strong>
              <div className="art-center-line" />
              <small>THINK · CREATE · LEAD</small>
            </div>
            <span className="art-star star-one">✳</span>
            <span className="art-star star-two">✳</span>
            <span className="art-coordinate">13°04&apos; N / 80°17&apos; E</span>
            <span className="art-side-label">BUILT ON IDEAS</span>
          </div>
        </div>

        <div className="hero-bottom">
          <span>01 / INTRODUCTION</span>
          <span>IDEAS → INNOVATION → IMPACT</span>
          <a href="#about">SCROLL TO EXPLORE ↓</a>
        </div>
      </section>

      {/* ABOUT */}

      <section className="section about-section" id="about">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <span className="eyebrow">01 / ABOUT THE CLUB</span>
              <h2 className="section-title">
                A place for people
                <br />
                who <span>think differently.</span>
              </h2>
            </div>

            <span className="section-index">01 — 08</span>
          </div>

          <div className="about-layout">
            <div className="about-intro">
              <span className="about-big-mark">IN</span>
              <p>
                The Entrepreneurship Club of
                <br />
                Presidency Business School.
              </p>
              <div className="about-mini-line" />
              <span className="about-motto">THINK BIG. BUILD BOLD.</span>
            </div>

            <div className="about-copy">
              <p>
                IDEANOVA is the Entrepreneurship Club of{" "}
                <strong>Presidency Business School</strong>, established
                with the vision of nurturing entrepreneurial thinking,
                encouraging innovation and empowering students to transform
                their ideas into meaningful opportunities.
              </p>

              <p>
                The club serves as a dynamic platform for aspiring
                entrepreneurs, creative thinkers and future business leaders
                to explore the world of startups, business innovation and
                entrepreneurship.
              </p>

              <p>
                Through entrepreneurial activities, startup challenges,
                business competitions, workshops, industry interactions and
                collaborative initiatives, IDEANOVA aims to bridge the gap
                between classroom learning and real-world business
                experiences.
              </p>

              <p>
                IDEANOVA believes that entrepreneurship is not just about
                starting a business; it is about identifying opportunities,
                solving problems, taking initiative and creating value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INSTITUTION */}

      <section className="institution-section">
        <div className="container institution-inner">
          <div className="institution-icon">
            <Icon name="graduation" size={30} />
          </div>

          <div className="institution-copy">
            <span className="eyebrow">02 / OUR INSTITUTION</span>
            <h2>Presidency Business School.</h2>
          </div>

          <span className="institution-number">02</span>
        </div>
      </section>

      {/* VISION & MISSION */}

      <section className="section purpose-section">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <span className="eyebrow">03 / OUR PURPOSE</span>
              <h2 className="section-title">
                Direction with
                <br />
                <span>determination.</span>
              </h2>
            </div>
            <span className="section-index">03 — 04</span>
          </div>

          <div className="purpose-grid">
            <article className="purpose-card vision-card">
              <div className="purpose-card-top">
                <span className="purpose-label">03 / VISION</span>
                <span className="purpose-icon">
                  <Icon name="lightbulb" size={24} />
                </span>
              </div>

              <h3>Our Vision</h3>

              <p>
                To build a dynamic ecosystem of innovative thinkers,
                aspiring entrepreneurs and future business leaders who
                transform ideas into impactful ventures and create
                meaningful change in society.
              </p>

              <span className="purpose-watermark">V</span>
            </article>

            <article className="purpose-card mission-card">
              <div className="purpose-card-top">
                <span className="purpose-label">04 / MISSION</span>
                <span className="purpose-icon">
                  <Icon name="rocket" size={24} />
                </span>
              </div>

              <h3>Our Mission</h3>

              <p>
                To inspire and empower students to explore entrepreneurship,
                develop innovative thinking and turn their ideas into
                actionable opportunities through experiential learning,
                startup initiatives, industry interactions, mentorship and
                collaborative experiences.
              </p>

              <span className="purpose-watermark">M</span>
            </article>
          </div>
        </div>
      </section>

      {/* FOCUS AREAS */}

      <section className="section focus-section" id="focus">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <span className="eyebrow">05 / WHAT WE DO</span>
              <h2 className="section-title">
                Turning ideas
                <br />
                into <span>action.</span>
              </h2>
              <p className="section-lead">
                Six core areas that shape our entrepreneurial ecosystem.
              </p>
            </div>

            <span className="section-index">SIX FOCUS AREAS</span>
          </div>

          <div className="focus-grid">
            {focusAreas.map((area) => (
              <article className="focus-card" key={area.number}>
                <div className="focus-top">
                  <span className="focus-number">{area.number}</span>
                  <span className="focus-icon">
                    <Icon name={area.icon} size={24} />
                  </span>
                </div>

                <h3>{area.title}</h3>
                <p>{area.description}</p>

                <div className="focus-bottom">
                  <span>IDEANOVA / CORE AREA</span>
                  <Icon name="arrow" size={16} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}

      <section className="section leadership-section" id="people">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <span className="eyebrow">06 / LEADERSHIP & BOARD MEMBERS</span>
              <h2 className="section-title">
                The people behind
                <br />
                <span>the possibilities.</span>
              </h2>
              <p className="section-lead">
                IDEANOVA is guided by a dedicated leadership team responsible
                for driving the club&apos;s vision, activities and initiatives.
              </p>
            </div>

            <span className="section-index">THE TEAM</span>
          </div>

          <div className="board-heading">
            <span>OFFICE BEARERS</span>
            <span>THE IDEANOVA LEADERSHIP</span>
          </div>

          <div className="board-list">
            {boardMembers.map((member) => (
              <article className="board-row" key={member.number}>
                <span className="board-number">{member.number}</span>
                <h3>{member.name}</h3>
                <span className="board-role">{member.designation}</span>
                <span className="board-arrow">
                  <Icon name="arrow" size={19} />
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FACULTY */}

      <section className="section faculty-section">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <span className="eyebrow">
                07 / FACULTY & INSTITUTIONAL LEADERSHIP
              </span>
              <h2 className="section-title">
                Guided by
                <br />
                <span>experience.</span>
              </h2>
            </div>
          </div>

          <div className="faculty-grid">
            <article className="faculty-card">
              <span className="faculty-icon">
                <Icon name="graduation" size={25} />
              </span>
              <span className="faculty-role">FACULTY COORDINATOR</span>
              <h3>Dr. Adil Ellikkal</h3>
              <span className="faculty-line" />
            </article>

            <article className="faculty-card">
              <span className="faculty-icon">
                <Icon name="users" size={25} />
              </span>
              <span className="faculty-role">DEAN</span>
              <h3>Krishna Kumar</h3>
              <span className="faculty-line" />
            </article>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}

      <section className="philosophy-section">
        <div className="philosophy-pattern" />

        <div className="container philosophy-inner">
          <span className="eyebrow">08 / OUR GUIDING PHILOSOPHY</span>

          <h2>
            IDEATE<span>.</span>
            <br />
            INNOVATE<span>.</span>
            <br />
            EXECUTE<span>.</span>
          </h2>

          <div className="philosophy-content">
            <div className="philosophy-rule" />
            <div>
              <p>
                We believe every great venture begins with an idea, grows
                through innovation and becomes successful through execution.
              </p>

              <p>
                IDEANOVA is more than a college club; it is a community where
                curiosity meets creativity, ideas find direction and aspiring
                entrepreneurs discover their potential.
              </p>

              <h3>IDEANOVA – Where Ideas Become Impact.</h3>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="site-footer">
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand">
              <Link
                href="/"
                className="footer-brand-lockup"
                aria-label="IDEANOVA home"
              >
                <Image
                  src="/ideanova-logo.png"
                  alt="IDEANOVA - Entrepreneurship Club"
                  width={240}
                  height={160}
                  className="footer-logo"
                />
              </Link>

              <p>
                The Entrepreneurship Club of Presidency Business School.
                Where ideas become impact.
              </p>
            </div>

            <div className="footer-column">
              <span>EXPLORE</span>
              <Link href="/">About Club</Link>
              <Link href="/news">Business News</Link>
              <Link href="/quiz">Quiz Arena</Link>
            </div>

            <div className="footer-column">
              <span>DISCOVER</span>
              <a href="#about">About the Club</a>
              <a href="#focus">Core Focus Areas</a>
              <a href="#people">Leadership</a>
            </div>

            <div className="footer-column footer-contact">
              <span>OUR PHILOSOPHY</span>
              <p>IDEATE. INNOVATE. EXECUTE.</p>
              <p>Think big. Build bold.</p>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 IDEANOVA. All rights reserved.</span>
            <span>MADE FOR IDEAS THAT MATTER.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
