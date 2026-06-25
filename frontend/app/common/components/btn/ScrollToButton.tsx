"use client";

import React from "react";
import Button from "./Button";

type Props = {
  to: string;
  children: React.ReactNode;
  className?: string;
  offset?: number;
};

export default function ScrollToButton({ to, children, className, offset }: Props) {
  return (
    <Button variant="scroll" to={to} offset={offset} className={className}>
      {children}
    </Button>
  );
}
