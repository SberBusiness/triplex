import React from 'react';
import {CaretdownSrvxIcon16} from '@sberbusiness/icons/CaretdownSrvxIcon16';
import {KeyDownListener} from '@sberbusiness/triplex/components/KeyDownListener/KeyDownListener';
import {EVENT_KEY_CODES} from '@sberbusiness/triplex/utils/keyboard';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {uniqueId} from '@sberbusiness/triplex/utils/uniqueId';

/** Базовые свойства компонента Spoiler. */
interface ISpoilerBaseProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Текст раскрытия содержимого. */
    labelExpand: string;
    /** Текст скрытия содержимого. */
    labelCollapse?: string;
    /** Обработчик скрытия/раскрытия. */
    onToggle?: (expanded: boolean) => void;
    /** Элемент правого блока. */
    rightBlock?: JSX.Element;
}

/** Свойства контролируемого Spoiler. */
interface ISpoilerControlledProps extends ISpoilerBaseProps {
    /** Контролируемое состояние скрыт/раскрыт. */
    expanded: boolean;
    /** Контролирующая функция скрытия/раскрытия. */
    toggle: (nextExpanded: boolean) => void;
}

/** Свойства неконтролируемого Spoiler. */
interface ISpoilerUncontrolledProps extends ISpoilerBaseProps {
    /** Контролируемое состояние скрыт/раскрыт. */
    expanded?: never;
    /** Контролирующая функция скрытия/раскрытия. */
    toggle?: never;
}

/** Комбинированные свойства компонента Spoiler. */
type TSpoilerProps = ISpoilerControlledProps | ISpoilerUncontrolledProps;

/** Состояния компонента Spoiler. */
interface ISpoilerState {
    /** Раскрыт или нет. */
    isExpanded: boolean;
    /** Контролируемый или нет. */
    isControlled: boolean;
}

/** Компонент "Спойлер", используется для раскрытия внутреннего содержимого. */
export class Spoiler extends React.Component<TSpoilerProps, ISpoilerState> {
    public static displayName = 'Spoiler';

    node: HTMLButtonElement | null = null;

    // Уникальный id, для передачи a11y aria-атрибутов.
    private instanceId = `Spoiler-${uniqueId()}`;

    public state = {
        isControlled: this.props.expanded !== undefined,
        isExpanded: !!this.props.expanded,
    };

    public render(): JSX.Element {
        const {children, expanded, onToggle, toggle, className, labelExpand, labelCollapse, rightBlock, ...divHTMLAttributes} = this.props;
        const {isExpanded, isControlled} = this.state;
        const open = isControlled ? !!expanded : isExpanded;

        const classContent = classnames('cssClass[content]', {'cssClass[hidden]': !open});
        const classDownIcon = classnames('cssClass[icon]', 'cssClass[animationRotate180]', {'cssClass[active]': open});

        const toggleLabel = (open && labelCollapse) || labelExpand;

        return (
            <KeyDownListener eventKeyCode={EVENT_KEY_CODES.ENTER} onMatch={this.toggleContentByKeyDown}>
                <div {...divHTMLAttributes} className={classnames('cssClass[spoiler]', className)}>
                    <div className={'cssClass[head]'}>
                        <Button
                            aria-controls={this.instanceId}
                            aria-expanded={open}
                            className="cssClass[toggleButton]"
                            theme={EButtonTheme.LINK}
                            size={EButtonSize.SM}
                            onClick={this.toggleContent}
                            ref={this.setRef}
                        >
                            {toggleLabel}
                            <CaretdownSrvxIcon16 className={classDownIcon} />
                        </Button>
                        {rightBlock}
                    </div>
                    <div className={classContent} id={this.instanceId}>
                        {children}
                    </div>
                </div>
            </KeyDownListener>
        );
    }

    public componentDidUpdate(prevProps: TSpoilerProps): void {
        const {expanded, onToggle} = this.props;
        const {expanded: prevExpanded} = prevProps;

        if (expanded !== prevExpanded) {
            onToggle?.(!!expanded);
        }
    }

    /** Обработчик открытия и закрытия спойлера. */
    private toggleContent = (): void => {
        const {onToggle, toggle, expanded} = this.props;
        const {isControlled, isExpanded} = this.state;

        if (isControlled) {
            toggle?.(!expanded);
        } else {
            this.setState(
                (prevState) => ({isExpanded: !prevState.isExpanded}),
                () => onToggle?.(!isExpanded)
            );
        }
    };

    /** Обработчик открытия и закрытия спойлера по нажатию клавиши. */
    private toggleContentByKeyDown = (event: KeyboardEvent): void => {
        if (document.activeElement === this.node) {
            event.preventDefault();
            this.toggleContent();
        }
    };

    private setRef = (ref: HTMLButtonElement): void => {
        this.node = ref;
    };
}
