import * as React from 'react';

/**
 * Свойства компонента.
 *
 * @prop {React.ReactNode} children Один или несколько потомков со статической или динамической высотой.
 * @prop {Function} onHeightReady Колбэк, вызывающийся, когда измерена высота элемента.
 */
export interface IReactHeightProps {
    children: React.ReactNode;
    onHeightReady: (height: number) => void;
}

/**
 * Стэйт компонента.
 *
 * @prop {number} height Высота компонента.
 */
export interface IReactHeightState {
    height: number;
}

/**
 * Компонент-обертка, определяющий высоты потомков.
 * Скопировано с npm-пакета react-height версии 3.0.0.
 * Убраны лишние пропсы и добавлена типизация.
 * @deprecated Использовать react-resize-detector.
 */
export class ReactHeight extends React.Component<IReactHeightProps, IReactHeightState> {
    public static displayName = 'ReactHeight';
    public wrapper: HTMLDivElement | undefined;

    public state = {
        height: 0,
    };

    public componentDidMount() {
        const height = this.getElementHeight(this.wrapper as HTMLDivElement);

        this.setState({height}, () => this.props.onHeightReady(this.state.height));
    }

    public componentDidUpdate() {
        const height = this.getElementHeight(this.wrapper as HTMLDivElement);

        if (height !== this.state.height) {
            this.setState({height}, () => this.props.onHeightReady(this.state.height));
        }
    }

    /**
     * Метод получения высоты элемента.
     *
     * @param {HTMLElement} el Элемент, высоту которого нужно получить.
     */
    public getElementHeight = (el: HTMLElement): number => el.clientHeight;

    /**
     * Задать ссылку на измеряемый элемент.
     *
     * @param {HTMLElement} el DOM-элемент.
     */
    public setWrapperRef = (el: HTMLDivElement): void => {
        this.wrapper = el;
    };

    public render() {
        const {children} = this.props;

        return <div ref={this.setWrapperRef}>{children}</div>;
    }
}
