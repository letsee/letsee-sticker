// @flow
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: transparent;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
`;

// export const BottomActionsContainer = styled.div`
//   position: absolute;
//   bottom: 25px;
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   left: 50%;
//   transform: translateX(-50%);
// `;

export const BottomButtonContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  justify-content: center;
  
  // 하위 엘리먼트들의 간격 조정
  ${({marginItems})=>
    marginItems && `
        > * {
          margin-left: ${marginItems} !important;
          margin-right: ${marginItems} !important;
        }
      `
  }
  
  // bottom 으로부터 떨어진 위치 지정
  ${({bottom})=>
    bottom &&
      `bottom: ${bottom} !important`
  }
`;

export default Container;
