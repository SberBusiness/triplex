import {IIconProps} from '@sberbusiness/icons/models';
import * as React from 'react';

/**
 * Иконка в виде белой стрелки вправо.
 *
 * @param {IIconProps} props Свойства компонента.
 */
export function ArrowRightWhiteIcon20(props: IIconProps): JSX.Element {
    return (
        <svg width={20} height={20} viewBox="0 0 20 20" {...props} className={`svg-icon ${props.className || ''}`}>
            <path
                fill="#FFF"
                d="M10.708 15.707l5-4.996a1 1 0 0 0 .21-.33c.1-.243.1-.516 0-.759a1 1 0 0 0-.21-.33l-5-4.996a1.005 1.005 0 0 0-1.42 1.42l3.3 3.286h-7.59a1 1 0 1 0 0 1.999h7.59l-3.3 3.287a.999.999 0 0 0 0 1.419 1 1 0 0 0 1.42 0z"
            />
        </svg>
    );
}
