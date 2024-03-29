// @flow
export const OPEN_TRANSFORMATION_GUIDE: 'OPEN_TRANSFORMATION_GUIDE' = 'OPEN_TRANSFORMATION_GUIDE';
export const CLOSE_TRANSFORMATION_GUIDE: 'CLOSE_TRANSFORMATION_GUIDE' = 'CLOSE_TRANSFORMATION_GUIDE';

export const openTransformationGuide = () => ({ type: OPEN_TRANSFORMATION_GUIDE });
export const closeTransformationGuide = () => ({ type: CLOSE_TRANSFORMATION_GUIDE });
