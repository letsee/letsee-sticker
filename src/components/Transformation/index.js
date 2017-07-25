// @flow
import React from 'react';
import styled from 'styled-components';
import CompleteButton from '../CompleteButton';
import TrashButton from '../TrashButton';

const NavTopCenter = styled.div`
  position: absolute;
  top: 25px;
  left: 0;
  right: 0;
  user-select: none;
  padding: 17px 0;
  font-family: AppleSDGothicNeo, sans-serif;
  letter-spacing: 0.4px;
  color: #fff;
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  font-size: 18px;
  text-align: center;
`;

const NavTopRight = styled.div`
  position: absolute;
  top: 25px;
  right: 0;
`;

const NavBottomRight = styled.div`
  position: absolute;
  bottom: 80px;
  right: 10px;
`;

type TransformationPropTypes = {
  onComplete?: MouseEventHandler, // eslint-disable-line react/require-default-props
  onDelete?: MouseEventHandler, // eslint-disable-line react/require-default-props
};

const Transformation = ({
  onComplete,
  onDelete,
  children,
  ...other
}: TransformationPropTypes) => (
  <div {...other}>
    <NavTopCenter>
      위치/크기 조정
    </NavTopCenter>

    <NavTopRight>
      <CompleteButton onClick={onComplete} />
    </NavTopRight>

    <NavBottomRight>
      <TrashButton onClick={onDelete} />
    </NavBottomRight>
  </div>
);

export default Transformation;
