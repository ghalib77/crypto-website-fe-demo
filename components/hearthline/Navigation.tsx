"use client";
import { useEffect, useRef, useState } from "react";
import s from "./site.module.css";
const links = [
  ["how-it-works", "How it works"],
  ["explore", "Explore"],
  ["the-record", "The record"],
] as const;
export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-15% 0px -55% 0px" },
    );
    links.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <nav aria-label="Main navigation" className={s.navigation}>
      <button
        ref={toggle}
        className={s.menuToggle}
        aria-expanded={open}
        aria-controls="nav-links"
        onClick={() => setOpen(!open)}
      >
        Menu <span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      <div id="nav-links" className={`${s.navLinks} ${open ? s.navOpen : ""}`}>
        {links.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={active === id ? "location" : undefined}
            onClick={() => {
              setOpen(false);
              document.getElementById(id)?.focus({ preventScroll: true });
            }}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
