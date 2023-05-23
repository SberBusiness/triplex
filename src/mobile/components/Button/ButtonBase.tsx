import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import * as React from 'react';

/**
 * Состояние компонента.
 *
 * @prop {boolean} isTouched Кнопка нажата.
 */
interface IButtonBaseState {
    isTouched: boolean;
}

/**
 * Интерфейс базового компонента мобильных кнопок.
 *
 * @props {boolean} [isLoading] Кнопка в состоянии загрузки.
 * @props {React.ReactElement} [spinnerIcon] Компонент спиннера.
 */
export interface IMobileButtonBaseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    spinnerIcon?: React.ReactElement;
}

/**
 * Интерфейс темизированной мобильной кнопки.
 */
export interface IMobileButtonThemedProps extends Omit<IMobileButtonBaseProps, 'spinnerIcon'> {}

const BUTTON_HOVER_CLASS_NAME = 'cssClass[globalMobileButtonHover]';
const BUTTON_LOADING_CLASS_NAME = 'cssClass[loading]';

/**
 * Базовый компонент мобильных кнопок.
 */
export class ButtonBase extends React.PureComponent<IMobileButtonBaseProps, IButtonBaseState> {
    public static displayName = 'ButtonBase';

    public state = {
        isTouched: false,
    };

    public render() {
        const {isTouched} = this.state;
        const {children, className, isLoading, spinnerIcon, ...buttonHTMLAttributes} = this.props;

        return (
            <button
                type="button"
                {...buttonHTMLAttributes}
                className={classnames('cssClass[mobileButton]', className, {
                    [BUTTON_HOVER_CLASS_NAME]: isTouched,
                    [BUTTON_LOADING_CLASS_NAME]: Boolean(isLoading),
                })}
                onTouchStart={this.handleTouchStart}
                onTouchEnd={this.handleTouchEnd}
            >
                <span className="cssClass[globalMobileButtonInner]">{children}</span>
                {isLoading && <span className="cssClass[mobileButtonSpinner]">{spinnerIcon}</span>}
            </button>
        );
    }

    private handleTouchStart = (event: React.TouchEvent<HTMLButtonElement>) => {
        this.setState({
            isTouched: true,
        });

        if (this.props.onTouchStart) {
            this.props.onTouchStart(event);
        }
    };

    private handleTouchEnd = (event: React.TouchEvent<HTMLButtonElement>) => {
        this.setState({
            isTouched: false,
        });

        if (this.props.onTouchEnd) {
            this.props.onTouchEnd(event);
        }
    };
}
