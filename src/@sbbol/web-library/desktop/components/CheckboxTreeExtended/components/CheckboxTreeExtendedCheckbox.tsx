import * as React from 'react';
import {Checkbox} from '@sbbol/web-library/desktop/components/Checkbox/Checkbox';
import {ICheckboxProps} from '@sbbol/web-library/desktop/components/Checkbox/types';
import {isStaticCheckboxTreeExtended} from '@sbbol/web-library/desktop/components/CheckboxTreeExtended/isStaticCheckboxTreeExtended';

/**
 * Свойства CheckboxTreeExtendedCheckbox.
 *
 * @prop {boolean} [active] - Текущая нода является активной при перемещении с клавиатуры.
 * @prop {boolean} [opened] - Текущая нода раскрыта.
 */
interface ICheckboxTreeExtendedCheckboxProps extends ICheckboxProps {
    active?: boolean;
    opened?: boolean;
}

/**
 * Обертка над базовым компонентом чекбокс.
 * Используется для фокуса чекбокса при перемещении с клавиатуры.
 */
export class CheckboxTreeExtendedCheckbox extends React.Component<ICheckboxTreeExtendedCheckboxProps> {
    private checkboxNode?: HTMLInputElement;

    public componentDidUpdate(prevProps: ICheckboxTreeExtendedCheckboxProps): void {
        const {active} = this.props;
        const {active: prevActive} = prevProps;

        // Триггер фокуса на чекбоксе при изменения флага активности при перемещении по дереву с клавиатуры. Если нода имеет дочерние ноды, то фокус получает не чекбокс, а CheckboxTreeExtendedArrow.
        if (active && !prevActive) {
            this.checkboxNode?.focus();
        }
    }

    public render(): JSX.Element {
        const {active, opened, ...checkboxProps} = this.props;

        return <Checkbox ref={this.setCheckboxNode} onFocus={this.handleFocus} {...checkboxProps} />;
    }

    private handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        // Предотвращает всплытие до ноды дерева.
        !isStaticCheckboxTreeExtended && event.stopPropagation();
    };

    private setCheckboxNode = (DOMNode: HTMLInputElement) => {
        this.checkboxNode = DOMNode;
    };
}
