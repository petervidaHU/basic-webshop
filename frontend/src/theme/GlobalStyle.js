import { createGlobalStyle } from 'styled-components';
import { color, layout, flexbox, space } from 'styled-system';

export const Global = createGlobalStyle`
  body {
      margin: 0;
      box-sizing: border-box;
      font-family: ${props => props.theme.fonts.body2} ;

  }
  h1 {
    color: ${props => props.theme.colors.text};
  }

  label {
    font-family: ${props => props.theme.fonts.body2} ;
    font-weight: 900;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
  `;
