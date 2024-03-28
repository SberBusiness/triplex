import React from 'react';
import {ITopOverlayConfirmProps, TopOverlayConfirm} from '@sberbusiness/triplex/components/TopOverlay/TopOverlayConfirm';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import FocusTrap from 'focus-trap-react';

/**
 * Свойства ModalWindowTopOverlay.
 */
//interface ModalWindowTopOverlayProps extends ITopOverlayConfirmProps {}
type ModalWindowTopOverlayProps = ITopOverlayConfirmProps;

export const overlayDataAttributeIsOpen = 'data-is-open';

export class ModalWindowTopOverlay extends React.PureComponent<ModalWindowTopOverlayProps> {
    public static displayName = 'ModalWindowTopOverlay';

    public render() {
        const {isOpen} = this.props;

        return (
            <FocusTrap active={isOpen} focusTrapOptions={{clickOutsideDeactivates: true}}>
                <div className={classnames('cssClass[modalWindowTopOverlayWrapper]')} {...(isOpen && {[overlayDataAttributeIsOpen]: true})}>
                    <TopOverlayConfirm {...this.props} />
                </div>
            </FocusTrap>
        );
    }
}
