```jsx
import React, {useState} from 'react';
import {ExampleControlPanel} from '../common/ExampleControlPanel/ExampleControlPanel';
import {Divider} from '@sberbusiness/triplex/desktop/components/Divider/Divider';
import {Row} from '@sberbusiness/triplex/desktop/components/Row/Row';
import {Col} from '@sberbusiness/triplex/desktop/components/Col/Col';

const marginSize = [undefined, 4, 8, 12, 16, 20, 24, 28, 32];
const [marginTopSize, setMarginTopSize] = useState(marginSize[6]);
const [marginBottomSize, setMarginBottomSize] = useState(marginSize[4]);

const renderExampleControlPanel = () => (
    <ExampleControlPanel>
        <select value={marginTopSize} onChange={(event) => setMarginTopSize(event.target.value)} data-label="Margin top size">
            {marginSize.map((value, index) => (
                <option key={index}>{value}</option>
            ))}
        </select>
        <select value={marginBottomSize} onChange={(event) => setMarginBottomSize(event.target.value)} data-label="Margin bottom size">
            {marginSize.map((value, index) => (
                <option key={index}>{value}</option>
            ))}
        </select>
    </ExampleControlPanel>
);

<>
    {renderExampleControlPanel()}
    <span>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium cum, dicta dolores illum nemo quam? Accusamus ad asperiores ea
        earum, eveniet ex facilis illum ipsa modi natus quae voluptate, voluptatum.
    </span>
    <Divider marginTopSize={marginTopSize} marginBottomSize={marginBottomSize} />
    <span>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci corporis deserunt dicta distinctio dolor, eos est fugit id illo
        iste libero maiores molestiae natus omnis pariatur quos ratione rerum voluptas?
    </span>
    <Row paddingBottom={false}>
        <Col size={4} offset={4}>
            <Divider marginTopSize={marginTopSize} marginBottomSize={marginBottomSize} />
        </Col>
    </Row>
    <span>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi assumenda consequatur deleniti deserunt dolorem, dolores doloribus
        error exercitationem fuga maiores neque nihil numquam obcaecati quasi rerum voluptas voluptatem. Blanditiis, quisquam!
    </span>
</>
```
