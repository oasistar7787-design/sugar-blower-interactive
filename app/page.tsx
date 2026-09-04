"use client";

/* eslint-disable @next/next/no-img-element -- exact layered scene sizing is required for the interactive composition */

import { useEffect, useRef, useState } from "react";

type StoryId = "guide" | "presentation" | "experience";

const stories = [
  { id: "guide" as const, number: "壹", title: "交互说明", en: "INTERACTION GUIDE", sugar: "/media/sugar-star.png", className: "sugar-star" },
  { id: "presentation" as const, number: "贰", title: "项目宣讲", en: "PROJECT FILM", sugar: "/media/sugar-fish.png", className: "sugar-fish" },
  { id: "experience" as const, number: "叁", title: "体验过程", en: "EXPERIENCE", sugar: "/media/sugar-gourd.png", className: "sugar-gourd" },
];

export default function Home() {
  const [picking, setPicking] = useState<StoryId | null>(null);
  const [activeStory, setActiveStory] = useState<StoryId | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const active = stories.find((story) => story.id === activeStory);

  useEffect(() => {
    if (!activeStory) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveStory(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeStory]);

  useEffect(() => () => {
    if (openTimer.current) clearTimeout(openTimer.current);
  }, []);

  function openStory(id: StoryId) {
    if (picking) return;
    setPicking(id);
    openTimer.current = setTimeout(() => {
      setActiveStory(id);
      setPicking(null);
    }, 430);
  }

  return (
    <main className="landing-page">
      <section className="interactive-hero" aria-labelledby="site-title">
        <div className="scene-canvas">
          <img className="scene-image" src="/media/sugar-stall-base-v3.png" alt="正面视角的传统吹糖人工作台，木架前摆放着三件可选择的糖人作品" />
          <div className="scene-wash" aria-hidden="true" />

          <header className="hero-copy">
            <p className="eyebrow">数字交互装置 · DIGITAL INSTALLATION</p>
            <div className="hero-heading">
              <div>
                <h1 id="site-title">吹糖人</h1>
                <p className="english-title">SUGAR BLOWER</p>
              </div>
              <span className="seal" aria-hidden="true">非遗</span>
            </div>
            <p className="intro">以呼吸为笔，以手势为刀，在身体参与中感受民艺的生命力，让延续百年的造物智慧在数字语境中重新生长。</p>
            <div className="interaction-hint">
              <span aria-hidden="true">◇</span>
              <p>轻触一支糖人，开启故事</p>
            </div>
          </header>

          <div className="sugar-stage" aria-label="选择一支糖人查看项目内容">
            {stories.map((story) => (
              <button
                className={`sugar-button ${story.className}${picking === story.id ? " is-picked" : ""}`}
                type="button"
                key={story.id}
                onClick={() => openStory(story.id)}
                aria-label={`拿起${story.title}糖人`}
              >
                <img src={story.sugar} alt="" draggable={false} />
                <span className="sugar-label"><small>{story.number}</small><span>{story.title}</span></span>
              </button>
            ))}
          </div>

          <img className="sugar-rack" src="/media/sugar-rack-v3-alpha.png" alt="" aria-hidden="true" />

        </div>
      </section>

      {active && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setActiveStory(null);
        }}>
          <section className="story-modal" role="dialog" aria-modal="true" aria-labelledby="story-title">
            <button className="modal-close" type="button" onClick={() => setActiveStory(null)} aria-label="关闭内容" autoFocus>
              <span aria-hidden="true">×</span>
            </button>
            <header className="modal-heading">
              <span>{active.number}</span>
              <div><p>{active.en}</p><h2 id="story-title">{active.title}</h2></div>
            </header>

            {active.id === "guide" ? (
              <figure className="guide-frame">
                <img src="/media/interaction-guide.jpg" alt="吹糖人数字交互装置操作说明：左手捏糖、右手换色、左手换形" />
              </figure>
            ) : (
              <div className="video-shell">
                <video controls playsInline preload="metadata" poster={active.id === "presentation" ? "/media/presentation-poster.jpg" : "/media/experience-poster.jpg"}>
                  <source src={active.id === "presentation" ? "/media/presentation.mp4" : "/media/experience.mp4"} type="video/mp4" />
                  您的浏览器暂不支持视频播放。
                </video>
              </div>
            )}

            <p className="modal-caption">
              {active.id === "guide" && "了解呼吸、手势与糖人生成之间的操作关系"}
              {active.id === "presentation" && "了解项目缘起、创作理念与交互设计"}
              {active.id === "experience" && "观看完整的吹糖、塑形与视觉生成过程"}
            </p>
          </section>
        </div>
      )}
    </main>
  );
}
