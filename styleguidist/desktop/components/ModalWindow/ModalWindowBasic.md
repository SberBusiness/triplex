```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency componentTitle="ModalWindowBasicSM" isMobileComponent={false} />;
```

```jsx
import React, {useState} from 'react';
import {Button} from '@sberbusiness/triplex/desktop/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/desktop/components/Button/enums';
import {CheckboxYGroup} from '@sberbusiness/triplex/desktop/components/Checkbox/CheckboxYGroup';
import {Checkbox} from '@sberbusiness/triplex/desktop/components/Checkbox/Checkbox';
import {RadioYGroup} from '@sberbusiness/triplex/desktop/components/Radio/RadioYGroup';
import {Radio} from '@sberbusiness/triplex/desktop/components/Radio/Radio';
import {Row} from '@sberbusiness/triplex/desktop/components/Row/Row';
import {Col} from '@sberbusiness/triplex/desktop/components/Col/Col';
import {Gap} from '@sberbusiness/triplex/desktop/components/Gap/Gap';
import {Header} from '@sberbusiness/triplex/desktop/components/Header/Header';
import {FooterDescription} from '@sberbusiness/triplex/desktop/components/Footer/components/FooterDescription';
import {
    ModalWindowBasicSM,
    ModalWindowBasicMD,
    ModalWindowBasicLG,
    ModalWindowHeader,
    ModalWindowBody,
    ModalWindowFooter,
    ModalWindowClose,
    ModalWindowContent,
} from '@sberbusiness/triplex/desktop/components/ModalWindow';
import {ModalWindowSize} from '@sberbusiness/triplex/desktop/components/ModalWindow/enums';
import {ModalWindowTopOverlay} from '@sberbusiness/triplex/desktop/components/ModalWindow/components/ModalWindowTopOverlay';

const [isOpenModal, setIsOpenModal] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [isLongContent, setIsLongContent] = useState(false);
const [haveTopOverlay, setHaveTopOverlay] = useState(false);
const [showTopOverlay, setShowTopOverlay] = useState(false);
const [modalSize, setModalSize] = useState(ModalWindowSize.SM);

const options = [
    {
        label: 'Состояние загрузки',
        checked: isLoading,
        onChange: (e) => setIsLoading(e.target.checked),
    },
    {
        label: 'Со скроллом',
        checked: isLongContent,
        onChange: (e) => setIsLongContent(e.target.checked),
    },
    {
        label: 'C Top Overlay ',
        checked: haveTopOverlay,
        onChange: (e) => setHaveTopOverlay(e.target.checked),
    },
];

const optionsSize = [
    {label: 'SM', value: ModalWindowSize.SM},
    {label: 'MD', value: ModalWindowSize.MD},
    {label: 'LG', value: ModalWindowSize.LG},
];

const longText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const createLongContent = () => {
    let i = 1;
    let result = [];

    do {
        result.push(longText, <Gap size={16} />);
    } while (++i <= 20);

    return result;
};

const renderModalWindowTopOverlay = () => (
    <ModalWindowTopOverlay
        isOpen={showTopOverlay}
        onClose={() => setIsOpenModal(false)}
        closeConfirm={() => setShowTopOverlay(false)}
        closeButtonText="Покинуть форму"
        continueButtonText="Отмена"
        title="Внимание"
        subTitle="Несохранённые данные будут утеряны. Вы уверены, что хотите покинуть форму редактирования?"
    />
);

const handleClose = () => {
    if (haveTopOverlay && !isLoading) {
        setShowTopOverlay(true);
    } else {
        setIsOpenModal(false);
    }
};

const modalContent = (
    <ModalWindowContent key="content">
        <ModalWindowHeader>
            <Header.Title>
                <Header.Title.Content>
                    <Header.Title.Content.Text>Текст заголовка в одну строку</Header.Title.Content.Text>
                </Header.Title.Content>
            </Header.Title>
        </ModalWindowHeader>
        <ModalWindowBody>{isLongContent ? createLongContent() : 'Content'}</ModalWindowBody>
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
        {renderModalWindowTopOverlay()}
    </ModalWindowContent>
);

const modalCloseButton = <ModalWindowClose onClick={handleClose} key="close" />;

<>
    <Row>
        <Col size={6}>
            <RadioYGroup>
                {optionsSize.map((item, index) => (
                    <Radio
                        key={index}
                        value={item.value}
                        checked={modalSize === item.value}
                        onChange={(event) => setModalSize(event.target.value)}
                    >
                        {item.label}
                    </Radio>
                ))}
            </RadioYGroup>
        </Col>
        <Col size={6}>
            <CheckboxYGroup>
                {options.map((item, index) => (
                    <Checkbox key={index} onChange={item.onChange}>
                        {item.label}
                    </Checkbox>
                ))}
            </CheckboxYGroup>
        </Col>
    </Row>

    <Row>
        <Col>
            <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={() => setIsOpenModal(true)}>
                Открыть модальное окно
            </Button>
        </Col>
    </Row>

    <ModalWindowBasicSM
        isOpen={isOpenModal && modalSize === ModalWindowSize.SM}
        isLoading={isLoading}
        closeButton={modalCloseButton}
    >
        {modalContent}
    </ModalWindowBasicSM>

    <ModalWindowBasicMD
        isOpen={isOpenModal && modalSize === ModalWindowSize.MD}
        isLoading={isLoading}
        closeButton={modalCloseButton}
    >
        {modalContent}
    </ModalWindowBasicMD>

    <ModalWindowBasicLG
        isOpen={isOpenModal && modalSize === ModalWindowSize.LG}
        isLoading={isLoading}
        closeButton={modalCloseButton}
    >
        {modalContent}
    </ModalWindowBasicLG>
</>;
```
