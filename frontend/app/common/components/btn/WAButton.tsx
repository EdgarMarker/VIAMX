// "use client";
// import "./button.scss";
// import { CompanyInterface } from "@/app/_domain/sanity";
// import { useAnalytics } from "../../utils/AnalyticsProvider";
// 
// interface Props {
//   data: CompanyInterface;
// }
// 
// const WAButton = ({ data }: Props) => {
//   const { track } = useAnalytics();
// 
//   const number = data.contact.string_contact_line_contact_wa.replace(
//     /\D/g,
//     ""
//   );
//   const handleClick = () => {
//     track("Contact");
//   };
// 
//   return (
//     <div className="btn__wa">
//       <a
//         href={`https://wa.me/+52${number}`}
//         target="_blank"
//         rel="noopener noreferrer"
//         aria-label="Ir a WhatsApp"
//         onClick={handleClick}
//       >
//         <img src="/svg/whatsapp.svg" alt="icono-whatsapp" />
//       </a>
//     </div>
//   );
// };
// 
// export default WAButton;

export default (() => null) as any;
