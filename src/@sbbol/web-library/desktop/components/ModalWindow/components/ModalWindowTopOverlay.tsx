import * as React from 'react';
import {ITopOverlayConfirmProps, TopOverlayConfirm} from '@sbbol/web-library/desktop/components/TopOverlay/TopOverlayConfirm';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';

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
                <TopOverlayConfirm {...this.props} />
            </div>
        );
    }
}
