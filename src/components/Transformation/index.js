// @flow
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CompleteButton from '../CompleteButton';
import TrashButton from '../TrashButton';
import TipButton from '../TipButton';
import ResetButton from '../ResetButton';
import ZoomInButton from '../ZoomInButton';
import ZoomOutButton from '../ZoomOutButton';
import UndoButton from '../UndoButton';
import ColorPickerButton from '../ColorPickerButton';
import { BottomButtonContainer } from '../Container';
import { ImageButton } from '../Button';

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
  isTextMode?: boolean,
  onOpenColorPicker?: MouseEventHandler,
};

// 스티커 이동중일 때 출력되는 버튼에 대한 컴포넌트
// NavTopRight: 상단 완료버튼
// StyledTipButton : 왼쪽 하단 정보표출 화면
// StickerAction : 우측 하단 버튼
// : StyledResetButton : 스티커를 중앙으로 이동시킴.
// : TrashButton : 스티커를 지우고 이전 화면으로 복귀함.
const Transformation = ({
  onTipClick,
  onComplete,
  onDelete,
  onReset,
  children,
  onZoomIn,
  onZoomOut,
  onUndo,
  isTextMode,
  onColorPickerOpen,
  ...other
}: TransformationPropTypes) => (
  <div {...other}>
    {/*<NavTopRight>*/}
    {/*  <CompleteButton onClick={onComplete} />*/}
    {/*</NavTopRight>*/}

    <StyledTipButton onClick={onTipClick} />

    <StickerActions>
      { isTextMode ? <ColorPickerButton onClick={onColorPickerOpen}/> : null }
      <StyledResetButton onClick={onReset} />
      <ZoomInButton onClick={onZoomIn} />
      <ZoomOutButton onClick={onZoomOut}/>
      <UndoButton onClick={onUndo}/>
      <TrashButton onClick={onDelete} />
    </StickerActions>
  
    <BottomButtonContainer bottom="5%" marginItems="8px">
      <ImageButton
        imageWidth="60px"
        onClick={onDelete}
      >
        <img
          src="https://res.cloudinary.com/dkmjrt932/image/upload/v1589784130/assets/btn-cancel_3x.png"
          srcSet="
                https://res.cloudinary.com/dkmjrt932/image/upload/v1589784130/assets/btn-cancel_3x.png 2x,
                https://res.cloudinary.com/dkmjrt932/image/upload/v1589784130/assets/btn-cancel_3x.png 3x" />
      </ImageButton>
    
      <ImageButton
        imageWidth="60px"
        onClick={onComplete}
      >
        <img
          src="https://res.cloudinary.com/dkmjrt932/image/upload/v1589784130/assets/btn-confirm_3x.png"
          srcSet="
                https://res.cloudinary.com/dkmjrt932/image/upload/v1589784130/assets/btn-confirm_3x.png 2x,
                https://res.cloudinary.com/dkmjrt932/image/upload/v1589784130/assets/btn-confirm_3x.png 3x" />
      </ImageButton>
    </BottomButtonContainer>

    {children}
  </div>
);

Transformation.propTypes = {
  onTipClick: PropTypes.func, // eslint-disable-line react/require-default-props
  onComplete: PropTypes.func, // eslint-disable-line react/require-default-props
  onDelete: PropTypes.func, // eslint-disable-line react/require-default-props
  onZoomIn: PropTypes.func,
  onZoomOut: PropTypes.func,
  onUndo: PropTypes.func,
  onColorPickerOpen: PropTypes.func,
};

export default Transformation;
