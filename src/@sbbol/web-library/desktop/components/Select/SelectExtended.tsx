import * as React from 'react';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import {SelectExtendedTarget} from './components/SelectExtendedTarget';
import {Dropdown} from '../Dropdown/Dropdown';
import {KeyDownListener} from '../KeyDownListener/KeyDownListener';
import {EVENT_KEY_CODES} from '../../utils/keyboard';

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
}

/**
 * Свойства компонента Select.
 *
 * @prop {Function} children Render функция для выпадающего списка Select.
 * @prop {Function} renderTarget Render функция для target.
 */
export interface ISelectExtendedProps extends React.HTMLAttributes<HTMLDivElement> {
    children: (props: ISelectExtendedDropdownProvideProps) => React.ReactNode;
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

/**
 * Базовый компонент Select. На его основе могут строиться Selects с любыми value, options и target.
 */
export class SelectExtended extends React.Component<ISelectExtendedProps, ISelectExtendedState> {
    public static Target = SelectExtendedTarget;
    public static Dropdown = Dropdown;

    private containerNode: HTMLDivElement | undefined;

    state = {
        opened: false,
    };

    public componentDidMount(): void {
        document.addEventListener('mouseup', this.handleMouseUp);
    }

    public componentWillUnmount(): void {
        document.removeEventListener('mouseup', this.handleMouseUp);
    }

    public render(): JSX.Element {
        const {children, className, renderTarget, ...htmlDivAttributes} = this.props;
        const {opened} = this.state;

        return (
            <KeyDownListener onMatch={this.closeDropdownByKeyDown} eventKeyCode={EVENT_KEY_CODES.ESC}>
                <div className={classnames(className, 'cssClass[selectExtended]')} ref={this.setContainerNode} {...htmlDivAttributes}>
                    <div className="cssClass[selectExtendedTargetWrapper]">{renderTarget({opened, setOpened: this.setOpened})}</div>
                    <div className="cssClass[selectExtendedDropdownWrapper]">
                        {children({
                            className: classnames('cssClass[selectExtendedDropdown]', {
                                'cssClass[selectExtendedDropdownOpened]': opened,
                                'cssClass[selectExtendedDropdownClosed]': !opened,
                            }),
                            opened,
                            setOpened: this.setOpened,
                        })}
                    </div>
                </div>
            </KeyDownListener>
        );
    }

    private setContainerNode = (node: HTMLDivElement) => (this.containerNode = node);

    private setOpened = (opened: boolean) => {
        this.setState({opened});
    };

    private handleMouseUp = ({target}: Event) => {
        const {opened} = this.state;

        if (opened && !this.containerNode?.contains(target as Node)) {
            this.setState({opened: false});
        }
    };

    private closeDropdownByKeyDown = () => {
        const {opened} = this.state;

        if (opened) {
            this.setState({opened: false});
        }
    };
}
