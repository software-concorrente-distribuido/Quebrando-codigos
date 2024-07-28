import { useSwiper } from "../../../../hooks/useSwiper";
import SwiperComponent from "../../../Swiper";
import SectionTitle from "../SectionTitle";
import { Container } from "./styles";

const Recommended = () => {
  const swiperProps = useSwiper();

  const slides = [
    {
      url: "https://s2-ge.glbimg.com/AS55dnMaIRzB1i6YyufK_reh3u8=/0x0:1920x1280/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2022/W/y/I7bZIpSQOtKDaQpn4dKg/titan-lol-red-canids-cblol-2022.jpg",
      name: "Kiting",
      videoId: "titankite.mp4"
    },
    {
      url: "https://sm.ign.com/ign_br/screenshot/default/53345941569-bbb2582a6d-b_469r.jpg",
      name: "Controle de visão",
      videoId: "visao-lol.mp4"
    },
    {
      url: "https://noticias.maisesports.com.br/wp-content/uploads/2022/04/Guigo-RED-Canids-CBLOL-2022-Semfinal.jpg",
      name: "Top Lane",
      videoId: "fase-de-rotas.mp4"
    },
    {
      url: "https://s2-ge.glbimg.com/rlNxDiUoogDE_EAHZ5bpEjk3MG8=/1200x/smart/filters:cover():strip_icc()/s.glbimg.com/es/ge/f/original/2019/02/06/revolta2.jpg",
      name: "Jungle",
      videoId: "jungle.mp4"
    },
    {
      url: "https://pbs.twimg.com/profile_images/773415262758531072/W3xIMrrJ_400x400.jpg",
      name: "Macro Game",
      videoId: "macrogame.mp4"
    },
  ];

  return (
    <Container>
      <SectionTitle title="LEAGUE OF LEGENDS" {...swiperProps} />
      <SwiperComponent {...swiperProps} slides={slides} />
    </Container>
  );
};

export default Recommended;
