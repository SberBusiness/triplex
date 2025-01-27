import React from 'react';
import {ButtonIcon, IButtonIconProps} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {EButtonIconShape} from '@sberbusiness/triplex/components/Button/enums';
import {EPaginationNavigationIconDirection} from '@sberbusiness/triplex/components/Pagination/enums';
import {TabfoldercarouselleftSrvxIcon32} from '@sberbusiness/icons/TabfoldercarouselleftSrvxIcon32';
import {TabfoldercarouselrightSrvxIcon32} from '@sberbusiness/icons/TabfoldercarouselrightSrvxIcon32';

/** Свойства компонента PaginationNavigationButton. */
export interface IPaginationNavigationButtonProps extends Omit<IButtonIconProps, 'shape' | 'active'> {
    children?: never;
    direction: EPaginationNavigationIconDirection;
}

/** Кнопки-навигация. */
export const PaginationNavigationButton = React.forwardRef<HTMLButtonElement, IPaginationNavigationButtonProps>(
    ({direction, ...rest}, ref) => {
        return (
            <ButtonIcon shape={EButtonIconShape.SQUIRCLE} {...rest} ref={ref}>
                {direction === EPaginationNavigationIconDirection.BACK ? (
                    <TabfoldercarouselleftSrvxIcon32 />
                ) : (
                    <TabfoldercarouselrightSrvxIcon32 />
                )}
            </ButtonIcon>
        );
    }
);

PaginationNavigationButton.displayName = 'PaginationNavigationButton';
