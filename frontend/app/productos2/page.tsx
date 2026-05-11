import "./page.scss";

import PreFooter from "../common/components/footer/PreFooter";
import FilterAndPagination from "../common/components/filter/FilterAndPagination";


import { getPageMetadata } from "../common/utils/helper-seo";
import { getCatalogPage, getCatalogProduct2SEO, getProduct2Categories, getProducts2 } from "../_domain/sanity";
import Hero from "../common/components/hero/Hero";

export async function generateMetadata() {
  return getPageMetadata(getCatalogProduct2SEO);
}

const page = async () => {
  const data = await getCatalogPage();
  const products = await getProducts2();
  const productCategories = await getProduct2Categories();

  const filterOptions = [
    { value: "all", label: "Todas las categorías" },
    ...productCategories.map((cat) => ({
      value: cat.general.slug.current,
      label: cat.general.string_category_name,
    })).filter((option) => option.value.trim() !== "" && option.label.trim() !== ""),
  ];

  return (
    <main id="Products2">
      <Hero variant="catalog-productos2" data={data} />

      <section id="section__products" className="section__products">
        <FilterAndPagination
          allItems={products}
          filterOptions={filterOptions}
          itemsPerPage={18}
          dataTitle={data.servicio.rich_servicio_title}
          variant="productos2"
        />
      </section>

      <PreFooter />
    </main>
  );
};

export default page;