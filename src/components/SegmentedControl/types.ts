import {ESegmentedControlType} from './SegmentedControl';

/**
 * Значение SegmentedControl type MULTIPLE.
 */
export type TSegmentedControlMultipleValue = string[];

/**
 * Обработчик выбора SegmentedControl type MULTIPLE.
 */
export type TSegmentedControlMultipleOnSelect = (value: TSegmentedControlMultipleValue) => void;

/**
 * Значение SegmentedControl type SINGLE.
 */
export type TSegmentedControlSingleValue = string;

/**
 * Обработчик выбора SegmentedControl type SINGLE.
 */
export type TSegmentedControlSingleOnSelect = (value: TSegmentedControlSingleValue) => void;

export interface ISegmentedControlContext {
    disabled: boolean;
    /**
     * Обработчик выбора сегмента.
     */
    onSelectSegment: (props: {selected: boolean; value: string}) => void;
    type: ESegmentedControlType;
    /**
     * Выбранное значение/выбранные значения.
     */
    value: TSegmentedControlSingleValue | TSegmentedControlMultipleValue;
}
