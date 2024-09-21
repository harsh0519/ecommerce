import React from 'react'
import { Carousel, Image } from 'react-bootstrap'
import CarouselHealth from '../../../assets/CarouselHealth.png'
import CarouselCertification from '../../../assets/CarouselCertification.png'

function CarouselHealthCertification() {

    return <>
        <Carousel>
            <Carousel.Item interval={2000}>
                <Image className='carouselHCImage' src={CarouselHealth}/>
            </Carousel.Item>
            <Carousel.Item interval={2000}>
                <Image className='carouselHCImage' src={CarouselCertification}/>
            </Carousel.Item>
        </Carousel>
    </>
}

export default CarouselHealthCertification