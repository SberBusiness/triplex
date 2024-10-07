import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {ETextSize} from '@sberbusiness/triplex/components/Typography/enums';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';

export interface IListItemControlsButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React.ReactNode;
}

/** Кнопка listItem для области под свайпом. */
export const ListItemControlsButton = React.forwardRef<HTMLButtonElement, IListItemControlsButtonProps>(
    ({children, className, icon, ...rest}, ref) => (
        <button
            type="button"
            className={classnames(
                'cssClass[listItemControlsButton]',
                {
                    'cssClass[withIcon]': typeof icon !== 'undefined',
                    'cssClass[withText]': typeof children !== 'undefined',
                },
                className
            )}
            {...rest}
            ref={ref}
        >
            <span className="cssClass[listItemControlsButtonInner]">
                {icon ? <span className="cssClass[listItemControlsButtonIcon]">{icon}</span> : null}
                {children ? (
                    <Text className="cssClass[listItemControlsButtonLabel]" size={ETextSize.B2}>
                        {children}
                    </Text>
                ) : null}
            </span>
        </button>
    )
);

ListItemControlsButton.displayName = 'ListItemControlsButton';
