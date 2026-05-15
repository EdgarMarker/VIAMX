import "./page.scss";
import CustomPortableText from "../common/components/text/CustomPortableText";
import GoogleMap from "../common/components/maps/GoogleMap";
import HubspotForm from "../common/components/form/HubspotForm";
import PreFooter from "../common/components/footer/PreFooter";
import snazzyStyles from "@/app/common/components/maps/snazzyStyle.json";
import { getCompany, getContactPage, getMarketing } from "../_domain/sanity";
import { getPageMetadata } from "../common/utils/helper-seo";

export async function generateMetadata() {
  return getPageMetadata(getContactPage);
}

export default async function ContactoPage() {
  const data = await getContactPage();
  const dataCompany = await getCompany();
  const dataMarketing = await getMarketing();

  const apiKey = (dataMarketing.google.string_google_apiMapsKey || "").trim();
  const lat = dataCompany.location.number_location_latitude;
  const lng = dataCompany.location.number_location_longitude;
  const canRenderMap = Boolean(apiKey) && Number.isFinite(lat) && Number.isFinite(lng);

  return (
    <main id="ContactoPage">

      {/* INTRO — título + datos de contacto / formulario */}
      <section id="section__intro" className="section__intro">
        <div className="column__2">
          <div className="col__left">
            <CustomPortableText hasImg={false} data={data.intro.rich_intro_sectionTitle} />
            <ul role="list" className="contact__list">
              <li>
                <a href={`tel:${dataCompany.contact.string_contact_phone}`}>
                  {dataCompany.contact.string_contact_phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${dataCompany.contact.string_contact_email}`}>
                  {dataCompany.contact.string_contact_email}
                </a>
              </li>
              <li>
                <a
                  href={dataCompany.location.url_location_googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {dataCompany.contact.string_contact_address}
                </a>
              </li>
            </ul>
          </div>
          <div className="col__right">
            <HubspotForm />
          </div>
        </div>
      </section>

      {/* MAPA */}
      <section className="section__map">
        <div className="column__1">
          {canRenderMap ? (
            <GoogleMap
              apiKey={apiKey}
              className="mapa"
              lat={lat}
              lng={lng}
              zoom={15}
              styles={snazzyStyles as any}
            />
          ) : (
            <p>No se pudo cargar el mapa (falta API key o coordenadas).</p>
          )}
        </div>
      </section>

      <PreFooter />
    </main>
  );
}
