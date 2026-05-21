import "./page.scss";
import Link from "next/link";
import Column1 from "./common/components/layout/Column1";
import Column2 from "./common/components/layout/Column2";
import ColdNumbers from "./common/components/text/ColdNumbers";
import DivisorImage from "./common/components/divisor/DivisorImage";
import SliderTesty from "./common/components/slider/SliderTesty";
import CustomPortableText from "./common/components/text/CustomPortableText";
import Hero from "./common/components/hero/Hero";
import TimelineIntro from "./common/components/timeline/TimelineIntro";
import ProductCard from "./common/components/card/ProductCard";
import { getHomePage, getProducts } from "./_domain/sanity";
import { getPageMetadata } from "./common/utils/helper-seo";
import PreFooter from "./common/components/footer/PreFooter";

export async function generateMetadata() {
  return getPageMetadata(getHomePage);
}

export default async function Home() {
  const [data, products] = await Promise.all([getHomePage(), getProducts()]);

  return (
    <main id="Home">
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <Hero
        variant="primary"
        data={{
          h1: data.hero.string_hero_h1,
          portableText: data.hero.rich_hero_title,
          cta: {
            label: data.hero.string_hero_cta,
            scrollTo: "#section__intro",
          },
          imgMain: data.hero.img_hero_banner,
          imgSecondary: data.hero.img_hero_banner2,
        }}
      />

      {/* ── INICIO – Nuestra Trayectoria ──────────────────────────────────── */}
      <Column1
        id="section__intro"
        sectionClassName="section__intro"
        h3="Inicio"
        portableText={data.intro.rich_intro_title}
      >
        <TimelineIntro
          items={products.slice().reverse().map((p) => ({
            title: p.general.string_general_name,
            year: p.general.date?.slice(0, 4) ?? '',
            image: p.general.img_general_card,
            slug: p.general.slug.current,
          }))}
        />
        <div className="timeline__cta">
          <Link href="/productos" className="btn btn--right">
            más información
          </Link>
        </div>
      </Column1>

      {/* ── SOBRE VIA MX ──────────────────────────────────────────────────── */}
      <Column2
        id="section__about"
        sectionClassName="section__about"
        leftChildren={
          <>
            <h3 className="head__title">
              <strong>/</strong> Sobre Via MX
            </h3>
            <CustomPortableText
              hasImg={false}
              data={data.about.rich_about_title}
            />
          </>
        }
        rightChildren={
          <div className="listado x2">
            <p>{data.about.textarea_about_p1}</p>
            <p>{data.about.textarea_about_p2}</p>
          </div>
        }
      />

      <Column1 sectionClassName="section__coldNumbers">
        <ColdNumbers
          items={data.about.arr_about_coldNumbers_list.map((item, idx) => ({
            id: idx,
            prefix: item.string_about_coldNumbers_item_prefix,
            sufix: item.string_about_coldNumbers_item_suffix,
            number: item.number_about_coldNumbers_item_value,
            data: item.string_about_coldNumbers_item_label,
            img: item.img_about_coldNumbers_item_icon,
          }))}
        />
      </Column1>

      <DivisorImage imageData={data.about.img_about_banner} variant="banner" />

      <Column2
        sectionClassName="section__why"
        leftPortableText={data.about.rich_about_title2}
        leftButton={{ href: "#section__method", label: "Nuestra Metodología" }}
        rightChildren={
          <div className="listado x2">
            <p>{data.about.textarea_about_p3}</p>
            <p>{data.about.textarea_about_p4}</p>
          </div>
        }
      />

      {/* ── NUESTRA METODOLOGÍA ───────────────────────────────────────────── */}
      <Column2
        id="section__method"
        sectionClassName="section__method"
        leftChildren={
          <>
            <h3 className="head__title">
              <strong>/</strong> Nuestra Metodología
            </h3>
            <ul className="method__list">
              {data.ourMethod.arr_ourMethod_list.map((item, idx) => (
                <li key={idx} className="method__item">
                  <h2>{item.string_ourMethod_h2}</h2>
                  <span className="method__step">Paso {idx + 1}</span>
                  <p>{item.textarea_ourMethod_p}</p>
                </li>
              ))}
            </ul>
          </>
        }
        rightPortableText={data.ourMethod.rich_ourMethod_title}
        rightImage={{
          imageData: data.ourMethod.img_ourMethod_banner,
          variant: "banner",
        }}
      />

      {/* ── TESTIMONIOS ───────────────────────────────────────────────────── */}
      <SliderTesty variant="Home" data={data} />

      {/* ── DESARROLLOS DESTACADOS ────────────────────────────────────────── */}
      <Column1
        id="section__recentProjects"
        sectionClassName="section__recentProjects fadeInOut"
        h3="Desarrollos Destacados"
        h3ClassName="head__title--white"
        portableText={data.recentProjects.rich_recentProjects_title}
      >
        <div className="listado x4">
          {data.recentProjects.arr_ref_recentProjects_projectsList.map((product, idx) => (
            <ProductCard key={idx} data={product} variant="primary" />
          ))}
        </div>
        <div className="recentProjects__cta">
          <Link href="/productos" className="btn btn--right">
            VER TODOS LOS PROYECTOS
          </Link>
        </div>
      </Column1>

      <PreFooter />
    </main>
  );
}
