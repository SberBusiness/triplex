```jsx
import {Row} from '@sberbusiness/triplex/desktop/components/Row/Row';
import {Col} from '@sberbusiness/triplex/desktop/components/Col/Col';
import {TooltipBody} from '@sberbusiness/triplex/desktop/components/Tooltip/TooltipBody';
import {ELinkSize, ELinkType, Link} from '@sberbusiness/triplex/desktop/components/Link/Link';
import {Gap} from '@sberbusiness/triplex/desktop/components/Gap/Gap';

<>
    <Row>
        <Col>
            <HelpBoxLG>HelpBox размера LG. Tooltip Body HelpBox LG Tooltip Body HelpBox LG Tooltip Body HelpBox LG</HelpBoxLG>
        </Col>
    </Row>
    <Row>
        <Col>
            <HelpBoxLG>
                <TooltipBody>
                    HelpBox размера LG с ссылкой в теле тултипа. Tooltip Body HelpBox LG Tooltip Body HelpBox LG Tooltip Body HelpBox LG
                    <Gap size={16} />
                    <Link linkType={ELinkType.LINE} size={ELinkSize.SM}>Текст ссылки</Link>
                </TooltipBody>
            </HelpBoxLG>
        </Col>
    </Row>
</>
```
