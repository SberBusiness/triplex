import React, {useContext} from 'react';
import {ESegmentedControlType, SegmentedControlContext} from '../SegmentedControl';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {ButtonBase} from '../../protected/ButtonBase/ButtonBase';

/** Свойства компонента SegmentedControlSegment. */
export interface ISegmentedControlSegmentProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    value: string;
}

/**
 * Компонент SegmentedControlSegment.
 * Рендерит один из сегментов SegmentedControl в виде HTML элемента button и реализует возможность выбора этого сегмента.
 * */
export const SegmentedControlSegment: React.FC<ISegmentedControlSegmentProps> = ({
    children,
    className,
    disabled,
    onClick,
    title,
    value,
    ...htmlButtonAttributes
}) => {
    const {disabled: disabledFromContext, type, value: contextValue, onSelectSegment} = useContext(SegmentedControlContext);

    const getSelectedStatus = (): boolean => {
        let selected = false;

        switch (type) {
            case ESegmentedControlType.MULTIPLE:
                selected = contextValue.includes(value);
                break;

            case ESegmentedControlType.SINGLE:
                selected = contextValue === value;
                break;
        }

        return selected;
    };

    const classNames = classnames(
        'cssClass[segmentedControlSegment]',
        // Класс для подсвечивания иконок.
        'hoverable',
        {
            'cssClass[selected]': getSelectedStatus(),
            // Класс для подсвечивания иконок.
            active: getSelectedStatus(),
            'cssClass[segmentedControlSingleSegment]': type === ESegmentedControlType.SINGLE,
            'cssClass[segmentedControlMultipleSegment]': type === ESegmentedControlType.MULTIPLE,
        },
        className
    );

    const getTitle = () => {
        if (title) {
            return title;
        }

        if (typeof children === 'string') {
            return children;
        }
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        switch (type) {
            case ESegmentedControlType.MULTIPLE:
                onSelectSegment({selected: !getSelectedStatus(), value});
                break;

            case ESegmentedControlType.SINGLE:
                onSelectSegment({selected: true, value});
                break;
        }

        onClick?.(event);
    };

    return (
        <ButtonBase
            className={classNames}
            title={getTitle()}
            disabled={disabled || disabledFromContext}
            aria-pressed={getSelectedStatus()}
            onClick={handleClick}
            {...htmlButtonAttributes}
        >
            <span className="cssClass[segmentedControlSegmentContent]">{children}</span>
        </ButtonBase>
    );
};

SegmentedControlSegment.displayName = 'SegmentedControlSegment';
