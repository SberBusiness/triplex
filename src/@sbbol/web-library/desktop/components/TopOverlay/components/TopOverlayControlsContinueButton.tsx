import * as React from 'react';
import {Button} from '@sbbol/web-library/desktop/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sbbol/web-library/desktop/components/Button/enums';

/**
 * Свойства компонента.
 */
interface ITopOverlayControlsContinueButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: string;
}

/**
 * Кнопка закрытия TopOverlay.
 */
export class TopOverlayControlsContinueButton extends React.PureComponent<ITopOverlayControlsContinueButtonProps> {
    public static displayName = 'TopOverlayControlsContinueButton';

    public render(): React.ReactNode {
        const {children, ...buttonHTMLAttributes} = this.props;

        return (
            <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} data-test-id="confirm__cancelClose" {...buttonHTMLAttributes}>
                {children}
            </Button>
        );
    }
}
