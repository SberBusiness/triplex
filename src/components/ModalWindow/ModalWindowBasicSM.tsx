import React from 'react';
import {ModalWindow, IModalWindowProps} from '@sberbusiness/triplex/components/ModalWindow/Factory/ModalWindow';
import {EModalWindowSize} from '@sberbusiness/triplex/components/ModalWindow/enums';

/**
 * Компонент модального окна (small размера).
 * Открывать и закрывать модальное окно необходимо через prop isOpen: boolean.
 * Запрещено использовать условный рендеринг isVisible && <ModalWindowBasicSM />.
 */
export const ModalWindowBasicSM: React.ComponentClass<IModalWindowProps> = ModalWindow(EModalWindowSize.SM, 'ModalWindowBasicSM');