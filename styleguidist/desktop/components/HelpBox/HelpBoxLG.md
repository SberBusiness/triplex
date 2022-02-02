```jsx
import {Row} from '@sbbol/web-library/desktop/components/Row/Row';
import {Col} from '@sbbol/web-library/desktop/components/Col/Col';
import {TooltipBody} from '@sbbol/web-library/desktop/components/Tooltip/TooltipBody';
import {ELinkSize, ELinkType, Link} from '@sbbol/web-library/desktop/components/Link/Link';
import {Gap} from '@sbbol/web-library/desktop/components/Gap/Gap';

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
    <Row>
        <Col>
            <HelpBoxLG tabSensitive={false}>
                HelpBox, у которого тултип не всплывает по табу. Tooltip Body HelpBox LG Tooltip Body HelpBox LG Tooltip Body HelpBox LG
            </HelpBoxLG>
        </Col>
    </Row>
</>
```
