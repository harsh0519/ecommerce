import {
  faBoxesPacking,
  faCartFlatbed,
  faFileLines,
  faGlobe,
  faMedal,
  faMobileScreenButton,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Container } from "react-bootstrap";
import CarouselHome from "../carousels/CarouselHome";
import { Delivery } from "./Delivery";
import Category from "./Category";
import { StarProducts } from "./StarProducts";

function HomeContent() {
  let productionCards = [
    {
      icon: faGlobe,
      text: "Production from Regions",
    },
    {
      icon: faMedal,
      text: "Quality Assurance",
    },
    {
      icon: faBoxesPacking,
      text: "Packing Technology",
    },
    {
      icon: faFileLines,
      text: "Terms and Margins",
    },
    {
      icon: faMobileScreenButton,
      text: "Online Buy Platform",
    },
    {
      icon: faCartFlatbed,
      text: "Availability of Microlots",
    },
  ];

  return (
    <>
      <CarouselHome />
      <Delivery />
      <Category/>
      <StarProducts />
    </>
  );
}

export default HomeContent;
