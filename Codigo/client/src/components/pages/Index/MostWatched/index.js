import { useSwiper } from "../../../../hooks/useSwiper";
import SwiperComponent from "../../../Swiper";
import SectionTitle from "../SectionTitle";
import { Container } from "./styles";

const MostWatched = () => {
  const swiperProps = useSwiper();

  const slides = [
    {
      url: "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/7938409f67b30b0e64830fe21f6a2253418283ec-1920x1080.jpg",
      name: "Guia Fade",
      videoId: "faze.mp4"
    },
    {
      url: "https://www.esports.net/wp-content/uploads/2023/07/faze-clan-valorant-e1690260375615.jpg",
      name: "Controle de mira",
      videoId: "mira.mp4"
    },
    {
      url: "https://editors.dexerto.com/wp-content/uploads/2023/04/11/Sentinels-pancada-VCT-Americas.jpg",
      name: "Pancada",
      videoId: "pancada.mp4"
    },
    {
      url: "https://i.ytimg.com/vi/Xslh6-cQdjw/maxresdefault.jpg",
      name: "Sheriff",
      videoId: "sheriff.mp4"
    },
   
  ];

  return (
    <Container>
      <SectionTitle title="VALORANT" {...swiperProps} />
      <SwiperComponent {...swiperProps} slides={slides} />
    </Container>
  );
};

export default MostWatched;
