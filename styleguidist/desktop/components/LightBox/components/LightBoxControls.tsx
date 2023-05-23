import React from 'react';
import {Button} from '@sberbusiness/triplex/desktop/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/desktop/components/Button/enums';

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
