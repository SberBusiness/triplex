import {Header} from '@sberbusiness/triplex/desktop/components/Header/Header';
import * as React from 'react';

/**
 * Свойства компонента заголовка модального окна.
 * @prop {React.ReactNode} children Children.
 */
interface IModalWindowHeaderProps {
    children: React.ReactNode;
}

/**
 * Компонент заголовка модального окна.
 */
export class ModalWindowHeader extends React.PureComponent<IModalWindowHeaderProps> {
    public static displayName = 'ModalWindowHeader';

    public render() {
        const {children} = this.props;

        return (
            <div className="cssClass[modalWindowHeader]">
                <Header>{children}</Header>
            </div>
        );
    }
}
