import html2canvas from "html2canvas";
import GameStatsCard from "./GameStatsCard";
import { GameStats } from "@/utils";
import ReactDOM from "react-dom";

const CardToImage = async (stats: GameStats) => {
  const cardElement = document.createElement("div");
  ReactDOM.createPortal(<GameStatsCard stats={stats} />, document.body);
  document.body.appendChild(cardElement);
  console.log(cardElement);
  const canvas = await html2canvas(cardElement);
  const imageDataUrl = canvas.toDataURL("image/jpeg");

  document.body.removeChild(cardElement);
  return imageDataUrl;
};

export default CardToImage;
