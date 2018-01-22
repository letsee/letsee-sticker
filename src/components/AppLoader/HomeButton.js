// @flow
import React from 'react';
import { ImageButton } from '../Button';

const ImageButtonLink = ImageButton.withComponent('a');
const StyledImageButtonLink = ImageButtonLink.extend`
  text-decoration: none;
`;

type HomeButtonProps = {
  children?: any, // eslint-disable-line react/require-default-props
};

const HomeButton = ({ children, ...other }: HomeButtonProps) => (
  <StyledImageButtonLink
    href={process.env.LETSEE_SEARCH_URL || 'https://apps.letsee.io'}
    {...other}
  >
    <img
      alt="Letsee"
      src="https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_54,q_auto/v1502953362/assets/btn-menu-home_3x.png"
      srcSet="
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_108,q_auto/v1502953362/assets/btn-menu-home_3x.png 2x,
        https://res.cloudinary.com/df9jsefb9/image/upload/c_scale,h_162,q_auto/v1502953362/assets/btn-menu-home_3x.png 3x
      "
    />
  </StyledImageButtonLink>
);

export default HomeButton;
