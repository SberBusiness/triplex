```jsx
import {Divider} from '@sberbusiness/triplex/components/Divider/Divider';
import {Row} from '@sberbusiness/triplex/components/Row/Row';
import {Col} from '@sberbusiness/triplex/components/Col/Col';

// Supported sizes: 4, 8, 12, 16, 20, 24, 28, 32

const marginTopSize = 24;
const marginBottomSize = 16;

<>
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
