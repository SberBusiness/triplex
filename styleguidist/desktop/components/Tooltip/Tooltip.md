```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency 
    componentTitle="Tooltip"
    isMobileComponent={false}
/>
```

```jsx
import React from 'react';
import {Col} from '@sbbol/web-library/desktop/components/Col/Col';
import {Row} from '@sbbol/web-library/desktop/components/Row/Row';
import {ButtonIcon} from '@sbbol/web-library/desktop/components/Button/ButtonIcon/ButtonIcon';
import {HintSrvIcon16} from '@sberbusiness/icons/HintSrvIcon16';
import {Tooltip} from '@sbbol/web-library/desktop/components/Tooltip/Tooltip';
import {ETooltipPreferPlace, ETooltipSize} from '@sbbol/web-library/desktop/components/Tooltip/enums';
import './TooltipExample.less';

const TooltipExample = () =>  {
    return (
        <Row>
            <Col size={2}>Размер SM</Col>
            <Col size={1}>
                <div className="tooltip-example-icon">
                    <Tooltip size={ETooltipSize.SM} toggleType="hover" preferPlace={ETooltipPreferPlace.ABOVE}>
                        <Tooltip.Body>Tooltip SM body Tooltip SM body</Tooltip.Body>
                        <Tooltip.XButton aria-label="Закрыть" />
                        <Tooltip.Target>
                            <ButtonIcon>
                                <HintSrvIcon16 />
                            </ButtonIcon>
                        </Tooltip.Target>
                    </Tooltip>
                </div>
            </Col>
        </Row>
    );
};

<TooltipExample />
```

```jsx
import React from 'react';
import {Col} from '@sbbol/web-library/desktop/components/Col/Col';
import {Row} from '@sbbol/web-library/desktop/components/Row/Row';
import {ButtonIcon} from '@sbbol/web-library/desktop/components/Button/ButtonIcon/ButtonIcon';
import {HintSrvIcon16} from '@sberbusiness/icons/HintSrvIcon16';
import {Tooltip} from '@sbbol/web-library/desktop/components/Tooltip/Tooltip';
import {ETooltipPreferPlace, ETooltipSize} from '@sbbol/web-library/desktop/components/Tooltip/enums';
import './TooltipExample.less';

const TooltipExample = () =>  {
    return (
        <Row>
            <Col size={2}>Размер SM без крестика закрытия</Col>
            <Col size={1}>
                <div className="tooltip-example-icon">
                    <Tooltip size={ETooltipSize.SM} toggleType="hover" preferPlace={ETooltipPreferPlace.RIGHT}>
                        <Tooltip.Body>Tooltip SM body Tooltip SM body</Tooltip.Body>
                        <Tooltip.Target>
                            <ButtonIcon>
                                <HintSrvIcon16 />
                            </ButtonIcon>
                        </Tooltip.Target>
                    </Tooltip>
                </div>
            </Col>
        </Row>
    );
};

<TooltipExample />
```

```jsx
import React from 'react';
import {Col} from '@sbbol/web-library/desktop/components/Col/Col';
import {Row} from '@sbbol/web-library/desktop/components/Row/Row';
import {ButtonIcon} from '@sbbol/web-library/desktop/components/Button/ButtonIcon/ButtonIcon';
import {HintSrvIcon16} from '@sberbusiness/icons/HintSrvIcon16';
import {Tooltip} from '@sbbol/web-library/desktop/components/Tooltip/Tooltip';
import {ETooltipPreferPlace, ETooltipSize} from '@sbbol/web-library/desktop/components/Tooltip/enums';
import './TooltipExample.less';

const TooltipExample = () =>  {
    return (
        <Row>
            <Col size={2}>Размер LG</Col>
            <Col size={1}>
                <div className="tooltip-example-icon">
                    <Tooltip size={ETooltipSize.LG} toggleType="hover" preferPlace={ETooltipPreferPlace.BELOW}>
                        <Tooltip.Body>Tooltip LG body Tooltip LG body</Tooltip.Body>
                        <Tooltip.XButton aria-label="Закрыть" />
                        <Tooltip.Target>
                            <ButtonIcon>
                                <HintSrvIcon16 />
                            </ButtonIcon>
                        </Tooltip.Target>
                    </Tooltip>
                </div>
            </Col>
        </Row>
    );
};

<TooltipExample />
```

```jsx
import React from 'react';
import {Col} from '@sbbol/web-library/desktop/components/Col/Col';
import {Row} from '@sbbol/web-library/desktop/components/Row/Row';
import {ButtonIcon} from '@sbbol/web-library/desktop/components/Button/ButtonIcon/ButtonIcon';
import {HintSrvIcon16} from '@sberbusiness/icons/HintSrvIcon16';
import {Tooltip} from '@sbbol/web-library/desktop/components/Tooltip/Tooltip';
import {ETooltipPreferPlace, ETooltipSize} from '@sbbol/web-library/desktop/components/Tooltip/enums';
import './TooltipExample.less';

const TooltipExample = () =>  {
    return (
        <Row>
            <Col size={2}>Размер LG с текстом больше 4 строк</Col>
            <Col size={1}>
                <div className="tooltip-example-icon">
                    <Tooltip size={ETooltipSize.LG} toggleType="hover" preferPlace={ETooltipPreferPlace.LEFT}>
                        <Tooltip.Body>
                            Если текст занимает более 4 строк, то можно добавить ссылку. В данном случае отображается текст и на
                            отдельной строке компонент LineSM. Если текст занимает более 4 строк, то можно добавить ссылку. В данном
                            случае отображается текст и на отдельной строке компонент LineSM. Если текст занимает более 4 строк, то
                            можно добавить ссылку. В данном случае отображается текст и на отдельной строке компонент LineSM.
                        </Tooltip.Body>
                        <Tooltip.XButton aria-label="Закрыть" />
                        <LineSM href="javascript:void(0)">Подробнее</LineSM>
                        <Tooltip.Target>
                            <ButtonIcon>
                                <HintSrvIcon16 />
                            </ButtonIcon>
                        </Tooltip.Target>
                    </Tooltip>
                </div>
            </Col>
        </Row>
    );
};

<TooltipExample />
```

```jsx
import React from 'react';
import {Col} from '@sbbol/web-library/desktop/components/Col/Col';
import {Row} from '@sbbol/web-library/desktop/components/Row/Row';
import {ButtonIcon} from '@sbbol/web-library/desktop/components/Button/ButtonIcon/ButtonIcon';
import {HintSrvIcon16} from '@sberbusiness/icons/HintSrvIcon16';
import {Tooltip} from '@sbbol/web-library/desktop/components/Tooltip/Tooltip';
import {ETooltipPreferPlace, ETooltipSize} from '@sbbol/web-library/desktop/components/Tooltip/enums';
import {ELinkSize, ELinkType, Link} from '@sbbol/web-library/desktop/components/Link/Link';
import './TooltipExample.less';

const TooltipExample = () =>  {
    return (
        <Row>
            <Col>
                <Tooltip size={ETooltipSize.LG} toggleType="click">
                    <Tooltip.Body>Tooltip LG body Tooltip LG body</Tooltip.Body>
                    <Tooltip.XButton aria-label="Закрыть" />
                    <Tooltip.Target>
                        <Link linkType={ELinkType.TEXT} size={ELinkSize.LG} href="javascript:void(0)">Нажмите, чтобы появился тултип размера LG</Link>
                    </Tooltip.Target>
                </Tooltip>
            </Col>
        </Row>
    );
};

<TooltipExample />
```

```jsx
import React, {useEffect, useState} from 'react';
import {Col} from '@sbbol/web-library/desktop/components/Col/Col';
import {Row} from '@sbbol/web-library/desktop/components/Row/Row';
import {ButtonIcon} from '@sbbol/web-library/desktop/components/Button/ButtonIcon/ButtonIcon';
import {HintSrvIcon16} from '@sberbusiness/icons/HintSrvIcon16';
import {Tooltip} from '@sbbol/web-library/desktop/components/Tooltip/Tooltip';
import {ETooltipPreferPlace, ETooltipSize} from '@sbbol/web-library/desktop/components/Tooltip/enums';
import './TooltipExample.less';

const TooltipExample = () =>  {
    const [tooltipRenderContainer, setTooltipRenderContainer] = useState(null);

    useEffect(() => {
        setTooltipRenderContainer(() => document.querySelector('.tooltipContainerInStyleguidist'));
    }, []);
    
    return (
        <>
            <div className="tooltipContainerInStyleguidist" />
            <Row>
                <Col size={2}>Тултип рендерится в переданный элемент</Col>
                <Col size={1}>
                    {tooltipRenderContainer ? (
                        <div className="tooltip-example-icon">
                            <Tooltip size={ETooltipSize.LG} toggleType="hover" tooltipRenderContainer={tooltipRenderContainer}>
                                <Tooltip.Body>Tooltip LG body. Testing renderContainer props.</Tooltip.Body>
                                <Tooltip.XButton aria-label="Закрыть" />
                                <Tooltip.Target>
                                    <ButtonIcon>
                                        <HintSrvIcon16 />
                                    </ButtonIcon>
                                </Tooltip.Target>
                            </Tooltip>
                        </div>
                    ) : null}
                </Col>
            </Row>
        </>
    );
};

<TooltipExample />
```

### Tooltip Controlled

```jsx
import React, {useState} from 'react';
import {Col} from '@sbbol/web-library/desktop/components/Col/Col';
import {ButtonIcon} from '@sbbol/web-library/desktop/components/Button/ButtonIcon/ButtonIcon';
import {HintSrvIcon16} from '@sberbusiness/icons/HintSrvIcon16';

const TooltipExample = () =>  {
    const [isOpen, setIsOpen] = useState(false);
    const [toggleType, setToggleType] = useState('click');

    const handleChange = (event) => setIsOpen(event.target.checked);
    
    return (
        <>
            <Tooltip key={toggleType} isOpen={isOpen} toggle={setIsOpen} toggleType={toggleType}>
                <Tooltip.Body>Test Controlled Tooltip</Tooltip.Body>
                <Tooltip.XButton aria-label="Закрыть" />
                <Tooltip.Target>
                    <ButtonIcon>
                        <HintSrvIcon16 />
                    </ButtonIcon>
                </Tooltip.Target>
            </Tooltip>
            <div style={{marginTop: '16px'}}>
                <label style={{display: 'inline-flex'}}  style={{marginRight: '8px'}}>
                    <input type="checkbox" checked={isOpen} onChange={handleChange} />
                    isOpen
                </label>
                <label style={{display: 'inline-flex'}}>
                    toggleType
                    <select value={toggleType} onChange={(event) => setToggleType(event.target.value || undefined)} style={{marginLeft: '4px'}}>
                        {['', 'click', 'hover'].map((value, index) => (
                            <option key={index} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
        </>
    );
};

<TooltipExample />
```
