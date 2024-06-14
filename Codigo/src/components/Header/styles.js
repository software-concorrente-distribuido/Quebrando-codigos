import styled from "styled-components";

export const Wrapper = styled.header`
  width: 100%;
  max-width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 20px;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1360px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 20px 0;
  background: none;
`;

export const Title = styled.span`
  font-size: 30px;
  font-weight: 700;
`;

export const SearchBar = styled.div`
  width: 100%;
  max-width: 320px;
  height: 40px;
  border-radius: 16px;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.4);
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 0 20px;
  font-size: 16px;
  transition: 0.1s linear;

  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.6);
  }

  input {
    ::placeholder {
      color: white;
      opacity: 1; /* Firefox */
    }

    ::-ms-input-placeholder {
      /* Edge 12 -18 */
      color: white;
    }

    width: 100%;

    border: none;
    background: none;
    outline: none;
  }
`;

export const SearchButton = styled.button`
  position: absolute;
  right: 20px;
  background: none;
  outline: none;
  border: none;

  * {
    transition: 0.1s linear;
  }

  &:hover {
    * {
      color: #3a8fb7;
    }
  }
`;
