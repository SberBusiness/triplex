import React from 'react';
import {IStepMarkerProps, Step} from '@sberbusiness/triplex/desktop/components/Step/Step';
import {EStepStatus} from '@sberbusiness/triplex/desktop/components/Step/enums';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {isKey} from '@sberbusiness/triplex/desktop/utils/keyboard';
import {focusButton} from '@sberbusiness/triplex/desktop/components/Button/utils';

export interface IXStepperStepProps extends IStepMarkerProps {
    /**
     * Текстовый лейбл шага.
     **/
    label: string;
    /**
     * Обработчик нажатия.
     **/
    onClick: () => void;
    /**
     * Флаг активности шага.
     **/
    active: boolean;
}

interface IState {
    /**
     * Флаг состояния фокуса по клику.
     **/
    focusedByClick: boolean;
}

/**
 * @deprecated Используйте компонент Step.
 * Компонент отображения номера шага с лейблом.
 */
export class XStepperStep extends React.Component<IXStepperStepProps, IState> {
    displayName = 'XStepperStep';

    state = {
        focusedByClick: false,
    };

    public render(): JSX.Element {
        const {step, status, active, onClick, children, label, tabIndex, ...rest} = this.props;
        const {focusedByClick} = this.state;
        const disabled = status === EStepStatus.DISABLED;

        return (
            <div
                role="button"
                className={classnames('cssClass[xStepperStep]', {
                    'cssClass[disabled]': disabled,
                    'cssClass[focusedByClick]': focusedByClick,
                })}
                tabIndex={disabled ? -1 : tabIndex || 0}
                onClick={this.handleClick}
                onKeyDown={this.handleKeyDown}
                onMouseDown={this.onMouseDown}
                onBlur={this.onBlur}
            >
                <Step status={status} step={step} {...rest}>
                    {children}
                </Step>
                <span className={classnames('cssClass[xStepperStepLabel]', {'cssClass[active]': active})}>{label}</span>
            </div>
        );
    }

    private onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        // https://stackoverflow.com/questions/42089795/reactjs-cant-set-state-from-an-event-with-event-persist
        e.persist();
        focusButton((e as unknown) as React.MouseEvent<HTMLButtonElement>);

        this.setState({focusedByClick: true}, () => {
            const {onMouseDown} = this.props;
            if (onMouseDown) {
                onMouseDown(e);
            }
        });
    };

    private onBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        if (e.target !== document.activeElement) {
            this.setState({focusedByClick: false});
        }

        const {onBlur} = this.props;
        if (onBlur) {
            onBlur(e);
        }
    };

    private handleClick = () => {
        const {status, onClick} = this.props;
        if (status === EStepStatus.DISABLED) {
            return null;
        }
        onClick();
    };

    private handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        const {status, onClick} = this.props;
        if (status === EStepStatus.DISABLED) {
            return null;
        }

        const key = event.key || event.keyCode;
        if (isKey(key, 'ENTER')) {
            onClick();
        }
    };
}
