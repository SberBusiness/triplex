import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {isKey, EVENT_KEY_CODES} from '@sberbusiness/triplex/utils/keyboard';
import {KeyDownListener} from '@sberbusiness/triplex/components/KeyDownListener/KeyDownListener';
import {SelectExtendedTarget} from './components/SelectExtendedTarget';
import {SelectExtendedDropdown} from './components/SelectExtendedDropdown';

/** Свойства, передаваемые из Select в функцию рендера target - renderTarget. */
export interface ISelectExtendedTargetProvideProps {
    /** Флаг открытости выпадающего списка. */
    opened: boolean;
    /** Функция открытия/закрытия Select. */
    setOpened: (opened: boolean) => void;
}

/** Свойства, передаваемые из Select в функцию рендера dropdown - children. */
export interface ISelectExtendedDropdownProvideProps {
    className?: string;
    /** Флаг открытости выпадающего списка. */
    opened: boolean;
    setOpened: (opened: boolean) => void;
    /** Функция открытия/закрытия Select. */
    targetRef: React.RefObject<HTMLDivElement>;
    dropdownRef: React.RefObject<HTMLDivElement>;
}

/** Свойства компонента SelectExtended. */
export interface ISelectExtendedProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    /** Рендер-функция поля выбора. */
    renderTarget: (props: ISelectExtendedTargetProvideProps) => React.ReactNode;
    /** Рендер-функция выпадающего блока. */
    children: (props: ISelectExtendedDropdownProvideProps) => React.ReactNode;
    /** Функция, срабатывающая при закрытии выпадающего блока. */
    onClose?: () => void;
    /** Функция, срабатывающая при открытии выпадающего блока. */
    onOpen?: () => void;
    /** Закрытие выпадающего блока при нажатии клавиши Tab. */
    closeOnTab?: boolean;
}

/** Состояние компонента Select. */
interface ISelectExtendedState {
    /** Флаг открытости выпадающего списка. */
    opened: boolean;
}

/** Базовый компонент Select. На его основе могут строиться Selects с любыми value, options и target. */
export class SelectExtended extends React.Component<ISelectExtendedProps, ISelectExtendedState> {
    public static Target = SelectExtendedTarget;
    public static Dropdown = SelectExtendedDropdown;

    private readonly targetRef: React.RefObject<HTMLDivElement>;
    private readonly dropdownRef: React.RefObject<HTMLDivElement>;

    constructor(props: ISelectExtendedProps) {
        super(props);

        this.targetRef = React.createRef<HTMLDivElement>();
        this.dropdownRef = React.createRef<HTMLDivElement>();
    }

    public state = {
        opened: false,
    };

    public componentDidMount(): void {
        document.addEventListener('mousedown', this.listenMouseDown);
    }

    public componentDidUpdate(prevProps: ISelectExtendedProps, prevState: ISelectExtendedState): void {
        const {opened} = this.state;
        const {opened: prevOpened} = prevState;
        const {onClose, onOpen} = this.props;

        if (opened !== prevOpened) {
            opened ? onOpen?.() : onClose?.();
        }
    }

    public componentWillUnmount(): void {
        document.removeEventListener('mousedown', this.listenMouseDown);
    }

    public render(): JSX.Element {
        const {className, onKeyDown, children, renderTarget, closeOnTab, ...htmlDivAttributes} = this.props;
        const {opened} = this.state;

        return (
            <KeyDownListener onMatch={this.closeDropdown} eventKeyCode={EVENT_KEY_CODES.ESCAPE}>
                <div
                    className={classnames('cssClass[selectExtended]', className)}
                    onKeyDown={this.handleKeyDown}
                    ref={this.targetRef}
                    {...htmlDivAttributes}
                >
                    {renderTarget({opened, setOpened: this.setOpened})}
                    {children({
                        opened,
                        setOpened: this.setOpened,
                        targetRef: this.targetRef,
                        dropdownRef: this.dropdownRef,
                    })}
                </div>
            </KeyDownListener>
        );
    }

    private setOpened = (opened: boolean) => {
        this.setState({opened});
    };

    private listenMouseDown = (event: Event) => {
        const {opened} = this.state;

        if (opened) {
            if (!this.targetRef.current?.contains(event.target as Node) && !this.dropdownRef.current?.contains(event.target as Node)) {
                this.setState({opened: false});
            }
        }
    };

    private closeDropdown = () => {
        const {opened} = this.state;

        if (opened) {
            this.setState({opened: false});
        }
    };

    private handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        const {onKeyDown, closeOnTab} = this.props;
        const key = event.code || event.keyCode;

        if (closeOnTab && isKey(key, 'TAB')) {
            this.closeDropdown();
        }

        onKeyDown?.(event);
    };
}
