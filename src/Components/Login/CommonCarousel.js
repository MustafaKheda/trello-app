import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from "../../assest/Image/larissa-cardoso-zHUHeNT_UtE-unsplash.jpg";
import img2 from "../../assest/Image/reinhart-julian-d4ZYpoGjUXo-unsplash.jpg";
import img7 from "../../assest/Image/ryan-ancill-aJYO8JmVodY-unsplash.jpg";

import "../../assest/Css/Login.scss";

function CommonCarousel({ auth }) {
  const { show } = auth;
  return (
    <Carousel
      autoPlay={true}
      interval={3000}
      autoFocus={true}
      infiniteLoop={true}
      showStatus={false}
      showThumbs={false}
      className={`cardMedia ${show ? "login" : "signup"}`}
    >
      <div>
        <img src={img7} />
      </div>
      <div>
        <img src={img2} />
      </div>
      <div>
        <img src={img1} />
      </div>
    </Carousel>
  );
}

export default CommonCarousel;
