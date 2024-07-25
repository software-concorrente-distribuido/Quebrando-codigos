import { useSwiper } from "../../../../hooks/useSwiper";
import SwiperComponent from "../../../Swiper";
import SectionTitle from "../SectionTitle";
import { Container } from "./styles";

const MostWatched = () => {
  const swiperProps = useSwiper();

  const slides = [
    {
      url: "https://cdn.espn.com.br/image/wide/622_9b3c5196-7c70-3710-8c49-a4dc02240eb8.jpg",
      name: "Ayel",
    },
    {
      url: "https://s2-techtudo.glbimg.com/shiEpZQz8jWbIGbBGqTNZRryRY8=/0x0:1920x1080/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2019/p/y/CjAvzAQB6C97BCbU887g/foto1.png",
      name: "4Lan",
    },
    {
      url: "https://s2.glbimg.com/08BOcmlXBvZyvumMOEKiln1apZc=/0x0:1600x1067/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2019/s/k/BKTFEaTLCG6OweJgC2Rg/yoda3.jpg",
      name: "YoDa",
    },
    {
      url: "https://noticias.maisesports.com.br/wp-content/uploads/2022/05/ranger-cblol-2022-lol.jpg",
      name: "Ranger",
    },
    {
      url: "https://a.espncdn.com/photo/2023/0703/r1193572_1296x729_16-9.jpg",
      name: "Baiano",
    },
  ];

  return (
    <Container>
      <SectionTitle title="Mais assistidos" {...swiperProps} />
      <SwiperComponent {...swiperProps} slides={slides} />
    </Container>
  );
};

export default MostWatched;
