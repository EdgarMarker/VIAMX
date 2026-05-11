import "./page.scss";
import GoogleMap from "../common/components/maps/GoogleMap";
import HubspotForm from "../common/components/form/HubspotForm";
import CustomPortableText from "../common/components/text/CustomPortableText";
import snazzyStyles from "@/app/common/components/maps/snazzyStyle.json";
import { getCompany, getContactPage, getMarketing } from "../_domain/sanity";
import { getPageMetadata } from "../common/utils/helper-seo";
import Hero from "../common/components/hero/Hero";

export async function generateMetadata() {
  return getPageMetadata(getContactPage);
}


// opcional: pega aquí el JSON de Snazzy (cuando lo tengas)
const snazzyStyle: any[] = []; // o tu array real

const page = async () => {
  
  const dataCompany = await getCompany()
  const dataMarketing = await getMarketing()
  const data = await getContactPage()

  const apiKey = (dataMarketing.google.string_google_apiMapsKey || "").trim();
  const lat = dataCompany?.location?.number_location_latitude;
  const lng = dataCompany?.location?.number_location_longitude;

  // mini-guard para no renderizar si falta algo
  const canRenderMap = Boolean(apiKey) && Number.isFinite(lat) && Number.isFinite(lng);

  console.log("MAPS KEY length:", apiKey.length);
console.log("LAT/LNG:", lat, lng);

  return (
    <main id="Contact">
      
      <Hero variant="contact" data={data}/>

      <section id="section__intro" className="section__intro">
        <div className="column__2">
          <div className="col__left">
            <CustomPortableText
              hasImg={false}
              data={data?.intro.rich_intro_sectionTitle || []}
            />
            <ul role="list">
              <li>
                <a
                  href={`tel:${dataCompany.contact.string_contact_phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {dataCompany.contact.string_contact_phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${dataCompany.contact.string_contact_email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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

      <section className="section__map">
        <div className="column__1">
          {canRenderMap ? (
            <GoogleMap
              apiKey={apiKey}
              className={"mapa"}
              lat={lat}
              lng={lng}
              zoom={15}
              styles={snazzyStyles as any}
            />
          ) : (
            <div style={{ padding: 16 }}>
              <p>No se pudo cargar el mapa (falta API key o coordenadas).</p>
            </div>
          )}
        </div>
      </section>

      
      
    </main>
  );
};

export default page;