import { Bullet, Container } from "./styles";

const Pagination = ({ total, active, slideTo }) => {
  return (
    <Container>
      {Array.from({ length: total }).map((_, index) => (
        <Bullet
          key={index}
          active={active === index}
          onClick={() => slideTo(index)}
        />
      ))}
    </Container>
  );
};

export default Pagination;
