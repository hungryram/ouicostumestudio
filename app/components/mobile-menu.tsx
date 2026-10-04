"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

export default function MobileMenu() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 761px)");
    function closeOnDesktop() {
      if (desktop.matches) {
        dialog.current?.close();
        setOpen(false);
      }
    }
    desktop.addEventListener("change", closeOnDesktop);
    closeOnDesktop();
    return () => {
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  function close() {
    setClosing(true);
  }

  return (
    <>
      <button
        ref={trigger}
        className="mobile-menu-toggle"
        type="button"
        aria-label="Open navigation menu"
        aria-haspopup="dialog"
        aria-controls={id}
        aria-expanded={open}
        onClick={() => {
          setClosing(false);
          dialog.current?.showModal();
          setOpen(true);
        }}
      >
        <svg width="26" height="22" viewBox="0 0 26 22" fill="none" aria-hidden="true">
          <path d="M2 4H24M2 11H24M2 18H24" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      <dialog
        ref={dialog}
        id={id}
        className={`mobile-menu${closing ? " mobile-menu--closing" : ""}`}
        aria-label="Site navigation"
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onAnimationEnd={(event) => {
          if (closing && event.target === event.currentTarget && event.animationName === "mobile-menu-exit") {
            dialog.current?.close();
            setOpen(false);
            setClosing(false);
          }
        }}
        onClose={() => {
          setOpen(false);
          setClosing(false);
          if (window.matchMedia("(max-width: 760px)").matches) trigger.current?.focus();
        }}
      >
        <button
          className="mobile-menu-close"
          type="button"
          aria-label="Close navigation menu"
          onClick={close}
        >
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
            <path d="M4 4L22 22M22 4L4 22" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
        <nav className="mobile-menu__links" aria-label="Mobile navigation">
          <Link href="/" onClick={close}>Home</Link>
          <Link href="/work" onClick={close}>Our work</Link>
          <Link href="/about" onClick={close}>The studio</Link>
          <Link href="/faq" onClick={close}>FAQ</Link>
          <Link href="/contact" onClick={close}>Let&apos;s talk</Link>
        </nav>
      </dialog>
    </>
  );
}
