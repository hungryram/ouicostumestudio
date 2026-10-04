"use client";

import Image from "next/image";
import { useRef, useState, type PointerEvent } from "react";

type ZoomableImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export default function ZoomableImage(props: ZoomableImageProps) {
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const gesture = useRef({ x: 0, y: 0, moved: false });

  function updateOrigin(event: PointerEvent<HTMLButtonElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    setOrigin({
      x: Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100)),
      y: Math.max(0, Math.min(100, ((event.clientY - bounds.top) / bounds.height) * 100)),
    });
  }

  return (
    <button
      type="button"
      className={`image-zoom${zoomed ? " image-zoom--active" : ""}`}
      aria-label={`Zoom image: ${props.alt}`}
      aria-keyshortcuts="Enter Space ArrowLeft ArrowRight ArrowUp ArrowDown Escape"
      aria-pressed={zoomed}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") {
          updateOrigin(event);
          setZoomed(true);
        }
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setZoomed(false);
      }}
      onPointerDown={(event) => {
        gesture.current = { x: event.clientX, y: event.clientY, moved: false };
        if (event.pointerType !== "mouse" && zoomed) {
          event.currentTarget.setPointerCapture(event.pointerId);
        }
        updateOrigin(event);
      }}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse" && event.buttons === 0) return;
        if (Math.hypot(event.clientX - gesture.current.x, event.clientY - gesture.current.y) > 8) {
          gesture.current.moved = true;
        }
        if (zoomed) updateOrigin(event);
      }}
      onPointerCancel={() => {
        gesture.current.moved = true;
      }}
      onClick={(event) => {
        if (event.detail !== 0 && gesture.current.moved) return;
        if (!zoomed && event.detail === 0) setOrigin({ x: 50, y: 50 });
        setZoomed(!zoomed);
      }}
      onBlur={() => setZoomed(false)}
      onKeyDown={(event) => {
        if (event.key === "Escape") setZoomed(false);
        if (!zoomed || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
        event.preventDefault();
        setOrigin((previous) => ({
          x: Math.max(0, Math.min(100, previous.x + (event.key === "ArrowRight" ? 10 : event.key === "ArrowLeft" ? -10 : 0))),
          y: Math.max(0, Math.min(100, previous.y + (event.key === "ArrowDown" ? 10 : event.key === "ArrowUp" ? -10 : 0))),
        }));
      }}
    >
      <Image
        {...props}
        alt={props.alt}
        sizes={zoomed ? "1500px" : "(max-width: 600px) 92vw, (max-width: 1000px) 46vw, 30vw"}
        style={{
          transform: zoomed ? "scale(2.5)" : "scale(1)",
          transformOrigin: `${origin.x}% ${origin.y}%`,
        }}
      />
    </button>
  );
}
