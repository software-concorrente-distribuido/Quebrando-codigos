import styled from "styled-components";

export const Container = styled.div`
  border-radius: 8px;
  cursor: pointer;

  width: 400px;
  height: 300px;

  img {
    object-fit: cover;
    width: 400px;
    transition: 0.1s linear;
    height: 300px;
  }

  position: relative;

  overflow: hidden;
  background: black;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    img {
      opacity: 0.3;
    }

    .hidden {
      opacity: 1;
    }
  }
`;

export const Filter = styled.div`
  background-image: linear-gradient(
    8deg,
    hsl(240 17% 14% / 74%) 14%,
    hsl(240 17% 14% / 14%) 50%
  );

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

export const StreamName = styled.span`
  position: absolute;
  font-size: 22px;
  font-weight: 700;

  bottom: 20px;
  z-index: 200;
`;

export const Icon = styled.div`
  border-radius: 50px;
  width: 60px;
  height: 60px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #264e70;
  z-index: 200;
  opacity: 0;
  transition: 0.1s linear;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  * {
    color: white;
    font-size: 20px;
  }
`;
