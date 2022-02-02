import * as React from 'react';
import {Button} from '@sbbol/web-library/desktop/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sbbol/web-library/desktop/components/Button/enums';

/**
 * Свойства компонента.
 */
interface ITopOverlayControlsCloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: string;
}

/**
 * Кнопка закрытия TopOverlay.
 */
export class TopOverlayControlsCloseButton extends React.PureComponent<ITopOverlayControlsCloseButtonProps> {
    public static displayName = 'TopOverlayControlsCloseButton';

    public render(): React.ReactNode {
        const {children, ...buttonHTMLAttributes} = this.props;

        return (
            <Button theme={EButtonTheme.DANGER} size={EButtonSize.MD} data-test-id="confirm__close" {...buttonHTMLAttributes}>
                {children}
            </Button>
        );
    }
}
