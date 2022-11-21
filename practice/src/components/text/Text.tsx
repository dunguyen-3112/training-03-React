import React, { useCallback } from 'react';
import { FONT_SIZE, FONT_WEIGHT } from '../../types';

import classes from './Text.module.sass';

interface SizeProp {
    fontSize: FONT_SIZE;
    fontWeight: FONT_WEIGHT;
}

interface Prop {
    type: string;
    size?: SizeProp;
    children: string;
}

function Text({ type, size, children }: Prop) {
    size = size || {
        fontSize: FONT_SIZE.FONT_SIZE_12,
        fontWeight: FONT_WEIGHT.FONT_WEIGHT_400,
    };

    return React.createElement(
        type,
        {
            className: classes[`text-${size.fontWeight}-${size.fontSize}`],
        },
        children,
    );
}

export default Text;
