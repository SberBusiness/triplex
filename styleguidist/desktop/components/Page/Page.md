```jsx
import React, {useState} from 'react';
import {Button} from '@sberbusiness/triplex/desktop/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/desktop/components/Button/enums';
import {Page} from '@sberbusiness/triplex/desktop/components/Page/Page';
import {Row} from '@sberbusiness/triplex/desktop/components/Row/Row';
import {Col} from '@sberbusiness/triplex/desktop/components/Col/Col';
import {Gap} from '@sberbusiness/triplex/desktop/components/Gap/Gap';
import {EBodyBackgroundColor} from '@sberbusiness/triplex/desktop/components/Body/enums';
import './styles.less';

const [backgroundColor, setBackgroundColor] = useState(EBodyBackgroundColor.WHITE);

const renderSelect = (label, value, handler, options) => (
    <label style={{display: 'inline-flex'}}>
        {label}
        <select value={value} onChange={(event) => handler(event.target.value)} style={{marginLeft: '4px'}}>
            {options.map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
            ))}
        </select>
    </label>
);

<>
    {renderSelect('Background Color', backgroundColor, setBackgroundColor, Object.values(EBodyBackgroundColor))}
    <Gap size={16} />
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
