import {IModalWindowProps, ModalWindow} from '@sberbusiness/triplex/desktop/components/ModalWindow/Factory/ModalWindow';
import * as React from 'react';
import {ModalWindowSize} from './enums';

/**
 * Компонент модального окна (medium размера).
 * Открывать и закрывать модальное окно необходимо через prop isOpen: boolean.
 * Запрещено использовать условный рендеринг isVisible && <ModalWindowBasicMD />.
 */
export const ModalWindowBasicMD: React.ComponentClass<IModalWindowProps> = ModalWindow(ModalWindowSize.MD, 'ModalWindowBasicMD');
