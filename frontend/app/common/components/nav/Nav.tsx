"use client";
import "./nav.scss";
import { useRef } from "react";
import { useNavScrollShrink, useNavHideOnScroll } from "./nav.animation";
import { useNavigation } from "../../hooks/useNavigation";
import Logo from "./Logo";
import Link from "next/link";

const YELLOW_ROUTES = ["/", "/nosotros"];
const YELLOW_PATTERN = /^\/productos\/[^/]+$/;

const Nav = () => {
  const headerRef = useRef<HTMLElement | null>(null);
  useNavScrollShrink(headerRef);
  const { isMenuOpen, menuRef, toggleRef, toggleMenu, closeMenu, isLinkActive, navItems, pathname } =
    useNavigation();
  useNavHideOnScroll(headerRef, isMenuOpen);

  const isYellowVariant =
    YELLOW_ROUTES.includes(pathname) || YELLOW_PATTERN.test(pathname);

  const logoColor = isYellowVariant ? "var(--color-secondary)" : "var(--color-black)";
  const navLinks = navItems.filter((item) => item.href !== "/contacto");

  return (
    <header
      id="Header"
      ref={headerRef}
      data-nav-variant={isYellowVariant ? "yellow" : "dark"}
    >
      <nav>
        <Link href="/" className="logo" aria-label="Ir al inicio">
          <Logo fill={logoColor} />
        </Link>

        <ul role="list" className="nav-links">
          {navLinks.map((item) => {
            const active = isLinkActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`nav-link ${active ? "active" : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link href="/contacto" className="btn__nav-cta">
          Agendar llamada
        </Link>

        <button
          ref={toggleRef}
          type="button"
          className={`nav-toggle ${isMenuOpen ? "active" : ""}`}
          aria-controls="mobile-menu"
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <div
        ref={menuRef}
        id="mobile-menu"
        className={`mobile-menu ${isMenuOpen ? "active" : ""}`}
      >
        <ul role="list">
          {navItems.map((item) => {
            const active = isLinkActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`mobile-link ${active ? "active" : ""}`}
                  aria-current={active ? "page" : undefined}
                  onClick={closeMenu}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div
        className={`menu-overlay ${isMenuOpen ? "active" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />
    </header>
  );
};

export default Nav;
