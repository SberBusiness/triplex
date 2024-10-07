import React, {useContext} from 'react';
import {ClosetooltipSrvxIcon16} from '@sberbusiness/icons/ClosetooltipSrvxIcon16';
import {TooltipContext} from '@sberbusiness/triplex/components/Tooltip/TootlipContext';
import {ButtonIcon} from '@sberbusiness/triplex/components/Button/ButtonIcon';

/** Свойства компонента TooltipXButton. */
export interface ITooltipXButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Дочерние элементы. */
    children?: never;
}

/** Кнопка закрытия Tooltip. */
export const TooltipXButton: React.FC<ITooltipXButtonProps> = ({onClick, ...rest}) => {
    const {setTooltipOpen} = useContext(TooltipContext);

    /** Обработчик клика. */
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setTooltipOpen(false);
        onClick?.(event);
    };

    return (
        <ButtonIcon className="cssClass[tooltipXButton]" onClick={handleClick} {...rest}>
            <ClosetooltipSrvxIcon16 />
        </ButtonIcon>
    );
};
