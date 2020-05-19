// @flow
import styled from 'styled-components';

const Button = styled.button`
  display: block;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  background-color: transparent;
  outline: 0;
  margin: 0;
  padding: 0;
  border: 0;
  user-select: none;
  cursor: pointer;
`;

export const ImageButton = Button.extend`
  img {
    display: block;
  }
  
  ${({imageWidth})=>
    imageWidth &&
    `img {
      width: ${imageWidth}
    }`
  }
`;

export default Button;
