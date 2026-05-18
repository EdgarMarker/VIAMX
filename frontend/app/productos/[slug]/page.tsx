import "./page.scss";
import { getProductBySlug, getProducts } from "@/app/_domain/sanity";
import Column2 from "@/app/common/components/layout/Column2";
import CustomPortableText from "@/app/common/components/text/CustomPortableText";
import ResponsiveImage from "@/app/common/components/img/ResponsiveImage";
import GoogleMap from "@/app/common/components/maps/GoogleMap";
import PreFooter from "@/app/common/components/footer/PreFooter";
import GallerySlider from "./components/GallerySlider";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.general.slug.current }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const data = await getProductBySlug(slug);
  return { title: data?.general.string_general_name ?? "Desarrollo" };
}

function parseCoords(url: string): { lat: number; lng: number } | null {
  if (!url) return null;
  try {
    const match =
      url.match(/[?&]q=([+-]?\d+\.?\d*),([+-]?\d+\.?\d*)/) ||
      url.match(/@([+-]?\d+\.?\d*),([+-]?\d+\.?\d*)/) ||
      url.match(/^([+-]?\d+\.?\d*),([+-]?\d+\.?\d*)$/);
    if (!match) return null;
    return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
  } catch {
    return null;
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getProductBySlug(slug);
  if (!data) notFound();

  const coords = parseCoords(data.location.string_location_maps);

  return (
    <main id="ProductDetail">

      {/* HERO */}
      <section className="section__hero section__hero--product-detail">
        <div className="hero__img">
          <ResponsiveImage imageData={data.general.img_general_hero} variant="hero" priority />
        </div>
        <div className="hero__overlay">
          <span className="breadcrumbs">
            <Link href="/productos">Desarrollos</Link>
            {" / "}
            <span>Departamentos</span>
          </span>
          <h1>{data.general.string_general_name}</h1>
        </div>
      </section>

      {/* DESCRIPCIÓN GENERAL */}
      <section className="section__intro" id="section__intro">
        <div className="column__1">
          <div className="intro__grid">
            <div className="intro__col">
              <h3>/ Descripción General</h3>
              <CustomPortableText data={data.intro.rich_intro_title} hasImg={false} />
            </div>
            <p className="intro__col">{data.intro.textarea_intro_p}</p>
            <p className="intro__col">{data.intro.textarea_intro_p2}</p>
          </div>
        </div>
        {data.intro.arr_intro_gallery.length > 0 && (
          <GallerySlider images={data.intro.arr_intro_gallery} />
        )}
      </section>

      {/* AMENIDADES */}
      <section className="section__amenities" id="section__amenities">
        <div className="column__1">
          <h3>/ Amenidades</h3>
          <CustomPortableText data={data.amenities.rich_amenities_title} hasImg={false} />
        </div>
        <div className="column__1">
          <ul className="listado x4 amenities__grid">
            {data.amenities.arr_ref_amenities_list.map((amenity, idx) => (
              <li key={idx} className="amenity__card">
                <div className="amenity__icon">
                  <ResponsiveImage imageData={amenity.customIcon} variant="icon" />
                </div>
                <span>{amenity.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* UBICACIÓN */}
      <Column2
        id="section__location"
        sectionClassName="section__location"
        leftChildren={
          <>
            <h3>/ Ubicación</h3>
            <CustomPortableText data={data.location.rich_location_title} hasImg={false} />
            {data.location.string_location_maps && (
              <a
                href={data.location.string_location_maps}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                Abrir en Google Maps
              </a>
            )}
          </>
        }
        rightChildren={
          coords ? (
            <GoogleMap
              apiKey={data.location.string_location_api}
              lat={coords.lat}
              lng={coords.lng}
              height={500}
            />
          ) : null
        }
      />

      <PreFooter />
    </main>
  );
}
