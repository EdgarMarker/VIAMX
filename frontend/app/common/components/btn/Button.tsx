"use client";

import "./button.scss";
import React from "react";
import { useLenis } from "../../lib/lenis/LenisProvider";

type BaseProps = {
  children: React.ReactNode;
  className?: string;
};

type ScrollVariant = BaseProps & {
  variant: "scroll";
  to: string;
  offset?: number;
};

type LinkVariant = BaseProps & {
  variant: "link";
  href: string;
  target?: string;
};

type ButtonVariant = BaseProps & {
  variant?: "button";
  onClick?: () => void;
};

type Props = ScrollVariant | LinkVariant | ButtonVariant;

export default function Button(props: Props) {
  const lenis = useLenis();
  const { children, className = "" } = props;

  if (props.variant === "scroll") {
    const { to, offset = 0 } = props;
    return (
      <button
        type="button"
        className={`btn-yellow btn btn__scroll${className ? ` ${className}` : ""}`}
        onClick={() => {
          const el = document.querySelector<HTMLElement>(to);
          if (!el) return;
          if (lenis) {
            lenis.scrollTo(el, { offset });
            return;
          }
          const y = window.scrollY + el.getBoundingClientRect().top - offset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }}
      >
        {children}
      </button>
    );
  }

  if (props.variant === "link") {
    const { href, target } = props;
    return (
      <a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={`btn-yellow btn${className ? ` ${className}` : ""}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={`btn-yellow btn${className ? ` ${className}` : ""}`}
      onClick={props.onClick}
    >
      {children}
    </button>
  );
}
