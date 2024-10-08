import React from 'react';
import renderer from 'react-test-renderer';
import {
    ModalWindow,
    ModalWindowBody,
    ModalWindowContent,
    ModalWindowFooter,
    ModalWindowHeader,
} from '@sberbusiness/triplex/components/ModalWindow';
import {FooterDescription} from '@sberbusiness/triplex/components/Footer/components/FooterDescription';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonSize, EButtonTheme} from '@sberbusiness/triplex/components/Button/enums';

import {Header} from '../../Header/Header';
import {EModalWindowSize} from '@sberbusiness/triplex/components/ModalWindow/enums';

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

jest.mock('@sberbusiness/icons/HeaderkebabSrvxIcon16', () => ({
    HeaderkebabSrvxIcon16: 'svg',
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

jest.mock('@sberbusiness/icons/ClosenotificationSrvxIcon16', () => ({
    ClosenotificationSrvxIcon16: 'svg',
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
                // @ts-ignore
                <ModalWindow size={EModalWindowSize.MD} isOpen closeButton={handleCloseClick} onAbort={handleCloseClick}>
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
                </ModalWindow>
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
});
