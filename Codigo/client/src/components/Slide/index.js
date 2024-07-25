import { FaPlay } from "react-icons/fa";
import { Container, Filter, Icon, StreamName } from "./styles";
import { useNavigate } from "react-router-dom";

const Slide = ({ url, name, videoId }) => {
  const navigate = useNavigate();

  const handlePlayClick = () => {
    navigate(`/player/${videoId}`);
  };
  return (
    <Container >
      <img src={url} />
      <Filter />
      <StreamName>{name}</StreamName>
      <Icon className="hidden" onClick={handlePlayClick} >
        <FaPlay />
      </Icon>
    </Container>
  );
};

export default Slide;
