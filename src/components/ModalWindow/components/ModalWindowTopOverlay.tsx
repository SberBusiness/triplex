import React from 'react';
import {ITopOverlayConfirmProps, TopOverlayConfirm} from '@sberbusiness/triplex/components/TopOverlay/TopOverlayConfirm';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {ModalFocusOnMount} from '@sberbusiness/triplex/components/ModalFocusManager/ModalFocusOnMount';

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
            <div className={classnames('cssClass[modalWindowTopOverlayWrapper]')} {...(isOpen && {[overlayDataAttributeIsOpen]: true})}>
                <ModalFocusOnMount disabled={!isOpen}>
                    <TopOverlayConfirm {...this.props} />
                </ModalFocusOnMount>
            </div>
        );
    }
}