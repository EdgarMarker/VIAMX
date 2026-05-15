"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import "./Accordion.scss";
import CustomPortableText from "../text/CustomPortableText";
import type { Block } from "@/app/_domain/sanity/types";
import Svg from "../img/Svg";

type AccordionItem = {
  id: number | string;
  header: string;
  content?: Block[];
  contentText?: string;
};

type Props = {
  items: AccordionItem[];
  className?: string;
  defaultOpenIndex?: number;
};

export default function Accordion({
  items,
  className = "",
  defaultOpenIndex = 0,
}: Props) {
  const [openIndex, setOpenIndex] = useState(() =>
    items?.length ? Math.min(Math.max(defaultOpenIndex, 0), items.length - 1) : -1
  );

  useEffect(() => {
    if (!items?.length) setOpenIndex(-1);
    else if (openIndex >= items.length) setOpenIndex(0);
  }, [items, openIndex]);

  return (
    <div className={`accordion ${className}`.trim()}>
      {items.map((item, idx) => (
        <AccordionRow
          key={item.id ?? idx}
          item={item}
          isOpen={idx === openIndex}
          onToggle={() => setOpenIndex((prev) => (prev === idx ? -1 : idx))}
        />
      ))}
    </div>
  );
}

function AccordionRow({
  item,
  isOpen,
  onToggle,
}: {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const uid = useId();
  const panelId = useMemo(() => `acc-panel-${uid}-${item.id}`, [uid, item.id]);
  const btnId = useMemo(() => `acc-btn-${uid}-${item.id}`, [uid, item.id]);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const measure = () => setHeight(el.scrollHeight);
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);

    // @ts-ignore
    document.fonts?.ready?.then?.(measure);

    return () => ro.disconnect();
  }, []);

  return (
    <div className={`accordion__item ${isOpen ? "is-open" : ""}`.trim()}>
      <button
        id={btnId}
        type="button"
        className="accordion__trigger"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <h3>{item.header}</h3>
        <div className="accordion__icon" aria-hidden="true">
          <Svg variant="plus" />
        </div>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        className="accordion__panel"
        style={{
          maxHeight: isOpen ? `${height}px` : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div ref={contentRef} className="accordion__content">
          {item.contentText ? (
            <p>{item.contentText}</p>
          ) : item.content ? (
            <CustomPortableText hasImg={false} data={item.content} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
