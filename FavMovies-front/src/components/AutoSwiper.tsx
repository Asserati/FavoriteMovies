import { ReactNode } from "react";
import { Swiper } from "swiper/react";

type TAutoSwiper = {
  children: ReactNode;
};
const AutoSwiper = ({ children }: TAutoSwiper) => {
  return (
    <div className="AutoSwiper">
      <Swiper slidesPerView="auto" grabCursor={true} style={{ width: "100%" }}>
        {children}
      </Swiper>
    </div>
  );
};

export default AutoSwiper;
