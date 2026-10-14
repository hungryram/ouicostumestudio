import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./mobile-menu";

export default function SiteHeader() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="announcement">
        <span>
          Fully booked — bookings open March–June 2027.{" "}
          <Link href="/waitlist">Join the waitlist</Link>
        </span>
      </div>
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="Oui Costume Studio home">
          <Image
            className="wordmark__logo"
            src="/images/logo.png"
            alt=""
            width={1181}
            height={890}
            priority
          />
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="/work">Our work</a>
          <a href="/about">The studio</a>
          <a href="/faq">FAQ</a>
        </nav>
        <div className="header-actions">
          <Link className="header-cta" href="/waitlist">
            Waitlist
          </Link>
          <Link className="header-cta" href="/contact">
            Contact
          </Link>
        </div>
        <MobileMenu />
      </header>
    </>
  );
}
