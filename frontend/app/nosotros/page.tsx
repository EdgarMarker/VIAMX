import "./page.scss";
import Column1 from "../common/components/layout/Column1";
import Column2 from "../common/components/layout/Column2";
import ResponsiveImage from "../common/components/img/ResponsiveImage";
import CustomPortableText from "../common/components/text/CustomPortableText";
import ScrollToButton from "../common/components/btn/ScrollToButton";
import PreFooter from "../common/components/footer/PreFooter";
import { getAboutPage } from "../_domain/sanity";
import { getPageMetadata } from "../common/utils/helper-seo";

export async function generateMetadata() {
  return getPageMetadata(getAboutPage);
}

export default async function NosotrosPage() {
  const data = await getAboutPage();

  return (
    <main id="NosotrosPage">

      {/* HERO */}
      <Column2
        sectionClassName="section__hero section__hero--nosotros"
        leftChildren={
          <>
            <h1>{data.hero.string_hero_h1}</h1>
            <CustomPortableText hasImg={false} data={data.hero.rich_hero_title} />
            <ScrollToButton to="#section__quote" className="btn btn__scroll">
              {data.hero.string_hero_cta}
            </ScrollToButton>
          </>
        }
        rightChildren={
          <>
            <ResponsiveImage imageData={data.hero.img_hero_banner} variant="hero" />
            <ResponsiveImage imageData={data.hero.img_hero_banner2} variant="hero" />
          </>
        }
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
        leftH3="NOSOTROS"
        leftPortableText={data.about.rich_about_title}
        leftHasImgInPortableText={false}
        rightChildren={
          <>
            <p>{data.about.textarea_about_p}</p>
            <p>{data.about.textarea_about_p2}</p>
          </>
        }
      />

      {/* NUESTRA HISTORIA */}
      <Column2
        id="section__our-history"
        sectionClassName="section__our-history"
        leftH3="/ NUESTRA HISTORIA"
        leftPortableText={data.ourHistory.rich_ourHistory_title}
        leftHasImgInPortableText={false}
        rightImage={{ imageData: data.ourHistory.img_ourHistory_banner, variant: "banner" }}
      />

      {/* NUESTROS VALORES */}
      <Column2
        id="section__our-values"
        sectionClassName="section__our-values"
        leftH3="/ NUESTROS VALORES"
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
