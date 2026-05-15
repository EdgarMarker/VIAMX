import "./page.scss";
import Column2 from "../common/components/layout/Column2";
import ResponsiveImage from "../common/components/img/ResponsiveImage";
import CustomPortableText from "../common/components/text/CustomPortableText";
import ScrollToButton from "../common/components/btn/ScrollToButton";
import Accordion from "../common/components/accordion/Accordion";
import PreFooter from "../common/components/footer/PreFooter";
import { getLocationsPage } from "../_domain/sanity";
import { getPageMetadata } from "../common/utils/helper-seo";

export async function generateMetadata() {
  return getPageMetadata(getLocationsPage);
}

export default async function UbicacionesPage() {
  const data = await getLocationsPage();

  return (
    <main id="UbicacionesPage">

      {/* HERO */}
      <Column2
        sectionClassName="section__hero section__hero--ubicaciones"
        leftChildren={
          <>
            <h1>{data.hero.string_hero_h1}</h1>
            <CustomPortableText hasImg={false} data={data.hero.rich_hero_title} />
            <ScrollToButton to="#section__intro" className="btn btn__scroll">
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

      {/* MAPA DE UBICACIONES */}
      <Column2
        id="section__intro"
        sectionClassName="section__intro"
        leftH3="/ MAPA DE UBICACIONES"
        leftPortableText={data.intro.rich_intro_title}
        leftHasImgInPortableText={false}
        rightChildren={
          <>
            <p>{data.intro.textarea_intro_p}</p>
            <p>{data.intro.textarea_intro_p2}</p>
          </>
        }
      />

      {/* PREGUNTAS FRECUENTES */}
      <Column2
        id="section__faqs"
        sectionClassName="section__faqs"
        leftH3="/ PREGUNTAS FRECUENTES"
        leftPortableText={data.faqs.rich_faqs_title}
        leftHasImgInPortableText={false}
        rightChildren={
          <Accordion
            defaultOpenIndex={0}
            items={data.faqs.arr_faqs_list.map((faq, idx) => ({
              id: idx,
              header: faq.string_faqs_h3,
              contentText: faq.textarea_faqs_p,
            }))}
          />
        }
      />

      <PreFooter />
    </main>
  );
}
