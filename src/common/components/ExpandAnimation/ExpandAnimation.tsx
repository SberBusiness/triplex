import * as React from 'react';

// Шаги анимации.
enum EExpandAnimationStep {
    // Закрыт.
    CLOSED,
    // Закрывается.
    CLOSING,
    // Перед закрытием. Шаг нужен для установки текущей высоты перед анимацией.
    PRE_CLOSING,
    // Открыт.
    OPENED,
    // Открывается.
    OPENING,
}
/**
 * Свойства компонента ExpandAnimation.
 *
 * @prop {number} animationTime Время анимации в ms.
 * @prop {boolean} expanded Развёрнут ли компонент.
 * @prop {Function} [onStart] Коллбэк на начало анимации.
 * @prop {Function} [onEnd] Коллбэк на окончание анимации.
 */
export interface IExpandAnimationProps extends React.HTMLAttributes<HTMLDivElement> {
    animationTime?: number;
    expanded: boolean;
    onStart?: () => void;
    onEnd?: () => void;
}

/**
 * Состояние компонента анимации ExpandAnimation.
 *
 * @prop {EExpandAnimationStep} currentAnimationStep Текущий шаг анимации.
 */
export interface IExpandAnimationState {
    currentAnimationStep: EExpandAnimationStep;
}

/**
 * Время исполнения анимации по-умолчанию.
 */
const ANIMATION_TIME_DEFAULT = 250;

/**
 * Компонент анимации сворачивания/разворачивания контента.
 */
export class ExpandAnimation extends React.Component<IExpandAnimationProps, IExpandAnimationState> {
    public static displayName = 'ExpandAnimation';

    public static defaultProps = {
        animationTime: ANIMATION_TIME_DEFAULT,
    };

    constructor(props: IExpandAnimationProps) {
        super(props);

        this.state = {
            currentAnimationStep: props.expanded ? EExpandAnimationStep.OPENED : EExpandAnimationStep.CLOSED,
        };
    }

    public componentDidMount(): void {
        // Для правильного обновления стилей, когда уже определен this.container.
        this.forceUpdate();
    }

    public componentDidUpdate(prevProps: Readonly<IExpandAnimationProps>): void {
        const {expanded} = this.props;
        const {currentAnimationStep} = this.state;

        if (prevProps.expanded !== expanded) {
            this.startAnimation(expanded);
        }

        // Начало анимации закрытия.
        if (currentAnimationStep === EExpandAnimationStep.PRE_CLOSING) {
            // https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Performance_best_practices_for_Firefox_fe_engineers#How_do_I_avoid_triggering_uninterruptible_reflow
            requestAnimationFrame(() => setTimeout(() => this.setState({currentAnimationStep: EExpandAnimationStep.CLOSING})));
        }
    }

    public render(): React.ReactElement {
        const {animationTime, children, expanded, onStart, onEnd, ...rest} = this.props;
        const styles = this.getStyles();

        return (
            <div {...rest} ref={this.setWrapper} style={styles} onTransitionEnd={this.handleAnimationEnd}>
                <div ref={this.setContainer}>{children}</div>
            </div>
        );
    }

    private container: HTMLDivElement | null = null;
    private wrapper: HTMLDivElement | null = null;

    private getStyles = (): React.CSSProperties => {
        // При первом рендере this.container еще не определен, и стили вычислить невозможно,
        if (!this.container) {
            return {
                display: 'none',
            };
        }

        const {currentAnimationStep} = this.state;
        const {animationTime} = this.props;

        let height: string | number | undefined = 0;
        let overflow = 'visible';

        switch (currentAnimationStep) {
            case EExpandAnimationStep.CLOSED:
                overflow = 'hidden';
                break;
            case EExpandAnimationStep.CLOSING:
                overflow = 'hidden';
                break;
            case EExpandAnimationStep.OPENED:
                height = 'auto';
                break;
            case EExpandAnimationStep.OPENING:
                height = `${this.container.clientHeight}px`;
                overflow = 'hidden';
                break;
            case EExpandAnimationStep.PRE_CLOSING:
                height = `${this.container.clientHeight}px`;
                overflow = 'hidden';
                break;
        }

        return {
            overflow,
            height,
            transition: `height ${animationTime!}ms ease-in-out`,
        };
    };

    private handleAnimationEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
        const {target} = event;
        if (this.wrapper !== target) {
            return;
        }

        const {onEnd} = this.props;

        this.setState(
            (prevState) => ({
                currentAnimationStep:
                    prevState.currentAnimationStep === EExpandAnimationStep.OPENING
                        ? EExpandAnimationStep.OPENED
                        : EExpandAnimationStep.CLOSED,
            }),
            onEnd
        );
    };

    private startAnimation = (expanded: boolean) => {
        const {onStart} = this.props;

        this.setState(
            {
                currentAnimationStep: expanded ? EExpandAnimationStep.OPENING : EExpandAnimationStep.PRE_CLOSING,
            },
            onStart
        );
    };

    private setContainer = (element: HTMLDivElement): void => {
        this.container = element;
    };

    private setWrapper = (element: HTMLDivElement): void => {
        this.wrapper = element;
    };
}
