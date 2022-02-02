import * as React from 'react';
import {useContext} from 'react';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import {ESegmentedControlType, SegmentedControlContext} from '../SegmentedControl';
import {EFocusSource} from '@sbbol/web-library/common/enums/EFocusSource';
import {isKey} from '@sbbol/web-library/desktop/utils/keyboard';

export interface ISegmentedControlSegmentProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'disabled'> {
    value: string;
}

/**
 * Компонент SegmentedControlSegment. Рендерит один из сегментов SegmentedControl в виде HTML элемента button и реализует возможность выбора этого сегмента.
 */
export const SegmentedControlSegment: React.FC<ISegmentedControlSegmentProps> = ({
    children,
    className,
    onClick,
    title,
    value,
    onFocus,
    onMouseDown,
    ...htmlButtonAttributes
}) => {
    const {disabled, type, value: contextValue, onSelectSegment} = useContext(SegmentedControlContext);
    const ref = React.useRef<HTMLButtonElement>(null);
    const [focusSource, setFocusSource] = React.useState(EFocusSource.NONE);

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

    const getTitle = () => {
        if (title) {
            return title;
        }

        if (typeof children === 'string') {
            return children;
        }
    };

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

    const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>): void => {
        onMouseDown?.(event);
        if (!focusSource && ref.current !== document.activeElement) {
            setFocusSource(EFocusSource.MOUSE);
            addEventListeners();
        }
    };

    const handleFocus = (event: React.FocusEvent<HTMLButtonElement>): void => {
        onFocus?.(event);
        if (!focusSource) {
            setFocusSource(EFocusSource.KEYBOARD);
            addEventListeners();
        }
    };

    const listenMouseDown = (event: MouseEvent) => {
        if (!ref.current?.contains(event.target as Node)) {
            setFocusSource(EFocusSource.NONE);
            removeEventListeners();
        }
    };

    const listenKeyDown = (event: KeyboardEvent) => {
        const key = event.code || event.keyCode;
        if (isKey(key, 'TAB')) {
            setFocusSource(EFocusSource.NONE);
            removeEventListeners();
        }
    };

    const addEventListeners = () => {
        document.addEventListener('mousedown', listenMouseDown);
        document.addEventListener('keydown', listenKeyDown);
    };

    const removeEventListeners = () => {
        document.removeEventListener('mousedown', listenMouseDown);
        document.removeEventListener('keydown', listenKeyDown);
    };

    return (
        <button
            className={classnames('cssClass[segmentedControlSegment]', className, {
                'cssClass[selected]': getSelectedStatus(),
                'cssClass[segmentedControlSingleSegment]': type === ESegmentedControlType.SINGLE,
                'cssClass[segmentedControlMultipleSegment]': type === ESegmentedControlType.MULTIPLE,
                'cssClass[focusVisible]': focusSource === EFocusSource.KEYBOARD,
            })}
            disabled={disabled}
            title={getTitle()}
            {...htmlButtonAttributes}
            onClick={handleClick}
            onFocus={handleFocus}
            onMouseDown={handleMouseDown}
            ref={ref}
        >
            <span className="cssClass[segmentedControlSegmentContent]">{children}</span>
        </button>
    );
};

SegmentedControlSegment.displayName = 'SegmentedControlSegment';
