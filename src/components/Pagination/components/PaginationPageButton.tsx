import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {ButtonBase, IButtonBaseProps} from '@sberbusiness/triplex/components/protected/ButtonBase/ButtonBase';

/** Свойства компонента PaginationPageButton. */
interface IPaginationPageButtonProps extends IButtonBaseProps {
    isCurrent?: boolean;
}

/** Кнопки-страницы.  */
export const PaginationPageButton = React.forwardRef<HTMLButtonElement, IPaginationPageButtonProps>(
    ({isCurrent = false, children, className, ...rest}, ref) => {
        return (
            <ButtonBase
                className={classnames(
                    'cssClass[paginationPageButton]',
                    {
                        'cssClass[currentPage]': isCurrent,
                    },
                    className
                )}
                aria-live={isCurrent ? 'polite' : undefined}
                {...rest}
                ref={ref}
            >
                {children}
            </ButtonBase>
        );
    }
);

PaginationPageButton.displayName = 'PaginationPageButton';
