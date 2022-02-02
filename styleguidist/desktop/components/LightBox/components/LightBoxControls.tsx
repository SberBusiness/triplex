import React from 'react';
import {Button} from '@sbbol/web-library/desktop/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sbbol/web-library/desktop/components/Button/enums';

/**
 * Демонстрационные кнопки в хедере и футере Лайтбокса.
 */
export const LightBoxControls: React.FC = () => (
    <>
        <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
            Button Name
        </Button>
        <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
            Button Name
        </Button>
    </>
);
