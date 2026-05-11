import React from "react";
import "./page.scss";
import Hero from "../common/components/hero/Hero";
import { getAboutPage } from "../_domain/sanity";
import SplitPortableText from "../common/components/text/SplitPortableText";
import { getPageMetadata } from "../common/utils/helper-seo";
import HorizontalScroll from "../common/components/pin-scroll/HorizontalScroll";
import Column2 from "../common/components/layout/Column2";
import Column1 from "../common/components/layout/Column1";
import jsonData from "../common/components/accordion/accordion.data.json";
import DivisorImage from "../common/components/divisor/DivisorImage";
import Accordion from "../common/components/accordion/Accordion";
import PinScroll from "../common/components/pin-scroll/PinScroll";
import ColdNumbers from "../common/components/text/ColdNumbers";
import PreFooter from "../common/components/footer/PreFooter";
import TeamCard from "../common/components/card/TeamCard";


export async function generateMetadata() {
  return getPageMetadata(getAboutPage);
}

const page = async () => {
  const data = await getAboutPage()

  return (
    <main id="About">
      <Hero variant="about" data={data} />

      <SplitPortableText
        id="section__intro"
        className="section__intro"
        data={data.intro.rich_intro_sectionTitle}
        targetSelector="h2, p"
        hasImg={false}
        start="top 90%"
        end="top 65%"
      />
      <HorizontalScroll variant="about" data={data} />

      <Column2
        sectionClassName="section__intro fadeInOut"
        leftPortableText={data.intro.rich_intro_sectionTitle}
        leftHasImgInPortableText={false}
        leftButton={{ href: "/contacto", label: "Contáctanos" }}
        rightImage={{ imageData: data.intro.img_intro_sectionImage, variant: "banner" }}
      />

      {data.intro.img_intro_sectionImage && (
        <DivisorImage
          imageData={data.intro.img_intro_sectionImage}
          variant="hero"
          fromScale={1.2}
          toScale={1}
        />
      )}

      <PinScroll variant="about" data={data} />


      <Column1
        sectionClassName="section__team"
        portableText={data.ourTeam.rich_ourTeam_sectionTitle}
        hasImgInPortableText={false}
      >
        <ul className="listado x4 fadeCards">
          {data.ourTeam.arr_ourTeam_list.map((member, idx) => (
          <li key={idx}>
            <TeamCard data={member} />
          </li>
          ))}
        </ul>
      </Column1>


      {/*<SliderTeam data={data.ourTeam} />*/}


      <Column1
          sectionClassName="section__numbers"
          portableText={data.results.rich_results_sectionTitle}
        >
        <ColdNumbers items={data.results.arr_results_list.map((item, idx) => ({
          id: idx,
          prefix: item.string_results_list_item_prefix,
          sufix: item.string_results_list_item_suffix,
          number: item.number_results_list_item_value,
          data: item.string_results_list_item_label,
          img: item.img_results_list_item_icon,
        }))} />
      </Column1>



      <Column1
        sectionClassName="section__faq"
        portableText={data.faqs.rich_faqs_sectionTitle}
        hasImgInPortableText={false}
      >
        <Accordion
          defaultOpenIndex={0}
          items={data.faqs.arr_faqs_list.map((faq, idx) => ({
            id: idx,
            header: faq.string_faqs_question,
            content: faq.rich_faqs_answer,
          }))}
        />
      </Column1>


      <PreFooter />
    </main>
  );
};


export default page;
