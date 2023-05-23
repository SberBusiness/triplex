import * as React from 'react';
import {WindowResizeListener} from '@sberbusiness/triplex/common/components/WindowResizeListener/WindowResizeListener';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {SpinnerWidget} from '@sberbusiness/triplex/desktop/components/SpinnerWidget/SpinnerWidget';

/**
 * Свойства компонента контента лайтбокса.
 *
 * @prop {boolean} [isLoading] Флаг состояния загрузки контента лайтбокса.
 * @prop {boolean} [loadingTitle] Текст под спиннером.
 */
export interface ILightBoxContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    isLoading?: boolean;
    loadingTitle?: React.ReactNode;
}

/**
 * Состояние компонента контента лайтбокса.
 */
interface ILightBoxContentState {
    paddingTop: number;
}

/**
 * Компонента контента лайтбокса.
 */
export class LightBoxContent extends React.Component<ILightBoxContentProps, ILightBoxContentState> {
    public static displayName = 'LightBoxContent';

    public state: ILightBoxContentState = {
        paddingTop: 0,
    };

    private controlsNode: HTMLDivElement | null = null;

    public componentDidMount(): void {
        this.updateStyle();
    }

    public componentDidUpdate(): void {
        this.updateStyleWithTimeout();
    }

    public render(): JSX.Element {
        const {children, className, isLoading, loadingTitle, ...htmlDivAttributes} = this.props;
        const {paddingTop} = this.state;
        const contentBodyStyle = {
            paddingTop,
        };

        return (
            <WindowResizeListener onResize={this.updateStyleWithTimeout}>
                <div
                    className={classnames(className, 'cssClass[lightBoxContent]', 'cssClass[globalLightBoxContent]')}
                    style={paddingTop ? contentBodyStyle : undefined}
                    {...htmlDivAttributes}
                >
                    {children}

                    <div className={classnames('cssClass[loadingContentOverlay]', {'cssClass[hidden]': !isLoading})}>
                        {isLoading && <SpinnerWidget>{loadingTitle}</SpinnerWidget>}
                    </div>
                </div>
            </WindowResizeListener>
        );
    }

    /**
     * Обновление отступов у Body в зависимости от высоты подвала и заголовка.
     */
    private updateStyle = () => {
        const {paddingTop} = this.state;
        let nextPaddingTop = 0;

        // При определенном разрешении Controls находится над Header.
        this.controlsNode = document.querySelector(`[data-lightbox-component="controls"]`);

        if (this.controlsNode) {
            nextPaddingTop += this.controlsNode.offsetHeight;
        }

        const nextState = {
            // Верхний паддинг равен высоте контролов.
            paddingTop: nextPaddingTop,
        };

        // Разница между старыми и новыми значениями. В ИЕ 11 или при масштабе отличном от 100% могут высчитываться разные результаты между рендерами и приложение уходит в бесконечный цикл.
        const deltaTop = Math.abs(paddingTop - nextState.paddingTop);

        if (deltaTop > 1) {
            this.setState(nextState);
        }
    };

    /**
     * LightBoxViewManager добавляет className, от которых зависят стили LightBox. При смене брейкпоинтов, расчет без таймаута может быть неверный.
     */
    private updateStyleWithTimeout = () => setTimeout(this.updateStyle, 100);
}
