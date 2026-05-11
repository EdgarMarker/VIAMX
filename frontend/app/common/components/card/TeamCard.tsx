import "./card.scss";
import React from "react";
import ResponsiveImage from "../img/ResponsiveImage";
import type { AboutPageInterface } from "@/app/_domain/sanity/aboutPage.contract";
import Svg from "../img/Svg";

type TeamMember = AboutPageInterface["ourTeam"]["arr_ourTeam_list"][number];

interface Props {
  data: TeamMember;
}

const TeamCard = ({ data }: Props) => {
  return (
    <div className="card card__team">
      <div className="head">
        {data.img_ourTeam_image?.media?.url ? (
          <ResponsiveImage imageData={data.img_ourTeam_image} variant="card" />
        ) : null}
      </div>
      <div className="body">
        <div className="card__list__name">
            <Svg variant="TeamUser" />
            <div>
                <h3>{data.string_ourTeam_name}</h3>
                <h4>{data.string_ourTeam_position}</h4>
            </div>
        </div>
        <ul className="card__list__contact">
            <li><Svg variant="TeamPhone" />{data.string_ourTeam_phone}</li>
            <li><Svg variant="TeamEmail" />{data.string_ourTeam_email}</li>
        </ul>
      </div>
    </div>
  );
};

export default TeamCard;