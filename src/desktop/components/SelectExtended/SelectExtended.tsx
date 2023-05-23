import React from 'react';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {SelectExtendedTarget} from './components/SelectExtendedTarget';
import {KeyDownListener} from '../KeyDownListener/KeyDownListener';
import {EVENT_KEY_CODES} from '../../utils/keyboard';
import {SelectExtendedDropdown} from '@sberbusiness/triplex/desktop/components/SelectExtended/components/SelectExtendedDropdown';

/**
 * Свойства, передаваемые из Select в функцию рендера target - renderTarget.
 *
 * @prop {boolean} opened Флаг Select открыт.
 * @prop {Function} setOpened Функция открытия/закрытия Select.
 */
export interface ISelectExtendedTargetProvideProps {
    opened: boolean;
    setOpened: (opened: boolean) => void;
}

/**
 * Свойства, передаваемые из Select в функцию рендера выпадающего списка - children.
 *
 * @prop {string} [className] Флаг Select открыт.
 * @prop {boolean} opened Флаг Select открыт.
 * @prop {Function} setOpened Функция открытия/закрытия Select.
 */
export interface ISelectExtendedDropdownProvideProps {
    className?: string;
    opened: boolean;
    setOpened: (opened: boolean) => void;
    targetRef: React.RefObject<HTMLDivElement>;
    dropdownRef: React.RefObject<HTMLDivElement>;
}

/**
 * Свойства компонента Select.
 *
 * @prop {Function} children Render функция для выпадающего списка Select.
 * @prop {Function} renderTarget Render функция для target.
 */
export interface ISelectExtendedProps extends React.HTMLAttributes<HTMLDivElement> {
    children: (props: ISelectExtendedDropdownProvideProps) => React.ReactNode;
    onClose?: () => void;
    onOpen?: () => void;
    renderTarget: (props: ISelectExtendedTargetProvideProps) => React.ReactNode;
}

/**
 * Состояние компонента Select.
 *
 * @prop {boolean} opened Флаг открытости выпадающего списка.
 */
interface ISelectExtendedState {
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

    state = {
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
        const {children, className, renderTarget, ...htmlDivAttributes} = this.props;
        const {opened} = this.state;

        return (
            <KeyDownListener onMatch={this.closeDropdownByKeyDown} eventKeyCode={EVENT_KEY_CODES.ESCAPE}>
                <div className={classnames('cssClass[selectExtended]', className)} ref={this.targetRef} {...htmlDivAttributes}>
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

    private closeDropdownByKeyDown = () => {
        const {opened} = this.state;

        if (opened) {
            this.setState({opened: false});
        }
    };
}
