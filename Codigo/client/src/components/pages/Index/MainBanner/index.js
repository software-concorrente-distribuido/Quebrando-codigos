import { FaPlay } from "react-icons/fa";
import {
  Container,
  Description,
  Filter,
  PlayButton,
  StreamName,
  SubTitle,
} from "./styles";

const MainBanner = () => {
  return (
    <Container>
      <img src="https://a.espncdn.com/photo/2022/0303/r981587_1296x729_16-9.jpg" />
      <Filter />
      <Description>
        <StreamName>Forje suas habilidades</StreamName>
      </Description>
    </Container>
  );
};

export default MainBanner;
