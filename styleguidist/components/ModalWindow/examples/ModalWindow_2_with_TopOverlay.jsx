import React, {useState, useEffect} from 'react';
import {
    ModalWindow,
    ModalWindowHeader,
    ModalWindowBody,
    ModalWindowFooter,
    ModalWindowClose,
    ModalWindowContent,
} from '@sberbusiness/triplex/components/ModalWindow';
import {EModalWindowSize} from '@sberbusiness/triplex/components/ModalWindow/enums';
import {ModalWindowTopOverlay} from '@sberbusiness/triplex/components/ModalWindow/components/ModalWindowTopOverlay';
import {Header} from '@sberbusiness/triplex/components/Header/Header';
import {FooterDescription} from '@sberbusiness/triplex/components/Footer/components/FooterDescription';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';

const [open, setOpen] = useState(false);
const [openTopOverlay, setOpenTopOverlay] = useState(false);

useEffect(() => {
    if (open) {
        document.body.classList.add('dialogOpenExample');
    } else {
        document.body.classList.remove('dialogOpenExample');
    }
}, [open]);

const handleOpen = () => setOpen(true);
const handleClose = () => setOpenTopOverlay(true);

const renderTopOverlay = () => (
    <ModalWindowTopOverlay
        title="Внимание"
        subTitle="Несохранённые данные будут утеряны. Вы уверены, что хотите покинуть форму редактирования?"
        continueButtonText="Отмена"
        closeButtonText="Покинуть форму"
        isOpen={openTopOverlay}
        onClose={() => setOpen(false)}
        closeConfirm={() => setOpenTopOverlay(false)}
    />
);

const modalContent = (
    <ModalWindowContent>
        <ModalWindowHeader>
            <Header.Title>
                <Header.Title.Content>
                    <Header.Title.Content.Text>Текст заголовка в одну строку</Header.Title.Content.Text>
                </Header.Title.Content>
            </Header.Title>
        </ModalWindowHeader>
        <ModalWindowBody>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </ModalWindowBody>
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
        {renderTopOverlay()}
    </ModalWindowContent>
);

const closeButton = <ModalWindowClose onClick={handleClose} key="close" />;

<>
    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={handleOpen}>
        Open ModalWindow
    </Button>
    <ModalWindow closeButton={closeButton} isOpen={open}>
        {modalContent}
    </ModalWindow>
</>;
