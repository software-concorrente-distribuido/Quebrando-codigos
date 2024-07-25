import NavigationSwiper from "../../../Navigation";
import { Container } from "./styles";

const SectionTitle = (props) => {
  const { navigation, title, ...rest } = props;

  return (
    <Container>
      <span>{title}</span>
      <NavigationSwiper {...rest} />
    </Container>
  );
};

export default SectionTitle;
