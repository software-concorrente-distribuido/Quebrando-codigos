import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Container, NavButton } from "./styles";

const NavigationSwiper = ({
  handleClickNext,
  handleClickPrev,
  controlledSwiper,
}) => {
  console.log(controlledSwiper);

  return (
    <Container>
      <NavButton onClick={handleClickPrev}>
        <FaArrowLeft size={25} />
      </NavButton>
      <NavButton onClick={handleClickNext}>
        <FaArrowRight size={25} />
      </NavButton>
    </Container>
  );
};

export default NavigationSwiper;
