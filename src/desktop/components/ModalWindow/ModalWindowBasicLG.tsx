import {IModalWindowProps, ModalWindow} from '@sberbusiness/triplex/desktop/components/ModalWindow/Factory/ModalWindow';
import * as React from 'react';
import {ModalWindowSize} from './enums';

/**
 * Компонент модального окна (large размера).
 * Открывать и закрывать модальное окно необходимо через prop isOpen: boolean.
 * Запрещено использовать условный рендеринг isVisible && <ModalWindowBasicLG />.
 */
export const ModalWindowBasicLG: React.ComponentClass<IModalWindowProps> = ModalWindow(ModalWindowSize.LG, 'ModalWindowBasicLG');
