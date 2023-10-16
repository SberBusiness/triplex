```jsx
import {EBodyBackgroundColor} from '@sberbusiness/triplex/components/Body/enums';
import {Row} from '@sberbusiness/triplex/components/Row/Row';
import {Col} from '@sberbusiness/triplex/components/Col/Col';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {ComponentControlPanel} from '../common/ComponentControlPanel/ComponentControlPanel';
import './styles.less';

const [backgroundColor, setBackgroundColor] = React.useState(EBodyBackgroundColor.WHITE);

const renderControlPanel = () => (
    <ComponentControlPanel>
        <ComponentControlPanel.Select
            value={backgroundColor}
            setValue={setBackgroundColor}
            options={Object.values(EBodyBackgroundColor)}
        >
            Background color
        </ComponentControlPanel.Select>
    </ComponentControlPanel>
);

<>
    {renderControlPanel()}
    <div className="page-example">
        <Page>
            <Page.Header>
                <Page.Header.Link>Текст ссылки</Page.Header.Link>
                <Page.Header.Title>
                    <Page.Header.Title.Content>
                        <Page.Header.Title.Content.Text>Шаблонный текст заголовка в одну строку</Page.Header.Title.Content.Text>
                        <Page.Header.Title.Content.Subhead>Шаблонный текст для описания</Page.Header.Title.Content.Subhead>
                    </Page.Header.Title.Content>
                    <Page.Header.Title.Controls>
                        <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                            Button Name
                        </Button>
                        <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                            Button Name
                        </Button>
                    </Page.Header.Title.Controls>
                </Page.Header.Title>
            </Page.Header>
            <Page.Body backgroundColor={backgroundColor}>
                <Row>
                    <Col>
                        <div>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                            deserunt mollit anim id est laborum.
                        </div>
                    </Col>
                </Row>
            </Page.Body>
            <Page.Footer>
                <Page.Footer.Description>
                    <Page.Footer.Description.Content>Текст в одну строку</Page.Footer.Description.Content>
                    <Page.Footer.Description.Controls>
                        <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                            Button Name
                        </Button>
                        <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                            Button Name
                        </Button>
                    </Page.Footer.Description.Controls>
                </Page.Footer.Description>
            </Page.Footer>
        </Page>
    </div>
</>
```
