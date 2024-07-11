import Template from "../components/Template";
import VideoPlayer from "../components/pages/Player/VideoPlayer";
import { Container, Wrapper } from "../styles/pages";

const VideoPage = () => {
  return (
    <Template>
      <Wrapper>
        <Container>
          <VideoPlayer />
        </Container>
      </Wrapper>
    </Template>
  );
};

export default VideoPage;
