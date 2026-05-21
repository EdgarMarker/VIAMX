'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ResponsiveImage from '@/app/common/components/img/ResponsiveImage';
import type { IMG } from '@/app/_domain/sanity/types.d';

gsap.registerPlugin(ScrollTrigger);

export interface TimelineProduct {
  title: string;
  year: string;
  image: IMG;
  slug: string;
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export default function TimelineIntro({ items }: { items: TimelineProduct[] }) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rows = chunkArray(items, 5);

  useGSAP(
    () => {
      const section = containerRef.current?.closest('section');
      const STAGGER = 0.4;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section ?? containerRef.current,
          start: 'top center',
          end: 'center center',
          scrub: true,
        },
      });

      tl.from('.timeline__dot', {
        opacity: 0,
        scale: 0.06,
        duration: 1,
        ease: 'elastic.out(1,0.5)',
        stagger: STAGGER,
      }, 0);

      // líneas por fila — cada row arranca cuando su primer dot ya es visible
      let dotOffset = 0;
      rows.forEach((row, rowIdx) => {
        const isLastRow = rowIdx === rows.length - 1;
        const rowStart = dotOffset * STAGGER;
        const rowEl = `.timeline__row:nth-child(${rowIdx + 1})`;

        tl.from(`${rowEl} .timeline__item:not(.timeline__item--connector) .timeline__line`, {
          width: '0px',
          duration: 1,
          ease: 'power4.out',
          stagger: STAGGER,
        }, rowStart);

        if (!isLastRow) {
          tl.from(`${rowEl} .timeline__item--connector .timeline__line`, {
            height: '0px',
            duration: 1,
            ease: 'power4.out',
          }, rowStart + (row.length - 1) * STAGGER);
        }

        dotOffset += row.length;
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      className="timeline__intro"
      ref={containerRef}
      onMouseLeave={() => setActiveIdx(null)}
    >
      {rows.map((row, rowIdx) => {
        const isRtl = rowIdx % 2 === 1;
        const isLastRow = rowIdx === rows.length - 1;

        return (
          <div
            key={rowIdx}
            className={`timeline__row${isRtl ? ' timeline__row--rtl' : ''}`}
          >
            {row.map((item, itemIdx) => {
              const globalIdx = rowIdx * 5 + itemIdx;
              const isActive = activeIdx === globalIdx;
              const isConnector = itemIdx === row.length - 1 && !isLastRow;
              const isLastItem = isLastRow && itemIdx === row.length - 1;

              return (
                <div
                  key={globalIdx}
                  className={[
                    'timeline__item',
                    isConnector ? 'timeline__item--connector' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {isActive && (
                    <div className="timeline__tooltip">
                      <div className="timeline__tooltip-header">
                        <strong>{item.title}</strong>
                        <span>{item.year}</span>
                      </div>
                      <div className="timeline__tooltip-img">
                        <ResponsiveImage
                          imageData={item.image}
                          variant="card"
                          sizes="230px"
                          width={230}
                          height={160}
                        />
                      </div>
                      <div className="timeline__tooltip-footer">
                        <Link href={`/productos/${item.slug}`}>Ver proyecto</Link>
                      </div>
                    </div>
                  )}
                  <div
                    className={`timeline__dot${isActive ? ' timeline__dot--active' : ''}`}
                    onMouseEnter={() => setActiveIdx(globalIdx)}
                  >
                    {item.image?.media?.url && (
                      <div
                        className="timeline__dot-img"
                        style={{
                          backgroundImage: `url(${item.image.media.url}?w=100&h=100&fit=crop&auto=format)`,
                        }}
                      />
                    )}
                  </div>
                  {!isLastItem && <div className="timeline__line" />}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
