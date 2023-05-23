```jsx
import {Row} from '@sberbusiness/triplex/desktop/components/Row/Row';
import {Col} from '@sberbusiness/triplex/desktop/components/Col/Col';

<>
    <Row>
        <Col>
            <HelpBoxSM
                data-test-id="target-test-id"
                tooltipDataAttributes={{'test-id': 'tooltip-test-id'}}
                tooltipAriaAttributes={{label: 'HelpBox размера SM. Tooltip Body HelpBox SM'}}
            >
                HelpBox размера SM. Tooltip Body HelpBox SM
            </HelpBoxSM>
        </Col>
    </Row>
    <Row>
        <Col>
            <HelpBoxSM data-id='222' onShow={(tooltip) => console.log('Tooltip was showed ', tooltip.dataset)}>
                Передан дата атрибут и обработчиком вызывающийся при открытии тултипа
            </HelpBoxSM>
        </Col>
    </Row>
</>
```
