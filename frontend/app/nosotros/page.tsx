import "./page.scss";
import Column1 from "../common/components/layout/Column1";
import Column2 from "../common/components/layout/Column2";
import CustomPortableText from "../common/components/text/CustomPortableText";
import Hero from "../common/components/hero/Hero";
import PreFooter from "../common/components/footer/PreFooter";
import { getAboutPage } from "../_domain/sanity";
import { getPageMetadata } from "../common/utils/helper-seo";

export async function generateMetadata() {
  return getPageMetadata(getAboutPage);
}

export default async function NosotrosPage() {
  const data = await getAboutPage();

  return (
    <main id="About">

      {/* HERO */}
      <Hero
        variant="primary"
        data={{
          h1: data.hero.string_hero_h1,
          portableText: data.hero.rich_hero_title,
          cta: {
            label: data.hero.string_hero_cta,
            scrollTo: "#section__quote",
          },
          imgMain: data.hero.img_hero_banner,
          imgSecondary: data.hero.img_hero_banner2,
        }}
      />

      {/* CITA */}
      <Column1
        id="section__quote"
        sectionClassName="section__quote"
        portableText={data.quote.rich_quote_quote}
        hasImgInPortableText={false}
      />

      {/* NOSOTROS — ¿Quiénes somos? */}
      <Column2
        id="section__about"
        sectionClassName="section__about"
        leftH3="Nosotros"
        leftPortableText={data.about.rich_about_title}
        leftHasImgInPortableText={false}
        rightChildren={
          <div className="listado x2">
            <p>{data.about.textarea_about_p}</p>
            <p>{data.about.textarea_about_p2}</p>
          </div>
        }
      />

      {/* NUESTRA HISTORIA */}
      <Column2
        id="section__our-history"
        sectionClassName="section__our-history"
        leftH3="Nuestra Historia"
        leftH3ClassName="head__title--white"
        leftPortableText={data.ourHistory.rich_ourHistory_title}
        leftHasImgInPortableText={false}
        rightImage={{ imageData: data.ourHistory.img_ourHistory_banner, variant: "banner" }}
      />

      {/* NUESTROS VALORES */}
      <Column2
        id="section__our-values"
        sectionClassName="section__our-values"
        leftH3="Nuestros Valores"
        leftPortableText={data.ourValues.rich_ourValues_title}
        leftHasImgInPortableText={false}
        rightChildren={
          <ul className="listado__valores">
            {data.ourValues.arr_ourValues_values.map((value, idx) => (
              <li key={idx} className="valor__item">
                <h2>{value.string_ourValues_h2}</h2>
                <p>{value.textarea_ourValues_p}</p>
              </li>
            ))}
          </ul>
        }
      />

      <PreFooter />
    </main>
  );
}
