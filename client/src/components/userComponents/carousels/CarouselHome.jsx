import React from "react";
import { Carousel, Image } from "react-bootstrap";
import CarouselOne from "@/assets/banner1.jpg";
import CarouselTwo from "@/assets/banner2.jpg";
import CarouselThree from "@/assets/banner3.jpg";

function CarouselHome() {
  return (
    <>
      <Carousel>
        <Carousel.Item interval={2000}>
          <Image className="carouselImage" src={CarouselOne} />
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <Image className="carouselImage" src={CarouselTwo} />
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <Image className="carouselImage" src={CarouselThree} />
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default CarouselHome;
