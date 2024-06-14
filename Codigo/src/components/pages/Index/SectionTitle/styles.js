import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 20px;

  margin: 50px 0 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding-bottom: 10px;

  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  span {
    color: white;
    font-size: 24px;
    font-weight: 700;
  }
`;

export const NavButton = styled.button`
  width: 40px;
  height: 40px;

  border: none;
  color: #3a8fb7;
  border-radius: 50%;
  background: none;

  outline: none;
  flex: none;

  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
`;
