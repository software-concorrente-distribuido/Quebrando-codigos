import { Controller } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Slide from "../Slide";
import { SwiperContainer } from "./styles";

const SwiperComponent = ({
  controlledSwiper,
  setControlledSwiper,
  totalSlides,
  slidesPerView,
  goToSlide,
  activeIndex,
  handleSlideChange,
  slides,
}) => {
  return (
    <SwiperContainer>
      <Swiper
        spaceBetween={30}
        slidesPerView={slidesPerView}
        modules={[Controller]}
        controller={{ control: controlledSwiper }}
        onSwiper={setControlledSwiper}
        onSlideChange={handleSlideChange}
        loop
      >
        {slides?.map((slide, index) => (
          <SwiperSlide key={slide.url || slide.name || index}>
            <Slide url={slide.url} name={slide.name} videoId={slide.videoId}/>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <Pagination
        total={totalSlides + 1 - slidesPerView}
        active={activeIndex}
        slideTo={goToSlide}
      /> */}
    </SwiperContainer>
  );
};

export default SwiperComponent;
