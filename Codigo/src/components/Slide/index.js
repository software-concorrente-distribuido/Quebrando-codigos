import { FaPlay } from "react-icons/fa";
import { Container, Filter, Icon, StreamName } from "./styles";

const Slide = ({ url, name }) => {
  return (
    <Container>
      <img src={url} />
      <Filter />
      <StreamName>{name}</StreamName>
      <Icon className="hidden">
        <FaPlay />
      </Icon>
    </Container>
  );
};

export default Slide;
