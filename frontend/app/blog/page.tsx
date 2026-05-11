import React from "react";
import "./page.scss";

import PreFooter from "../common/components/footer/PreFooter";
import { getBlogPage, getPostCategories, getPosts } from "../_domain/sanity";
import { getPageMetadata } from "../common/utils/helper-seo";
import Hero from "../common/components/hero/Hero";
import FilterAndPagination from "../common/components/filter/FilterAndPagination";


export async function generateMetadata() {
  return getPageMetadata(getBlogPage);
}

const page = async () => {
  const pageData = await getBlogPage();
  const posts = await getPosts();
  const postCategories = await getPostCategories();

  const filterOptions = [
    { value: "all", label: "Todas las categorías" },
    ...postCategories.map((cat) => ({
      value: cat.general.slug.current,
      label: cat.general.string_category_name,
    })).filter((option) => option.value.trim() !== "" && option.label.trim() !== ""),
  ];

  return (
    <main id="Blog">
      <Hero variant="blog" data={pageData} />

      <section id="sectionBlog" className="section__blog">
        <FilterAndPagination
          allItems={posts}
          filterOptions={filterOptions}
          itemsPerPage={18}
          dataTitle={pageData.post.rich_blog_title}
          variant="blog"
        />
      </section>

      <PreFooter />
    </main>
  );
};

export default page;