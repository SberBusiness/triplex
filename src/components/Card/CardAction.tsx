import React from 'react';
import {ICardProps} from '@sberbusiness/triplex/components/Card/types';
import {CardContent} from '@sberbusiness/triplex/components/Card/components/CardContent/CardContent';
import {CardMedia} from '@sberbusiness/triplex/components/Card/components/CardMedia';
import {ECardRoundingSize} from '@sberbusiness/triplex/components/Card/enums';
import {EFocusSource} from '@sberbusiness/triplex/enums/EFocusSource';
import {mapCardRoundingSizeToCssClass} from '@sberbusiness/triplex/components/Card/utils';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {isKey} from '@sberbusiness/triplex/utils/keyboard';

/** Свойства интерактивной карточки. */
interface ICardActionProps extends ICardProps {
    /** Обработчик переключения выбора карточки. */
    onToggle?: (selected: boolean) => void;
    /** Контролируемое состояние выбрана/не выбрана. */
    selected?: boolean;
    /** Контролирующая функция состояние выбрана/не выбрана. */
    toggle?: (selected: boolean) => void;
}

/** Состояния интерактивной карточки. */
interface ICardActionState {
    /** Выбрана или нет. */
    isSelected: boolean;
    /** Контролируемая или нет. */
    isControlled: boolean;
    /** Источник фокуса. */
    focusSource: EFocusSource;
}

/** Компонент "Интерактивная карточка". */
export class CardAction extends React.Component<ICardActionProps, ICardActionState> {
    public static displayName = 'CardAction';

    public static Content = CardContent;
    public static Media = CardMedia;

    public state = {
        focusSource: EFocusSource.NONE,
        isControlled: this.props.selected !== undefined,
        isSelected: !!this.props.selected,
    };

    public componentDidUpdate(prevProps: Readonly<ICardActionProps>): void {
        const {selected, onToggle} = this.props;

        if (selected !== prevProps.selected) {
            onToggle?.(!!selected);
        }
    }

    private ref = React.createRef<HTMLDivElement>();

    public render(): JSX.Element {
        const {
            children,
            className,
            onClick,
            onMouseDown,
            onKeyDown,
            onFocus,
            onBlur,
            roundingSize = ECardRoundingSize.MD,
            onToggle,
            selected,
            toggle,
            ...attributes
        } = this.props;
        const {isControlled, isSelected, focusSource} = this.state;
        const classNames = classnames(
            'cssClass[card]',
            'cssClass[action]',
            mapCardRoundingSizeToCssClass[roundingSize],
            {'cssClass[focusVisible]': focusSource === EFocusSource.KEYBOARD, 'cssClass[selected]': isControlled ? !!selected : isSelected},
            className
        );

        return (
            <div
                className={classNames}
                tabIndex={0}
                onClick={this.handleClick}
                onMouseDown={this.handleMouseDown}
                onKeyDown={this.handleKeyDown}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                role="button"
                {...attributes}
                ref={this.ref}
                data-tx={process.env.npm_package_version}
            >
                {children}
            </div>
        );
    }

    public handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
        const {onClick} = this.props;

        onClick?.(event);
        this.handleToggle();
    };

    public handleMouseDown = (event: React.MouseEvent<HTMLDivElement>): void => {
        const {onMouseDown} = this.props;
        const {focusSource} = this.state;

        onMouseDown?.(event);
        if (!focusSource) {
            this.setState({focusSource: EFocusSource.MOUSE});
        }
    };

    public handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        const {onKeyDown} = this.props;

        onKeyDown?.(event);
        if (isKey(event.keyCode, 'SPACE')) {
            event.preventDefault();
            this.handleToggle();
        } else if (isKey(event.keyCode, 'ENTER')) {
            this.handleToggle();
        }
    };

    public handleFocus = (event: React.FocusEvent<HTMLDivElement>): void => {
        const {onFocus} = this.props;
        const {focusSource} = this.state;
        const {current} = this.ref;

        onFocus?.(event);
        if (!focusSource && current === event.target) {
            this.setState({focusSource: EFocusSource.KEYBOARD});
        }
    };

    public handleBlur = (event: React.FocusEvent<HTMLDivElement>): void => {
        const {onBlur} = this.props;
        const {current} = this.ref;

        onBlur?.(event);
        if (current !== document.activeElement && current === event.target) {
            this.setState({focusSource: EFocusSource.NONE});
        }
    };

    public handleToggle = (): void => {
        const {toggle, selected, onToggle} = this.props;
        const {isControlled, isSelected} = this.state;

        if (isControlled) {
            toggle?.(!selected);
        } else {
            this.setState(
                (prevState) => ({isSelected: !prevState.isSelected}),
                () => onToggle?.(!isSelected)
            );
        }
    };
}
