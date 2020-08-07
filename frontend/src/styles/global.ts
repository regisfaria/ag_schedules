import { createGlobalStyle } from 'styled-components';
import bgImage from '../assets/bg.jpg';

export default createGlobalStyle`
  :root {
    font-size: 60%;


    --blue: #109CF1;
    --light-blue: #dff6fc;
    --yellow: #FFb946;
    --red: #F7685B;
    --green: #09644b;
    --purple: #885AF8;
    --black: #192A3E;
    --table-black: #323C47;
    --table-gray: #707683;
    --gray: #f2e9fc;
    --icon-gray: #C2CFE0;
    --white: #f1f1f1;
    --divider: #EBEFF2;
    --input-placeholder: #666360;
    --error-red: #c53030;
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #E5E5E5 url(${bgImage});
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 16px Poppins, sans-serifa;
  }

  #root {
    margin: 0 auto;
  }

  button {
    cursor: pointer;
  }
`;
