import React, {Component} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from "react-responsive-carousel";
import img_1 from "../../images/hospital.jpg";
import img_2 from "../../images/banner1.svg";
import "./SlideShow.css";


class SlideShow  extends Component
{



    render()
    {
        return (
            <Carousel className="slideshow" swipeable={true} showThumbs={false} showStatus={false} autoPlay={true} infiniteLoop={true}>
                <div>
                    <img src={img_2} alt={"img1"} />
                </div>
                <div>
                    <img src={img_1} alt={"img2"} />
                </div>
                <div>
                    <img src={img_2} alt={"img3"} />
                </div>
            </Carousel>
        );
    }
}

export default SlideShow;
