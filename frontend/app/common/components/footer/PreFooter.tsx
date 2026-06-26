import "./footer.scss";
import HubspotForm from "../form/HubspotForm";
import CustomPortableText from "../text/CustomPortableText";
import ResponsiveImage from "../img/ResponsiveImage";
import { getCompany } from "@/app/_domain/sanity";

const PreFooter = async () => {
  const data = await getCompany();
  return (
    <section className="section__prefooter">
      <div className="column__2">

        <div className="col__left">
          <h3 className="head__title head__title--white"><strong>/</strong> Contacto</h3>

          <CustomPortableText hasImg={false} data={data.contact.rich_contact_title} />

          <ul className="contact__list" role="list">
            {data.contact.string_contact_phone && (
              <li>
                <span className="contact__label">Teléfono</span>
                <a href={`tel:${data.contact.string_contact_phone}`}>
                  {data.contact.string_contact_phone}
                </a>
              </li>
            )}
            {data.contact.string_contact_email && (
              <li>
                <span className="contact__label">Correo electrónico</span>
                <a href={`mailto:${data.contact.string_contact_email}`}>
                  {data.contact.string_contact_email}
                </a>
              </li>
            )}
            {data.contact.string_contact_address && (
              <li>
                <span className="contact__label">Oficinas</span>
                <a
                  href={data.location.url_location_googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.contact.string_contact_address}
                </a>
              </li>
            )}
          </ul>

          {data.social.arr_list.length > 0 && (
            <div className="social__section">
              <span className="contact__label">Síguenos en</span>
              <div className="social__icons">
                {data.social.arr_list.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.url_social_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.string_social_name}
                    className="social__icon"
                  >
                    <ResponsiveImage imageData={item.icon_social_icon} variant="icon" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="col__right">
          <HubspotForm />
        </div>

      </div>
    </section>
  );
};

export default PreFooter;
