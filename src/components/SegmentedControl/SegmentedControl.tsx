import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {ISegmentedControlSegmentProps, SegmentedControlSegment} from './components/SegmentedControlSegment';
import {
    ISegmentedControlContext,
    TSegmentedControlMultipleOnSelect,
    TSegmentedControlMultipleValue,
    TSegmentedControlSingleOnSelect,
    TSegmentedControlSingleValue,
} from './types';

/**
 * Тип SegmentedControl, определяет возможность множественного выбора.
 */
export enum ESegmentedControlType {
    MULTIPLE,
    SINGLE,
}

/**
 * Тема SegmentedControl, определяет визуальный стиль.
 */
export enum ESegmentedControlTheme {
    GENERAL,
    SECONDARY,
}

export const SegmentedControlContext = React.createContext<ISegmentedControlContext>({
    disabled: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSelectSegment: () => {},
    type: ESegmentedControlType.SINGLE,
    value: '',
});

/**
 * Общие свойства для SegmentedControl type MULTIPLE и SegmentedControl type SINGLE.
 */
export interface ISegmentedControlCommonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    disabled?: boolean;
    theme?: ESegmentedControlTheme;
}

/**
 * Свойства SegmentedControl type MULTIPLE.
 */
export interface ISegmentedControlMultipleProps extends ISegmentedControlCommonProps {
    onSelect: TSegmentedControlMultipleOnSelect;
    type: ESegmentedControlType.MULTIPLE;
    value: TSegmentedControlMultipleValue;
}

/**
 * Свойства SegmentedControl type SINGLE.
 */
export interface ISegmentedControlSingleProps extends ISegmentedControlCommonProps {
    onSelect: TSegmentedControlSingleOnSelect;
    type: ESegmentedControlType.SINGLE;
    value: TSegmentedControlSingleValue;
}

/**
 * Компонент SegmentedControl. Дает возможность выбора одного или нескольких элементов.
 */
export const SegmentedControl: React.FC<ISegmentedControlSingleProps | ISegmentedControlMultipleProps> & {
    Segment: React.FC<ISegmentedControlSegmentProps>;
} = ({children, className, disabled, onSelect, theme = ESegmentedControlTheme.GENERAL, type, value, ...divHTMLAttributes}) => {
    const handleSelectSegment = ({selected, value: segmentValue}: {selected: boolean; value: string}) => {
        switch (type) {
            case ESegmentedControlType.MULTIPLE: {
                let nextValue = [...value];
                if (selected) {
                    nextValue.push(segmentValue);
                } else {
                    nextValue = nextValue.filter((v) => v !== segmentValue);
                }
                (onSelect as TSegmentedControlMultipleOnSelect)(nextValue);
                break;
            }

            case ESegmentedControlType.SINGLE:
                if (selected) {
                    (onSelect as TSegmentedControlSingleOnSelect)(segmentValue);
                }
                break;
        }
    };

    const classNames = classnames(
        'cssClass[segmentedControl]',
        {
            'cssClass[segmentedControlGeneral]': theme === ESegmentedControlTheme.GENERAL,
            'cssClass[segmentedControlSecondary]': theme === ESegmentedControlTheme.SECONDARY,
        },
        className
    );

    return (
        <SegmentedControlContext.Provider
            value={{
                disabled: Boolean(disabled),
                onSelectSegment: handleSelectSegment,
                type,
                value,
            }}
        >
            <div className={classNames} {...divHTMLAttributes}>
                {children}
            </div>
        </SegmentedControlContext.Provider>
    );
};

SegmentedControl.Segment = SegmentedControlSegment;
SegmentedControl.displayName = 'SegmentedControl';
