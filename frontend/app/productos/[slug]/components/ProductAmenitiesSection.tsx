import Icon from "@/app/common/components/img/SanityIcon";
import CustomPortableText from "@/app/common/components/text/CustomPortableText";
import "./amenities.scss";

// ✅ tipo "plano" (lo que llega desde serialize)
type AmenityDTO = {
  _id?: string;
  name: string;
  iconSet?: string;
  // agrega aquí lo que Icon realmente use (customIcon, iconName, etc.)
  customIcon?: any;
  iconName?: string;
  [key: string]: any;
};

type Props = {
  titleBlocks: any[];
  amenities: AmenityDTO[];
};

export default function ProductAmenitiesSection({ titleBlocks, amenities }: Props) {
  return (
    <section className="section__amenities">
      <div className="column__1 fadeInOut">
        <CustomPortableText
          data={titleBlocks} hasImg={false}
        />
      </div>
      <div className="column__1">
        <ul className="listado fadeCards">
          {amenities.map((amenity, idx) => (
            <li key={idx ?? ""} className="card amenity">
              <Icon data={amenity as any} iconPackage={amenity.iconSet as any} />
              <span>{amenity.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}