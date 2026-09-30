"use client";
import {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import { stages } from "@/lib/hearthline/data";
import AtlasDiagram from "./AtlasDiagram";
import s from "../site.module.css";
const Scene = dynamic(() => import("./AtlasScene"), {
  ssr: false,
  loading: () => null,
});
const subscribe = () => () => {};
class SceneBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
export default function AtlasExperience() {
  const [stage, setStage] = useState(0),
    [paused, setPaused] = useState(false),
    [eligible, setEligible] = useState(false),
    [visible, setVisible] = useState(false),
    [hidden, setHidden] = useState(false),
    [load, setLoad] = useState(false),
    [rendered, setRendered] = useState(false),
    [failed, setFailed] = useState(false),
    [narrow, setNarrow] = useState(false);
  const ready = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const region = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)"),
      small = matchMedia("(max-width: 767px)");
    const sync = () => {
      const connection = (
        navigator as Navigator & { connection?: { saveData: boolean } }
      ).connection;
      setEligible(!motion.matches && !connection?.saveData);
      if (motion.matches || connection?.saveData) setRendered(false);
      setNarrow(small.matches);
    };
    sync();
    motion.addEventListener("change", sync);
    small.addEventListener("change", sync);
    const visibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", visibility);
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    if (region.current) observer.observe(region.current);
    return () => {
      motion.removeEventListener("change", sync);
      small.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", visibility);
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    if (!eligible || !visible) return;
    const id = setTimeout(() => setLoad(true), 600);
    return () => clearTimeout(id);
  }, [eligible, visible]);
  const onReady = useCallback(() => setRendered(true), []),
    onFailure = useCallback(() => {
      setFailed(true);
      setRendered(false);
    }, []);
  const enhanced = eligible && load && !failed;
  const active = enhanced && visible && !hidden && !paused;
  return (
    <div
      className={s.atlas}
      data-stage={stages[stage].name}
      data-enhancement={
        failed ? "failed" : enhanced && rendered ? "ready" : "static"
      }
    >
      <div className={s.atlasHeader}>
        <span className={s.eyebrow}>THE PROGRESS ATLAS</span>
        <span className={s.atlasCoordinate}>01 — 04</span>
      </div>
      <div className={s.atlasVisual} ref={region}>
        <div className={s.atlasGrid} />
        <div
          className={`${s.fallback} ${enhanced && rendered ? s.fallbackHidden : ""}`}
        >
          <AtlasDiagram stage={stage} />
        </div>
        {enhanced && (
          <SceneBoundary onFailure={onFailure}>
            <div
              className={s.scene}
              aria-hidden="true"
              style={{ opacity: rendered ? 1 : 0 }}
            >
              <Scene
                stage={stage}
                active={active}
                narrow={narrow}
                onReady={onReady}
                onFailure={onFailure}
              />
            </div>
          </SceneBoundary>
        )}
        <span className={s.axisLabel}>A SHARED PATH FORWARD</span>
        <span className={s.north} aria-hidden="true">
          N ↑
        </span>
      </div>
      <div className={s.stageControls} role="group" aria-label="Atlas stage">
        {stages.map((item, i) => (
          <button
            key={item.name}
            disabled={!ready}
            aria-pressed={stage === i}
            onClick={() => setStage(i)}
          >
            <span>0{i + 1}</span>
            {item.name}
          </button>
        ))}
      </div>
      <div className={s.atlasCaption}>
        <div>
          <h3>{stages[stage].title}</h3>
          <p>{stages[stage].copy}</p>
        </div>
        <button
          className={s.motionButton}
          disabled={!ready || !enhanced || !rendered}
          onClick={() => setPaused(!paused)}
          aria-pressed={paused}
          aria-label={paused ? "Resume motion" : "Pause motion"}
        >
          <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
          <span>
            {enhanced ? (paused ? "Resume" : "Pause") : "Static view"}
          </span>
        </button>
      </div>
    </div>
  );
}
