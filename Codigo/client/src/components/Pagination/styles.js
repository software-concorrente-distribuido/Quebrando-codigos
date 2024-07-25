import styled from "styled-components";

export const Container = styled.div`
  margin: 20px auto 0;

  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Bullet = styled.div`
  cursor: pointer;
  width: 10px;
  background: green;
  height: 10px;
  border-radius: 50%;
  opacity: ${({ active }) => (active ? 1 : 0.3)};
`;
