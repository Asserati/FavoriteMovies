import { ReactNode } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper } from "swiper/react";

type NavigationSwiperProps = {
  children: ReactNode;
};

const NavigationSwiper = ({ children }: NavigationSwiperProps) => {
  return (
    <div className="NavigationSwiper">
      <Swiper
        spaceBetween={10}
        grabCursor={true}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Navigation, Pagination]}
        style={{ width: "100%", height: "max-content" }}
      >
        {children}
      </Swiper>
    </div>
  );
};

export default NavigationSwiper;
