import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sliderImg from '../../assets/images/slider.jpg';
import sliderImg1 from '../../assets/images/slider1.jpg';
import sliderImg2 from '../../assets/images/slider2.jpg';

function Banner() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        cssEase: "linear"
    };

    return (
        <div>
            <Slider {...settings}>
                {
                    slideImages.map((item, index) => (
                        <div key={index} className='h-[600px] w-full flex'>
                            <img src={item.img} alt={`slider img ${index + 1}`} className="w-full object-cover" />'
                        </div>
                    ))
                }
            </Slider>
        </div>
    );
}
const slideImages = [
    { img: sliderImg },
    { img: sliderImg1 },
    { img: sliderImg2 },
];
export default Banner;
