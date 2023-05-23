import * as React from 'react';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {isKey} from '@sberbusiness/triplex/desktop/utils/keyboard';
import {CaretdownSrvxIcon16} from '@sberbusiness/icons/CaretdownSrvxIcon16';
import {getAriaHTMLAttributes} from '@sberbusiness/triplex/desktop/utils/HTML/AriaAttributes';
import {IAccordionHeaderProvideProps} from '@sberbusiness/triplex/desktop/components/AccordionBase/types';

/**
 * Свойства компонента.
 *
 * @prop {React.ReactText} children Children.
 */
export interface IAccordionViewHeaderProps extends Partial<IAccordionHeaderProvideProps>, React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactText;
}

interface IAccordionHeaderState {
    focusedByClick: boolean;
}

/**
 * Заголовок компонента аккордеон
 */
export class AccordionViewHeader extends React.PureComponent<IAccordionViewHeaderProps, IAccordionHeaderState> {
    public static displayName = 'AccordionViewHeader';

    state = {
        focusedByClick: false,
    };

    public render(): JSX.Element {
        const {animating, ariaAttributes, children, className, isOpen, toggle, ...htmlAttributes} = this.props;
        const {focusedByClick} = this.state;

        return (
            <div
                tabIndex={0}
                className={classnames(className, 'cssClass[accordionViewHeaderWrapper]', {
                    'cssClass[animating]': Boolean(animating),
                    'cssClass[focusedByClick]': focusedByClick,
                    'cssClass[opened]': Boolean(isOpen),
                })}
                {...htmlAttributes}
                onBlur={this.handleBlur}
                onMouseDown={this.handleMouseDown}
                onClick={toggle}
                onKeyDown={this.handleKeyDown}
                role="button"
                {...getAriaHTMLAttributes(ariaAttributes!)}
            >
                <h5 className={'cssClass[accordionViewHeader]'} title={children.toString()}>
                    {children}
                </h5>
                <CaretdownSrvxIcon16 className="cssClass[caretIcon]" />
            </div>
        );
    }

    private handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) =>
        this.setState({focusedByClick: true}, () => {
            const {onMouseDown} = this.props;
            if (onMouseDown) {
                onMouseDown(event);
            }
        });

    private handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
        if (event.target !== document.activeElement) {
            this.setState({focusedByClick: false});
        }
        const {onBlur} = this.props;
        if (onBlur) {
            onBlur(event);
        }
    };

    /**
     * Обработчик открытия/закрытия с клавиатуры.
     */
    private handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const {onKeyDown, toggle} = this.props;

        const key = event.nativeEvent.code || event.nativeEvent.keyCode;

        if (isKey(key, 'ENTER') || isKey(key, 'SPACE')) {
            toggle!();
        }

        // Предотвращения прокрутки страницы при нажатии на пробел.
        if (isKey(key, 'SPACE')) {
            event.preventDefault();
        }

        if (onKeyDown) {
            onKeyDown(event);
        }
    };
}
