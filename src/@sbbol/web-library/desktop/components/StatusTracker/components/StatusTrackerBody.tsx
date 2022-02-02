import {ErrorStsIcon64} from '@sberbusiness/icons/ErrorStsIcon64';
import {SuccessStsIcon64} from '@sberbusiness/icons/SuccessStsIcon64';
import {WaitStsIcon64} from '@sberbusiness/icons/WaitStsIcon64';
import {WarningStsIcon64} from '@sberbusiness/icons/WarningStsIcon64';
import {StatusTrackerBodyText} from '@sbbol/web-library/desktop/components/StatusTracker/components/StatusTrackerBodyText';
import {StatusTrackerStatus} from '@sbbol/web-library/desktop/components/StatusTracker/enums';
import {isComponentType, isReactElement} from '@sbbol/web-library/desktop/utils/reactChild';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import {TestProps} from '@sbbol/web-library/desktop/common/types/CoreTypes';
import {TestIds} from '@sbbol/web-library/common/dataTestIds/dataTestIds';
import * as React from 'react';

/**
 * Интерфейс компонента тела статус трекера.
 * @prop {StatusTrackerStatus} [status] Состояния у компонента StatusTracker.
 * @prop {boolean} [showIcon] Показывать иконку.
 */
export interface IStatusTrackerBodyProps extends React.HTMLAttributes<HTMLDivElement>, TestProps {
    status?: StatusTrackerStatus;
    showIcon?: boolean;
}

/**
 * Компонент тела для статус трекера.
 */
export class StatusTrackerBody extends React.PureComponent<IStatusTrackerBodyProps> {
    public static displayName = 'StatusTrackerBody';

    public static Text = StatusTrackerBodyText;

    public componentDidMount(): void {
        this.checkChildren();
    }

    public componentDidUpdate(): void {
        this.checkChildren();
    }

    public render(): JSX.Element {
        const {children, className, showIcon, ...htmlDivAttributes} = this.props;

        return (
            <div className={classnames(className, 'cssClass[statusTrackerBody]')} {...htmlDivAttributes}>
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
        const className = 'cssClass[statusTrackerIcon]';
        const dataTestId = this.props['data-test-id'];

        switch (status) {
            case StatusTrackerStatus.WAIT:
                return <WaitStsIcon64 className={className} data-test-id={dataTestId && `${dataTestId}${TestIds.StatusTracker.icon_wait}`} />;
            case StatusTrackerStatus.WARNING:
                return (
                    <WarningStsIcon64
                        className={className}
                        data-test-id={dataTestId && `${dataTestId}${TestIds.StatusTracker.icon_warning}`}
                    />
                );
            case StatusTrackerStatus.ERROR:
                return (
                    <ErrorStsIcon64 className={className} data-test-id={dataTestId && `${dataTestId}${TestIds.StatusTracker.icon_error}`} />
                );
            case StatusTrackerStatus.SUCCESS:
                return (
                    <SuccessStsIcon64
                        className={className}
                        data-test-id={dataTestId && `${dataTestId}${TestIds.StatusTracker.icon_success}`}
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
            if (status === StatusTrackerStatus.WAIT && showIcon && isReactElement(child) && isComponentType(child.type)) {
                const displayName = child.type.displayName;
                if (displayName && displayName.indexOf('Button') !== -1) {
                    throw new Error(`Запрещено использование кнопок вместе с иконкой в статусе WAIT. Сейчас: ${displayName}.`);
                }
            }
        });
    };
}
