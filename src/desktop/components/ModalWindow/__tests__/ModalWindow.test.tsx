import React from 'react';
import renderer from 'react-test-renderer';
import {allure} from '@jest/unit/allure-report';
import {ModalWindowBasicMD} from '../ModalWindowBasicMD';
import {
    ModalWindowBody,
    ModalWindowContent,
    ModalWindowFooter,
    ModalWindowHeader,
} from '@sberbusiness/triplex/desktop/components/ModalWindow/index';
import {FooterDescription} from '@sberbusiness/triplex/desktop/components/Footer/components/FooterDescription';
import {Button} from '@sberbusiness/triplex/desktop/components/Button/Button';
import {EButtonSize, EButtonTheme} from '@sberbusiness/triplex/desktop/components/Button/enums';

import {Header} from '../../Header/Header';

jest.mock('@sberbusiness/icons/SpinnersmallwhiteAniIcon20', () => ({
    SpinnersmallwhiteAniIcon20: 'svg',
}));

jest.mock('@sberbusiness/icons/SpinnersmallAniIcon20', () => ({
    SpinnersmallAniIcon20: 'svg',
}));

jest.mock('@sberbusiness/icons/CaretdownSrvxIcon16', () => ({
    CaretdownSrvxIcon16: 'svg',
}));

jest.mock('@sberbusiness/icons/DropdownwhiteSrvxIcon16', () => ({
    DropdownwhiteSrvxIcon16: 'svg',
}));

jest.mock('@sberbusiness/icons/CloselargeNavIcon32', () => ({
    CloselargeNavIcon32: 'svg',
}));

jest.mock('@sberbusiness/icons/ClosemediumNavIcon20', () => ({
    ClosemediumNavIcon20: 'svg',
}));

jest.mock('@sberbusiness/icons/SpinnerlargeAniIcon64', () => ({
    SpinnerlargeAniIcon64: 'svg',
}));

const handleCloseClick = () => null;

describe.skip('ModalWindow', () => {
    beforeEach(() => {
        allure.feature('ModalWindow');
    });

    it('renders correctly', () => {
        /** Create and add dummy div **/
        // let testId = 'ufs-modal-window-wrapper';
        // let newDiv = document.createElement('div');
        // newDiv.setAttribute('id', testId);
        // document.body.appendChild(newDiv);
        const tree = renderer
            .create(
                <ModalWindowBasicMD isOpen closeButton={handleCloseClick} onAbort={handleCloseClick}>
                    <ModalWindowContent key="content">
                        <ModalWindowHeader>
                            <Header.Title>
                                <Header.Title.Content>
                                    <Header.Title.Content.Text>Текст заголовка в одну строку</Header.Title.Content.Text>
                                </Header.Title.Content>
                            </Header.Title>
                        </ModalWindowHeader>
                        <ModalWindowBody>Content</ModalWindowBody>
                        <ModalWindowFooter>
                            <FooterDescription>
                                <FooterDescription.Controls>
                                    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                                        Button Name
                                    </Button>
                                    <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                                        Button Name
                                    </Button>
                                </FooterDescription.Controls>
                            </FooterDescription>
                        </ModalWindowFooter>
                    </ModalWindowContent>
                </ModalWindowBasicMD>
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
});
