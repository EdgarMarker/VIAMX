import "./footer.scss";
import { NAV_ITEMS } from "@/app/common/utils/constants";
import ResponsiveImage from "../img/ResponsiveImage";
import Link from "next/link";
import { phonify } from "../../utils/slugify";
import { getCompany, getProducts } from "@/app/_domain/sanity";

export default async function Footer() {

  const data = await getCompany()
  const products = await getProducts()

  return (
    <footer>
      <div className="column__2">
        <div className="col__left">
          <div className="listado">
            <div className="foot__item">
              <h3>Mapa del sitio</h3>
              <ul role="list">
                {NAV_ITEMS.map((item) => {
                  return (
                    <li key={item.href}>
                      <Link href={item.href}>{item.title}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="foot__item">
              <h3>Productos</h3>
              <ul role="list">
                {products.map((item, index) => (
                  <li key={index}>
                    <Link href={`/productos/${item.general.slug.current}`}>
                      {item.general.string_general_name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="foot__item">
              <h3>Contáctanos</h3>
              <ul role="list">
                <li>
                  <a href={`tel:+52${phonify(data.contact.string_contact_phone)}`}>
                    {data.contact.string_contact_phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${data.contact.string_contact_email}`}>
                    {data.contact.string_contact_email}
                  </a>
                </li>
                <li>
                  <a href={data.location.url_location_googleMaps} target="_blank" rel="noopener noreferrer">
                    {data.contact.string_contact_address}
                  </a>
                  </li>
              </ul>
            </div>

            <div className="foot__item">
              <h3>Síguenos en</h3>
              <ul role="list">
                {data.social.arr_list.map((item, index) => (
                  <li key={index ?? ""}>
                    <a href={item.url_social_url} target="_blank">
                      {item.string_social_name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col__right">
          <Link href={"/"}>
            <ResponsiveImage
              imageData={data.general.icon_general_footerLogo}
              variant="icon"
            />
          </Link>
        </div>
      </div>

      <div className="column__1">
        <span>
          {data.general.string_general_name}
          {" ® "}
          {new Date().getFullYear()}
          {" Todos los derechos reservados. "}
          <Link href="/aviso-de-privacidad">Aviso de Privacidad</Link>{" - "}
          <Link href="/terminos-y-condiciones">Términos y Condiciones</Link>.
          {" Sitio web creado por "}
          <a
            href="https://marker.com.mx"
            target="_blank"
            rel="noopener noreferrer"
          >
            Marker
          </a>
        </span>
      </div>
    </footer>
  );
}
