import { IoSearch } from "react-icons/io5";
import { Container, SearchBar, SearchButton, Title, Wrapper } from "./styles";

const Header = () => {
  return (
    <Wrapper>
      <Container>
        <Title>SkillForge</Title>
        <SearchBar>
          <input />
          <SearchButton>
            <IoSearch size={24} />
          </SearchButton>
        </SearchBar>
      </Container>
    </Wrapper>
  );
};

export default Header;
