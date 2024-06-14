import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: white;
    font-family: 'Inter', sans-serif;
  }

  button{
    cursor: pointer;
  }

  .swiper-slide {
    width: initial;
  }

  body {
    background: #0f1923; 
  }
`;
