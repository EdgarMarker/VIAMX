import type { MetadataRoute } from "next";
import {
  getPosts,
  getPostCategories,
  getProducts,
  getProductCategories,
  getProducts2,
  getProduct2Categories
} from "./_domain/sanity";

const DOMAIN_URL = "https://www.example.mx";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [
    posts,
    postCategories,
    products,
    productCategories,
    products2,
    product2Categories
  ] = await Promise.all([
    getPosts(),
    getPostCategories(),
    getProducts(),
    getProductCategories(),
    getProducts2(),
    getProduct2Categories()
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${DOMAIN_URL}/`, lastModified: new Date(), changeFrequency: "yearly", priority: 1 },
    { url: `${DOMAIN_URL}/nosotros`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${DOMAIN_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${DOMAIN_URL}/productos`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${DOMAIN_URL}/contacto`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${DOMAIN_URL}/aviso-de-privacidad`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${DOMAIN_URL}/terminos-y-condiciones`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];

  const postRoutes: MetadataRoute.Sitemap = (posts ?? [])
    .filter((post) => post.general.slug?.current)
    .map((post) => ({
      url: `${DOMAIN_URL}/blog/${post.general.slug.current}`,
      lastModified: post.general.date ? new Date(post.general.date) : new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  const postCategoryRoutes: MetadataRoute.Sitemap = (postCategories ?? [])
    .filter((cat) => cat.general.slug?.current)
    .map((cat) => ({
      url: `${DOMAIN_URL}/blog/categoria/${cat.general.slug.current}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    }));

  const productRoutes: MetadataRoute.Sitemap = (products ?? [])
    .filter((product) => product.general.slug?.current)
    .map((product) => ({
      url: `${DOMAIN_URL}/productos/${product.general.slug.current}`,
      lastModified: product.general.date ? new Date(product.general.date) : new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  const productCategoryRoutes: MetadataRoute.Sitemap = (productCategories ?? [])
    .filter((cat) => cat.general.slug?.current)
    .map((cat) => ({
      url: `${DOMAIN_URL}/productos/categoria/${cat.general.slug.current}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    }));

  const product2Routes: MetadataRoute.Sitemap = (products2 ?? [])
    .filter((p2) => p2.general.slug?.current)
    .map((p2) => ({
      url: `${DOMAIN_URL}/productos2/${p2.general.slug.current}`,
      lastModified: p2.general.date ? new Date(p2.general.date) : new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  const product2CategoryRoutes: MetadataRoute.Sitemap = (product2Categories ?? [])
    .filter((cat) => cat.general.slug?.current)
    .map((cat) => ({
      url: `${DOMAIN_URL}/productos2/categoria/${cat.general.slug.current}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    }));

  return [
    ...staticRoutes,
    ...postRoutes,
    ...postCategoryRoutes,
    ...productRoutes,
    ...productCategoryRoutes,
    ...product2Routes,
    ...product2CategoryRoutes,
  ];
}