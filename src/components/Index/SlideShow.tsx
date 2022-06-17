import React, {Component} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from "react-responsive-carousel";
import img_1 from "../../images/banner1.svg";
import img_2 from "../../images/banner2.svg";
import img_3 from "../../images/banner3.svg";
import img_4 from "../../images/banner4.svg";
import "./SlideShow.css";


class SlideShow  extends Component
{



    render()
    {
        return (
            <Carousel className="slideshow" swipeable={true} showThumbs={false} showStatus={false} autoPlay={true} infiniteLoop={true}>
                <div>
                    <img src={img_1} alt={"img1"} />
                </div>
                <div>
                    <img src={img_2} alt={"img2"} />
                </div>
                <div>
                    <img src={img_3} alt={"img3"} />
                </div>
                {/* <div>
                    <img src={img_4} alt={"img3"} />
                </div> */}
            </Carousel>
        );
    }
}

export default SlideShow;
