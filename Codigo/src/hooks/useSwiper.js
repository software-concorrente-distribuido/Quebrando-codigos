import { useState } from "react";

export const useSwiper = () => {
  const [controlledSwiper, setControlledSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClickPrev = () => controlledSwiper.slidePrev();
  const handleClickNext = () => controlledSwiper.slideNext();
  const goToSlide = (index) => controlledSwiper.slideTo(index);

  const handleSlideChange = () => {
    setActiveIndex(controlledSwiper?.activeIndex || 0);
  };

  return {
    handleSlideChange,
    handleClickNext,
    handleClickPrev,
    goToSlide,
    activeIndex,
    setControlledSwiper,
    controlledSwiper,
    totalSlides: controlledSwiper?.slides?.length || 0,
    slidesPerView: 3,
  };
};
