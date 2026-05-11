/* eslint-disable @next/next/no-html-link-for-pages */
"use client";
import "./nav.scss";
import { useRef } from "react";
import { useNavScrollShrink, useNavHideOnScroll } from "./nav.animation";
import ResponsiveImage from "../img/ResponsiveImage";
import { useNavigation } from "../../hooks/useNavigation";
import { CompanyInterface } from "@/app/_domain/sanity/company.contract";
import Link from "next/link";

interface Props {
  companyData?: CompanyInterface;
}

const Nav = ({ companyData }: Props) => {
  const headerRef = useRef<HTMLElement | null>(null);
  useNavScrollShrink(headerRef);
  const {
    isMenuOpen,
    menuRef,
    toggleRef,
    toggleMenu,
    closeMenu,
    isLinkActive,
    navItems,
  } = useNavigation();
  useNavHideOnScroll(headerRef, isMenuOpen);


  return (
    <header id="Header" ref={headerRef}>
      <nav>
        <Link href="/" className="logo" aria-label="Ir al inicio">
          {companyData?.general.icon_general_navLogo ? (
            <ResponsiveImage
              imageData={companyData?.general.icon_general_navLogo}
              variant="icon"
            />
          ) : (
            <span>LOGO</span>
          )}
        </Link>

        <ul role="list" className="nav-links">
          {navItems.map((item) => {
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
