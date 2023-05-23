import * as React from 'react';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {CaretdownSrvxIcon16} from '@sberbusiness/icons/CaretdownSrvxIcon16';
import {getAriaHTMLAttributes} from '@sberbusiness/triplex/desktop/utils/HTML/AriaAttributes';
import {WidgetHeaderTitle} from './WidgetHeaderTitle';
import {WidgetHeaderControls} from './WidgetHeaderControls';
import {isKey} from '@sberbusiness/triplex/desktop/utils/keyboard';
import {IWidgetHeaderProvideProps} from '../../types';

export enum EWidgetHeaderControlsAlign {
    LEFT,
    RIGHT,
}

interface IWidgetHeaderProps extends IWidgetHeaderProvideProps, React.HTMLAttributes<HTMLDivElement> {
    controlsAlign?: EWidgetHeaderControlsAlign;
}

interface IWidgetHeaderState {
    focusedByClick: boolean;
}

export class WidgetHeader extends React.Component<IWidgetHeaderProps, IWidgetHeaderState> {
    public static displayName = 'WidgetHeader';

    public static defaultProps = {
        controlsAlign: EWidgetHeaderControlsAlign.RIGHT,
    };

    public static Title = WidgetHeaderTitle;
    public static Controls = WidgetHeaderControls;

    headerNode: HTMLDivElement | null = null;

    state = {
        focusedByClick: false,
    };

    public render(): JSX.Element {
        const {animating, ariaAttributes, children, className, controlsAlign, isOpen, isStatic, toggle, ...htmlDivAttributes} = this.props;
        const {focusedByClick} = this.state;

        return (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <div
                tabIndex={isStatic ? -1 : 0}
                role={isStatic ? undefined : 'button'}
                {...htmlDivAttributes}
                className={classnames(className, 'cssClass[widgetHeader]', {
                    'cssClass[animating]': animating,
                    'cssClass[focusedByClick]': focusedByClick,
                    'cssClass[opened]': isOpen,
                    'cssClass[isStatic]': isStatic,
                    'cssClass[controlsAlignLeft]': controlsAlign === EWidgetHeaderControlsAlign.LEFT,
                    'cssClass[controlsAlignRight]': controlsAlign === EWidgetHeaderControlsAlign.RIGHT,
                })}
                onBlur={this.handleBlur}
                onClick={toggle}
                onMouseDown={this.handleMouseDown}
                onKeyDown={this.handleKeyDown}
                ref={this.setHeaderNode}
                {...getAriaHTMLAttributes(ariaAttributes)}
            >
                {children}
                {!isStatic && this.renderCaretIcon()}
            </div>
        );
    }

    private renderCaretIcon = (): JSX.Element => {
        return (
            <div className="cssClass[widgetHeaderArrow]">
                <CaretdownSrvxIcon16 className="cssClass[caretIcon]" />
            </div>
        );
    };

    private handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        const {focusedByClick} = this.state;
        const {onMouseDown} = this.props;

        if (!focusedByClick) {
            this.setState({focusedByClick: true});
        }

        onMouseDown?.(event);
    };

    private handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
        const {focusedByClick} = this.state;
        if (
            focusedByClick &&
            event.target === this.headerNode && // Кейс: клик на кнопку в заголовке, потом на заголовок, тогда срабатывает всплывший блюр от кнопки и в данном случае таргетом будет кнопка.
            event.target !== document.activeElement // Кейс: клик на заголовок потом на вкладку другую.
        ) {
            this.setState({focusedByClick: false});
        }

        const {onBlur} = this.props;
        onBlur?.(event);
    };

    /**
     * Обработчик открытия/закрытия с клавиатуры.
     */
    private handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const {toggle, onKeyDown} = this.props;

        if (!this.headerNode || this.headerNode !== event.target || !toggle) {
            onKeyDown?.(event);
            return;
        }

        const key = event.nativeEvent.code || event.nativeEvent.keyCode;

        if (isKey(key, 'ENTER') || isKey(key, 'SPACE')) {
            toggle();
        }

        // Предотвращения прокрутки страницы при нажатии на пробел.
        if (isKey(key, 'SPACE')) {
            event.preventDefault();
        }
        onKeyDown?.(event);
    };

    private setHeaderNode = (element: HTMLDivElement | null) => (this.headerNode = element);
}
