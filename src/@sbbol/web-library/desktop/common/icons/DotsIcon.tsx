import {IIconProps} from '@sberbusiness/icons/models';
import * as React from 'react';

/**
 * Иконка 3 точки.
 * @param {IIconProps} props Свойства компонента.
 */
export function DotsIcon(props: IIconProps): JSX.Element {
    return (
        <svg
            width={16}
            height={4}
            fill="none"
            viewBox="0 0 16 4"
            focusable="false"
            {...props}
            className={`svg-icon ${props.className || ''}`}
        >
            <path
                fill="#1F1F22"
                d="M4 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM10 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM14 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
            />
        </svg>
    );
}
