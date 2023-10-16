```jsx
import {
    ModalWindowHeader,
    ModalWindowBody,
    ModalWindowFooter,
    ModalWindowClose,
    ModalWindowContent,
} from '@sberbusiness/triplex/components/ModalWindow';
import {EModalWindowSize} from '@sberbusiness/triplex/components/ModalWindow/enums';
import {Header} from '@sberbusiness/triplex/components/Header/Header';
import {FooterDescription} from '@sberbusiness/triplex/components/Footer/components/FooterDescription';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';

const [open, setOpen] = React.useState(false);

const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

const modalContent = (
    <ModalWindowContent>
        <ModalWindowHeader>
            <Header.Title>
                <Header.Title.Content>
                    <Header.Title.Content.Text>Текст заголовка в одну строку</Header.Title.Content.Text>
                </Header.Title.Content>
            </Header.Title>
        </ModalWindowHeader>
        <ModalWindowBody />
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
);

const closeButton = <ModalWindowClose onClick={handleClose} key="close" />;

<>
    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={handleOpen}>
        Open ModalWindow
    </Button>
    <ModalWindowBasicMD closeButton={closeButton} isOpen={open}>
        {modalContent}
    </ModalWindowBasicMD>
</>
```

### Loading state

```jsx
import {
    ModalWindowHeader,
    ModalWindowBody,
    ModalWindowFooter,
    ModalWindowClose,
    ModalWindowContent,
} from '@sberbusiness/triplex/components/ModalWindow';
import {EModalWindowSize} from '@sberbusiness/triplex/components/ModalWindow/enums';
import {Header} from '@sberbusiness/triplex/components/Header/Header';
import {FooterDescription} from '@sberbusiness/triplex/components/Footer/components/FooterDescription';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';

const [open, setOpen] = React.useState(false);

const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

const modalContent = (
    <ModalWindowContent>
        <ModalWindowHeader>
            <Header.Title>
                <Header.Title.Content>
                    <Header.Title.Content.Text>Текст заголовка в одну строку</Header.Title.Content.Text>
                </Header.Title.Content>
            </Header.Title>
        </ModalWindowHeader>
        <ModalWindowBody />
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
);

const closeButton = <ModalWindowClose onClick={handleClose} key="close" />;

<>
    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={handleOpen}>
        Open ModalWindow
    </Button>
    <ModalWindowBasicMD closeButton={closeButton} isOpen={open} isLoading={true}>
        {modalContent}
    </ModalWindowBasicMD>
</>
```

### With TopOverlay

```jsx
import {
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

const [open, setOpen] = React.useState(false);
const [openTopOverlay, setOpenTopOverlay] = React.useState(false);

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
        <ModalWindowBody />
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
    <ModalWindowBasicMD closeButton={closeButton} isOpen={open}>
        {modalContent}
    </ModalWindowBasicMD>
</>
```
