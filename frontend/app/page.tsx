import "./page.scss";
import Column1 from "./common/components/layout/Column1";
import Hero from "./common/components/hero/Hero";
import ColdNumbers from "./common/components/text/ColdNumbers";
import ProductCard from "./common/components/card/ProductCard";
import SliderPost from "./common/components/slider/SliderPost";
import { getHomePage } from "./_domain/sanity";
import SliderTesty from "./common/components/slider/SliderTesty";
import { getPageMetadata } from "./common/utils/helper-seo";
import PreFooter from "./common/components/footer/PreFooter";

export async function generateMetadata() {
  return getPageMetadata(getHomePage);
}

export default async function Home() {

  const data = await getHomePage();

  return (
    <main id="Home">
      <Hero variant="home" data={data} />

      <Column1
        id="section__intro"
        sectionClassName="section__intro fadeInOut"
        h3="Introducción"
        h2={data?.hero.string_hero_h1}
        portableText={data?.hero.rich_hero_title}
        button={{ href: "/contacto", label: "Contáctanos", className: "btn" }}
        image={{ imageData: data?.hero.img_hero_banner, variant: "hero" }}
      />

      
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
        id="section__rProducts"
        sectionClassName="section__rProducts fadeCards"
        portableText={data?.recentProduct.rich_recentProduct_sectionTitle}
        hasImgInPortableText={false}
      >
        <ul className="listado">
          {data?.recentProduct.arr_ref_recentProduct_Productos.map(
            (product, idx) => (
              <li key={idx}>
                <ProductCard data={product} />
              </li>
            ),
          )}
        </ul>
      </Column1>

      <SliderPost variant="Home" data={data} />
      <SliderTesty variant="Home" data={data} />

      <PreFooter />

    </main>
  );
}
