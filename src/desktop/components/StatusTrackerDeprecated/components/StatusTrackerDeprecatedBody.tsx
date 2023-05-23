import {ErrorStsIcon64} from '@sberbusiness/icons/ErrorStsIcon64';
import {SuccessStsIcon64} from '@sberbusiness/icons/SuccessStsIcon64';
import {WaitStsIcon64} from '@sberbusiness/icons/WaitStsIcon64';
import {WarningStsIcon64} from '@sberbusiness/icons/WarningStsIcon64';
import {StatusTrackerDeprecatedBodyText} from '@sberbusiness/triplex/desktop/components/StatusTrackerDeprecated/components/StatusTrackerDeprecatedBodyText';
import {StatusTrackerDeprecatedStatus} from '@sberbusiness/triplex/desktop/components/StatusTrackerDeprecated/enums';
import {isComponentType, isReactElement} from '@sberbusiness/triplex/desktop/utils/reactChild';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {TestProps} from '@sberbusiness/triplex/desktop/common/types/CoreTypes';
import {TestIds} from '@sberbusiness/triplex/common/dataTestIds/dataTestIds';
import * as React from 'react';

/**
 * Интерфейс компонента тела статус трекера.
 * @prop {StatusTrackerDeprecatedStatus} [status] Состояния у компонента StatusTrackerDeprecated.
 * @prop {boolean} [showIcon] Показывать иконку.
 */
export interface IStatusTrackerDeprecatedBodyProps extends React.HTMLAttributes<HTMLDivElement>, TestProps {
    status?: StatusTrackerDeprecatedStatus;
    showIcon?: boolean;
}

/**
 * Компонент тела для статус трекера.
 */
export class StatusTrackerDeprecatedBody extends React.PureComponent<IStatusTrackerDeprecatedBodyProps> {
    public static displayName = 'StatusTrackerDeprecatedBody';

    public static Text = StatusTrackerDeprecatedBodyText;

    public componentDidMount(): void {
        this.checkChildren();
    }

    public componentDidUpdate(): void {
        this.checkChildren();
    }

    public render(): JSX.Element {
        const {children, className, showIcon, ...htmlDivAttributes} = this.props;

        return (
            <div className={classnames(className, 'cssClass[statusTrackerDeprecatedBody]')} {...htmlDivAttributes}>
                {showIcon && this.renderIcon()}
                {children}
            </div>
        );
    }

    /**
     * Рендер иконки в теле статус трекера.
     */
    private renderIcon = () => {
        const {status} = this.props;
        const className = 'cssClass[statusTrackerDeprecatedIcon]';
        const dataTestId = this.props['data-test-id'];

        switch (status) {
            case StatusTrackerDeprecatedStatus.WAIT:
                return (
                    <WaitStsIcon64
                        className={className}
                        data-test-id={dataTestId && `${dataTestId}${TestIds.StatusTrackerDeprecated.icon_wait}`}
                    />
                );
            case StatusTrackerDeprecatedStatus.WARNING:
                return (
                    <WarningStsIcon64
                        className={className}
                        data-test-id={dataTestId && `${dataTestId}${TestIds.StatusTrackerDeprecated.icon_warning}`}
                    />
                );
            case StatusTrackerDeprecatedStatus.ERROR:
                return (
                    <ErrorStsIcon64
                        className={className}
                        data-test-id={dataTestId && `${dataTestId}${TestIds.StatusTrackerDeprecated.icon_error}`}
                    />
                );
            case StatusTrackerDeprecatedStatus.SUCCESS:
                return (
                    <SuccessStsIcon64
                        className={className}
                        data-test-id={dataTestId && `${dataTestId}${TestIds.StatusTrackerDeprecated.icon_success}`}
                    />
                );
            default:
                throw new Error(`Функция renderIcon не реализована для значения '${String(status)}'.`);
        }
    };

    /* Проверка компонента. */
    private checkChildren = () => {
        const {children, status, showIcon} = this.props;

        React.Children.forEach(children, (child) => {
            if (status === StatusTrackerDeprecatedStatus.WAIT && showIcon && isReactElement(child) && isComponentType(child.type)) {
                const displayName = child.type.displayName;
                if (displayName && displayName.indexOf('Button') !== -1) {
                    throw new Error(`Запрещено использование кнопок вместе с иконкой в статусе WAIT. Сейчас: ${displayName}.`);
                }
            }
        });
    };
}
