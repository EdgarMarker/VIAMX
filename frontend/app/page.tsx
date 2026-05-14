import "./page.scss";
import Column1 from "./common/components/layout/Column1";
import Column2 from "./common/components/layout/Column2";
import ColdNumbers from "./common/components/text/ColdNumbers";
import DivisorImage from "./common/components/divisor/DivisorImage";
import SliderTesty from "./common/components/slider/SliderTesty";
import CustomPortableText from "./common/components/text/CustomPortableText";
import ResponsiveImage from "./common/components/img/ResponsiveImage";
import ScrollToButton from "./common/components/btn/ScrollToButton";
import { getHomePage } from "./_domain/sanity";
import { getPageMetadata } from "./common/utils/helper-seo";
import PreFooter from "./common/components/footer/PreFooter";

export async function generateMetadata() {
  return getPageMetadata(getHomePage);
}

export default async function Home() {
  const data = await getHomePage();

  return (
    <main id="Home">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <Column2
        sectionClassName="section__hero section__hero--home"
        leftChildren={
          <>
            <h1>{data.hero.string_hero_h1}</h1>
            <CustomPortableText hasImg={false} data={data.hero.rich_hero_title} />
            <div className="btn__wrapper">
              <ScrollToButton to="#section__intro" className="btn btn__scroll">
                {data.hero.string_hero_cta}
              </ScrollToButton>
            </div>
          </>
        }
        rightChildren={
          <ResponsiveImage imageData={data.hero.img_hero_banner} variant="hero" />
        }
      />

      {/* ── INICIO – Nuestra Trayectoria ──────────────────────────────────── */}
      <Column1
        id="section__intro"
        sectionClassName="section__intro"
        h3="Inicio"
        portableText={data.intro.rich_intro_title}
      />

      {/* ── SOBRE VIA MX ──────────────────────────────────────────────────── */}
      <Column2
        id="section__about"
        sectionClassName="section__about"
        leftChildren={
          <>
            <h3>Sobre Via MX</h3>
            <CustomPortableText hasImg={false} data={data.about.rich_about_title} />
          </>
        }
        rightChildren={
          <>
            <p>{data.about.textarea_about_p1}</p>
            <p>{data.about.textarea_about_p2}</p>
          </>
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

      {/* ── POR QUÉ ELEGIRNOS ─────────────────────────────────────────────── */}
      <Column2
        sectionClassName="section__why"
        leftPortableText={data.about.rich_about_title2}
        leftButton={{ href: "#section__method", label: "Nuestra Metodología" }}
        rightChildren={
          <>
            <p>{data.about.textarea_about_p3}</p>
            <p>{data.about.textarea_about_p4}</p>
          </>
        }
      />

      {/* ── NUESTRA METODOLOGÍA ───────────────────────────────────────────── */}
      <Column2
        id="section__method"
        sectionClassName="section__method"
        leftChildren={
          <>
            <h3>Nuestra Metodología</h3>
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
        rightImage={{ imageData: data.ourMethod.img_ourMethod_banner, variant: "banner" }}
      />

      {/* ── TESTIMONIOS ───────────────────────────────────────────────────── */}
      <SliderTesty variant="Home" data={data} />

      <PreFooter />
    </main>
  );
}
