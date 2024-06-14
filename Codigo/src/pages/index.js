import Template from "../components/Template";
import MainBanner from "../components/pages/Index/MainBanner";
import MostWatched from "../components/pages/Index/MostWatched";
import Recommended from "../components/pages/Index/Recommended";
import { Container, Wrapper } from "../styles/pages";

const IndexPage = () => {
  return (
    <Template>
      <Wrapper>
        <Container>
          <MainBanner />
          <MostWatched />
          <Recommended />
        </Container>
      </Wrapper>
    </Template>
  );
};

export default IndexPage;
