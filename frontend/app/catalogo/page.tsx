import "./page.scss";
import Link from "next/link";
import FilterAndPagination from "../common/components/filter/FilterAndPagination";
import PreFooter from "../common/components/footer/PreFooter";
import { getCatalogPage, getCatalogProductSEO, getProducts, getProductCategories } from "../_domain/sanity";
import { getPageMetadata } from "../common/utils/helper-seo";

export async function generateMetadata() {
  return getPageMetadata(getCatalogProductSEO);
}

export default async function CatalogoPage() {
  const data = await getCatalogPage();
  const products = await getProducts();
  const productCategories = await getProductCategories();

  const filterOptions = [
    { value: "all", label: "Todas las categorías" },
    ...productCategories
      .map((cat) => ({
        value: cat.general.slug.current,
        label: cat.general.string_category_name,
      }))
      .filter((o) => o.value.trim() !== "" && o.label.trim() !== ""),
  ];

  return (
    <main id="CatalogoPage">

      <section className="section__breadcrumb">
        <div className="column__1">
          <nav className="breadcrumbs">
            <Link href="/">Inicio</Link>
            {" / "}
            <span>Desarrollos</span>
          </nav>
        </div>
      </section>

      <section id="section__catalogo" className="section__catalogo">
        <FilterAndPagination
          allItems={products}
          filterOptions={filterOptions}
          itemsPerPage={18}
          dataTitle={data.Desarrollo.rich_Desarrollo_title}
          variant="productos"
        />
      </section>

      <PreFooter />
    </main>
  );
}
