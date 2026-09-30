"use client";
import { useState, useSyncExternalStore } from "react";
import { records, milestones, type Workstream } from "@/lib/hearthline/data";
import s from "./site.module.css";
const subscribe = () => () => {};
export default function ExploreDemo() {
  const [filter, setFilter] = useState<Workstream>("all");
  const ready = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const selected = records.filter(
    (r) => filter === "all" || r.stream === filter,
  );
  return (
    <div className={s.demo}>
      <aside className={s.demoAside}>
        <p className={s.eyebrow}>WORKSTREAMS</p>
        <div className={s.filters} role="group" aria-label="Filter workstreams">
          {(["all", "Design", "Build", "Review"] as const).map((item, i) => (
            <button
              disabled={!ready}
              key={item}
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              <span>
                <span className={s.filterSymbol} aria-hidden="true">
                  {["⊞", "◇", "⌘", "◎"][i]}
                </span>
                {item === "all" ? "View all" : item}
              </span>
              <span className={s.filterCount}>
                {item === "all" ? "06" : "02"}
              </span>
            </button>
          ))}
        </div>
        <div className={s.asideNote}>
          <span className={s.dot} /> One project.
          <br />A shared direction.
        </div>
      </aside>
      <div className={s.demoBody}>
        <div className={s.demoTop}>
          <div>
            <p className={s.eyebrow}>PROJECT / 001</p>
            <h3>Open Access Toolkit</h3>
          </div>
          <span className={s.badge}>DEMO DATA</span>
        </div>
        <p className={s.demoDescription}>
          An accessibility starter kit, built together.
        </p>
        <ol className={s.milestones}>
          {milestones.map((m, i) => (
            <li key={m} data-active={selected.some((r) => r.milestone === i)}>
              <span className={s.milestoneDot}>
                {i === 0 ? "✓" : `0${i + 1}`}
              </span>
              <span>{m}</span>
            </li>
          ))}
        </ol>
        <div className={s.resultHeading}>
          <span>
            {filter === "all" ? "All workstreams" : `${filter} workstream`}
          </span>
          <span role="status" aria-live="polite">
            {selected.length} records
          </span>
        </div>
        <div className={s.demoRecords}>
          {selected.map((r) => (
            <article
              key={r.id}
              className={s.demoRecord}
              data-testid="demo-record"
            >
              <div className={s.recordIndex}>{r.id}</div>
              <div>
                <h4>{r.title}</h4>
                <p>{r.summary}</p>
                <div className={s.recordMeta}>
                  <span>{r.stream}</span>
                  <span className={s.owner}>
                    <b>{r.initials}</b>
                    {r.owner}
                  </span>
                </div>
              </div>
              <span className={s.status} data-status={r.status}>
                {r.status}
              </span>
            </article>
          ))}
        </div>
        <p className={s.demoFoot}>
          A working example of shared progress. All people and records are
          fictional.
        </p>
      </div>
    </div>
  );
}
