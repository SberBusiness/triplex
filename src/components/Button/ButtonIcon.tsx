import React from 'react';
import {EButtonIconShape} from '@sberbusiness/triplex/components/Button/enums';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {ButtonBase} from '../protected/ButtonBase/ButtonBase';

const getButtonIconShapeClassName = (shape?: EButtonIconShape) => {
    switch (shape) {
        case EButtonIconShape.SQUIRCLE:
            return 'cssClass[squircle]';
        case EButtonIconShape.CIRCLE:
            return 'cssClass[circle]';
    }
};

/** Свойства ButtonIcon. */
export interface IButtonIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Форма границы кнопки. */
    shape?: EButtonIconShape;
    /** Активное состояние. */
    active?: boolean;
}

/** Кнопка-иконка. */
export const ButtonIcon = React.forwardRef<HTMLButtonElement, IButtonIconProps>(
    ({className, disabled, shape = EButtonIconShape.SQUIRCLE, active, ...rest}, ref) => {
        const classNames = classnames('cssClass[buttonIcon]', getButtonIconShapeClassName(shape), 'hoverable', className, {
            active: !!active,
            disabled: !!disabled,
        });

        return <ButtonBase className={classNames} disabled={disabled} {...rest} ref={ref} />;
    }
);

ButtonIcon.displayName = 'ButtonIcon';

export {EButtonIconShape};
