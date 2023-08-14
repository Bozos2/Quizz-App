import React from "react";
import "../input.css";

import SportSVG from "../assets/CategorySvgIcons/SportSVG";
import AnimalsSVG from "../assets/CategorySvgIcons/AnimalsSVG";
import BooksSVG from "../assets/CategorySvgIcons/BooksSVG";
import FilmSVG from "../assets/CategorySvgIcons/FilmSVG";
import GeneralSVG from "../assets/CategorySvgIcons/GeneralSVG";
import GeographySVG from "../assets/CategorySvgIcons/GeographySVG";
import HistorySVG from "../assets/CategorySvgIcons/HistorySVG";
import MusicSVG from "../assets/CategorySvgIcons/MusicSVG";
import MythologySVG from "../assets/CategorySvgIcons/MythologySVG";
import PoliticsSVG from "../assets/CategorySvgIcons/PoliticsSVG";
import ScienceSVG from "../assets/CategorySvgIcons/ScienceSVG";

const categoryIcons = {
  Sports: <SportSVG />,
  "General Knowledge": <GeneralSVG />,
  Animals: <AnimalsSVG />,
  Mythology: <MythologySVG />,
  Geography: <GeographySVG />,
  History: <HistorySVG />,
  Politics: <PoliticsSVG />,
  "Science Nature": <ScienceSVG />,
  Film: <FilmSVG />,
  Music: <MusicSVG />,
  Books: <BooksSVG />,
};

const categoryColors = {
  Sports: "bg-gradient-to-br from-sport1 to-sport2",
  "General Knowledge": "bg-gradient-to-br from-general1 to-general2",
  Animals: "bg-gradient-to-br from-animals1 to-animals2",
  Mythology: "bg-gradient-to-br from-mythology1 to-mythology2",
  Geography: "bg-gradient-to-br from-geography1 to-geography2",
  History: "bg-gradient-to-br from-history1 to-history2",
  Politics: "bg-gradient-to-br from-politics1 to-politics2",
  "Science Nature": "bg-gradient-to-br from-science1 to-science2",
  Film: "bg-gradient-to-br from-film1 to-film2",
  Music: "bg-gradient-to-br from-music1 to-music2",
  Books: "bg-gradient-to-br from-books1 to-books2",
};

const Card = (props) => {
  const { category } = props;
  const color = categoryColors[category] || "bg-purple-700 dark:bg-purple-400";

  const cardStyle = `block w-72 h-80 p-4  ${color} border border-black-200 rounded-lg cursor-pointer shadow dark:border-gray-700`;

  const categoryIcon = categoryIcons[category];

  return (
    <div className={`${cardStyle}`}>
      {props.children}
      <div className="mt-[-290px] ml-[-18px]">{categoryIcon}</div>
    </div>
  );
};

export default Card;
