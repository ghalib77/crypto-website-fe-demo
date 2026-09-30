import Navigation from "@/components/hearthline/Navigation";
import AtlasExperience from "@/components/hearthline/atlas/AtlasExperience";
import ExploreDemo from "@/components/hearthline/ExploreDemo";
import s from "@/components/hearthline/site.module.css";
const Arrow = () => <span aria-hidden="true">↗</span>;
export default function Home() {
  return (
    <>
      <a className={s.skip} href="#main">
        Skip to content
      </a>
      <header className={s.header}>
        <div className={s.headerInner}>
          <a className={s.wordmark} href="#" aria-label="Hearthline home">
            <span className={s.mark} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            hearthline<span className={s.wordmarkPeriod}>.</span>
          </a>
          <Navigation />
          <a className={s.headerCta} href="#explore">
            Explore demo <Arrow />
          </a>
        </div>
      </header>
      <main id="main">
        <section
          className={`${s.container} ${s.hero}`}
          aria-labelledby="hero-heading"
        >
          <div className={s.heroCopy}>
            <p className={s.eyebrow}>
              <span className={s.dot} /> BUILT AROUND COLLECTIVE PROGRESS
            </p>
            <h1 id="hero-heading">
              Make every
              <br />
              community
              <br />
              <span>move visible.</span>
            </h1>
            <p className={s.heroDescription}>
              Connect decisions, commitments, and evidence in one shared project
              record.
            </p>
            <div className={s.heroActions}>
              <a className={s.primary} href="#explore">
                Explore the demo <Arrow />
              </a>
              <a className={s.secondary} href="#how-it-works">
                How it works <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className={s.concept}>
              A concept for communities moving forward, together.
            </p>
          </div>
          <AtlasExperience />
          <div className={s.heroBottom}>
            <span>FROM A SHARED IDEA TO SOMETHING REAL.</span>
            <span>
              SCROLL TO FOLLOW THE PATH <span aria-hidden="true">↓</span>
            </span>
          </div>
        </section>
        <section
          id="how-it-works"
          tabIndex={-1}
          className={`${s.container} ${s.section}`}
          aria-labelledby="how-heading"
        >
          <div className={s.sectionHeading}>
            <p className={s.eyebrow}>01 / HOW IT WORKS</p>
            <div>
              <h2 id="how-heading">
                Good work needs
                <br />a common thread.
              </h2>
              <p>
                Less scattered context. More shared understanding.
                <br className={s.desktopBreak} /> A simple way to connect what
                matters.
              </p>
            </div>
          </div>
          <div className={s.steps}>
            {[
              {
                title: "Set a direction",
                copy: "Start with a proposal everyone can understand. Keep the purpose close to the plan.",
                label: "THE DECISION",
                icon: "◇",
              },
              {
                title: "Gather commitments",
                copy: "Make ownership visible. Connect people to the work they choose to move forward.",
                label: "THE PEOPLE",
                icon: "⌘",
              },
              {
                title: "Show the work",
                copy: "Mark the milestones. Attach the evidence. Build a record the whole community can follow.",
                label: "THE PROGRESS",
                icon: "↗",
              },
            ].map((step, i) => (
              <article key={step.title}>
                <div className={s.stepTop}>
                  <span className={s.stepNumber}>0{i + 1}</span>
                  <span className={s.stepIcon} aria-hidden="true">
                    {step.icon}
                  </span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
                <span className={s.eyebrow}>{step.label}</span>
              </article>
            ))}
          </div>
        </section>
        <section
          id="explore"
          tabIndex={-1}
          className={`${s.container} ${s.section}`}
          aria-labelledby="explore-heading"
        >
          <div className={s.sectionHeading}>
            <p className={s.eyebrow}>02 / EXPLORE THE DEMO</p>
            <div>
              <h2 id="explore-heading">
                One idea. Many hands.
                <br />
                <span className={s.mutedHeading}>A visible way forward.</span>
              </h2>
              <p>
                Follow a fictional community project from intention to evidence.
                <br className={s.desktopBreak} /> Choose a workstream to see how
                the pieces connect.
              </p>
            </div>
          </div>
          <ExploreDemo />
        </section>
        <section
          id="the-record"
          tabIndex={-1}
          className={`${s.container} ${s.section}`}
          aria-labelledby="record-heading"
        >
          <div className={s.sectionHeading}>
            <p className={s.eyebrow}>03 / THE RECORD</p>
            <div>
              <h2 id="record-heading">
                Keep the why.
                <br />
                Alongside the what.
              </h2>
              <p>
                A useful record tells the whole story, not just the latest
                update.
              </p>
            </div>
          </div>
          <div className={s.records}>
            {[
              {
                kind: "Decision",
                number: "001",
                title: "Make access the starting point.",
                copy: "The community agreed to create a practical accessibility toolkit for small teams.",
                context: "Mock proposal · Scope agreed",
                detail:
                  "The fictional proposal prioritizes keyboard navigation, readable content, and reusable patterns. Its scope is a starter template and an accompanying guide.",
                symbol: "◇",
              },
              {
                kind: "Commitment",
                number: "002",
                title: "Give the next step an owner.",
                copy: "Design, Build, and Review each have a clear contribution to the shared goal.",
                context: "Mock contributor note · Ownership recorded",
                detail:
                  "Mira develops the patterns, Leo builds the template, and Asha reviews the experience. These fictional contributors illustrate ownership; no real assignments are created.",
                symbol: "⌘",
              },
              {
                kind: "Evidence",
                number: "003",
                title: "Leave something to follow.",
                copy: "Design notes, prototype summaries, and review findings keep the work connected.",
                context: "Mock review checklist · In progress",
                detail:
                  "The sample checklist covers focus order, content reflow, and readable control states. It illustrates an evidence record and does not certify a real product.",
                symbol: "↗",
              },
            ].map((r) => (
              <article key={r.kind} className={s.recordCard}>
                <div className={s.recordCardTop}>
                  <span className={s.eyebrow}>
                    {r.number} / {r.kind.toUpperCase()}
                  </span>
                  <span aria-hidden="true">{r.symbol}</span>
                </div>
                <h3>{r.title}</h3>
                <p>{r.copy}</p>
                <details>
                  <summary>
                    Read the context <span aria-hidden="true">+</span>
                  </summary>
                  <div className={s.disclosure}>
                    <p className={s.contextSource}>{r.context}</p>
                    <p>{r.detail}</p>
                  </div>
                </details>
                <span className={s.demoLabel}>DEMO DATA</span>
              </article>
            ))}
          </div>
        </section>
        <section className={`${s.container} ${s.closing}`}>
          <p className={s.eyebrow}>
            <span className={s.dot} /> THE NEXT STEP IS SHARED
          </p>
          <h2>
            A shared path makes
            <br />
            progress easier to trust.
          </h2>
          <a className={s.primary} href="#explore">
            Explore the demo <Arrow />
          </a>
          <div className={s.closingLine} aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
        </section>
      </main>
      <footer className={`${s.container} ${s.footer}`}>
        <div>
          <a href="#" className={s.wordmark}>
            hearthline<span className={s.wordmarkPeriod}>.</span>
          </a>
          <p>A fictional product concept. A real belief in shared progress.</p>
        </div>
        <div className={s.footerLinks}>
          <a href="#how-it-works">How it works</a>
          <a href="#explore">Explore</a>
          <a href="#the-record">The record</a>
          <a href="#">Back to top ↑</a>
        </div>
        <div className={s.footerBottom}>
          <span>HEARTHLINE / CONCEPT DEMO</span>
          <span>DECISIONS → COMMITMENTS → EVIDENCE</span>
        </div>
      </footer>
    </>
  );
}
