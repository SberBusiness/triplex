import * as React from 'react';
import {Body} from '../../Body/Body';

/**
 * Свойства компонента тела модального окна.
 * @prop {React.ReactNode} children Children.
 */
export interface IModalWindowBodyProps {
    children: React.ReactNode;
}

export class ModalWindowBody extends React.PureComponent<IModalWindowBodyProps> {
    public render() {
        const {children} = this.props;
        return <Body className="cssClass[modalWindowBody]">{children}</Body>;
    }
}
