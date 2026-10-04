import Link from "next/link";
import Image from "next/image";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link className="wordmark wordmark--footer" href="/" aria-label="Oui Costume Studio home">
        <Image
          className="wordmark__logo"
          src="/images/logo.png"
          alt=""
          width={1181}
          height={890}
        />
      </Link>
      <p className="site-footer__tagline">
        A small studio for big moments.
      </p>
      <nav className="site-footer__links" aria-label="Footer navigation">
        <a href="/work">Our work</a>
        <a href="/about">The studio</a>
        <a href="/faq">FAQ</a>
        <a href="/contact">Contact</a>
        <a href="/private-policy">Privacy</a>
      </nav>
      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} Oui Costume Studio</span>
        <span>Southern California</span>
        <a href="https://www.hungryram.com/locations/corona" target="_blank" rel="noreferrer">
          Website by hungryram
        </a>
        <div className="site-footer__socials">
          <a href="https://www.instagram.com/ouicostumestudio/" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.facebook.com/ouicostumestudio" target="_blank" rel="noreferrer">Facebook</a>
          <a href="https://www.tiktok.com/@ouicostumestudio" target="_blank" rel="noreferrer">TikTok</a>
        </div>
      </div>
    </footer>
  );
}
