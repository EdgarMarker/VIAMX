import "./footer.scss";
import HubspotForm from "../form/HubspotForm";
import CustomPortableText from "../text/CustomPortableText";
import { getCompany } from "@/app/_domain/sanity";

const PreFooter = async () => {
  const data = await getCompany()
  return (
    <section className="section__prefooter">
      <div className="column__2">
        <div className="col__left">
          <CustomPortableText
            hasImg={false}
            data={data.contact.rich_contact_title}
          />
          <ul role="list">
            <li>
              <a
                href={`tel:${data.contact.string_contact_phone}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.contact.string_contact_phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${data.contact.string_contact_email}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.contact.string_contact_email}
              </a>
            </li>
            <li>
              <a
                href={data.location.url_location_googleMaps}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.contact.string_contact_address}
              </a>
            </li>
            <li>
              <p>Horario de atención: {data.contact.textarea_contact_hours}</p>
            </li>
          </ul>
        </div>
        <div className="col__right">
          <HubspotForm />
        </div>
      </div>
    </section>
  );
};

export default PreFooter;
