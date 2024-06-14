import styled from "styled-components";

export const Container = styled.div`
  margin-top: 40px;

  width: 100%;
  height: 500px;

  position: relative;

  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: 16px;

  background: black;

  img {
    object-fit: cover;
    transition: 0.1s linear;
    width: 100%;
    opacity: 0.7;
    z-index: 2;
  }

  &:hover {
    img {
      opacity: 0.4;
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
  z-index: 200;
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: absolute;
  right: 80px;

  z-index: 2;
`;

export const StreamName = styled.span`
  font-size: 34px;
  font-weight: 700;
`;

export const SubTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 23px;
`;

export const PlayButton = styled.div`
  border-radius: 50px;
  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #264e70;

  * {
    color: white;
    font-size: 20px;
  }
`;
