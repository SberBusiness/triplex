```jsx
import {Row} from '@sberbusiness/triplex/components/Row/Row';
import {Col} from '@sberbusiness/triplex/components/Col/Col';
import {ELinkSize, ELinkType, Link} from '@sberbusiness/triplex/components/Link/Link';
import {Gap} from '@sberbusiness/triplex/components/Gap/Gap';

<>
    <Row>
        <Col>
            <HelpBoxLG>HelpBox размера LG. Tooltip Body HelpBox LG Tooltip Body HelpBox LG Tooltip Body HelpBox LG</HelpBoxLG>
        </Col>
    </Row>
    <Row>
        <Col>
            <HelpBoxLG>
                HelpBox размера LG с ссылкой в теле тултипа. Tooltip Body HelpBox LG Tooltip Body HelpBox LG Tooltip Body HelpBox LG
                <Gap size={16} />
                <Link linkType={ELinkType.LINE} size={ELinkSize.SM}>Текст ссылки</Link>
            </HelpBoxLG>
        </Col>
    </Row>
</>
```
