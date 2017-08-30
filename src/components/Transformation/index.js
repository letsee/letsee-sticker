// @flow
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CompleteButton from '../CompleteButton';
import TrashButton from '../TrashButton';
import TipButton from '../TipButton';
import ResetButton from '../ResetButton';

const NavTopRight = styled.div`
  position: absolute;
  top: 25px;
  right: 0;
`;

const StyledTipButton = styled(TipButton)`
  position: absolute;
  bottom: 4px;
  left: 4px;
`;

const StickerActions = styled.div`
  position: absolute;
  bottom: 139px;
  right: 4px;
`;

const StyledResetButton = styled(ResetButton)`
  margin-bottom: 6px;
`;

type TransformationPropTypes = {
  onTipClick?: MouseEventHandler, // eslint-disable-line react/require-default-props
  onComplete?: MouseEventHandler, // eslint-disable-line react/require-default-props
  onDelete?: MouseEventHandler, // eslint-disable-line react/require-default-props
  onReset?: MouseEventHandler, // eslint-disable-line react/require-default-props
  children?: any, // eslint-disable-line react/require-default-props
};

const Transformation = ({
  onTipClick,
  onComplete,
  onDelete,
  onReset,
  children,
  ...other
}: TransformationPropTypes) => (
  <div {...other}>
    <NavTopRight>
      <CompleteButton onClick={onComplete} />
    </NavTopRight>

    <StyledTipButton onClick={onTipClick} />

    <StickerActions>
      <StyledResetButton onClick={onReset} />
      <TrashButton onClick={onDelete} />
    </StickerActions>

    {children}
  </div>
);

Transformation.propTypes = {
  onTipClick: PropTypes.func, // eslint-disable-line react/require-default-props
  onComplete: PropTypes.func, // eslint-disable-line react/require-default-props
  onDelete: PropTypes.func, // eslint-disable-line react/require-default-props
};

export default Transformation;
