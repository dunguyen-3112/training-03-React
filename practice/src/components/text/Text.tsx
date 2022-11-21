import React, { useCallback } from 'react';
import { FONT_WEIGHT_400, FONT_WEIGHT_600, FONT_WEIGHT_700 } from '../../types';

import classes from './Text.module.sass';

interface SizeProp {
    fontSize: FONT_WEIGHT_400 | FONT_WEIGHT_600 | FONT_WEIGHT_700;
    fontWeight:
        | FONT_WEIGHT_400.VALUE
        | FONT_WEIGHT_600.VALUE
        | FONT_WEIGHT_700.VALUE;
}

interface Prop {
    type: string;
    size?: SizeProp;
    children: string;
}

function Text({ type, size, children }: Prop) {
    size = size || {
        fontSize: FONT_WEIGHT_400.FONT_SIZE_12,
        fontWeight: FONT_WEIGHT_400.VALUE,
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
