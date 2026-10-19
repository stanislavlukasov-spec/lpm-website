import React from 'react';
import Slider from "react-slick";

const CarouselComponent = props => {
    const {
        children
    } = props 

    const settings = {
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        lazyLoad: true,
        arrows: false
    };
    
    return (
        <Slider {...settings}>
            {children}
        </Slider>
    )
}

export default CarouselComponent