```jsx noeditor
import ComponentStylesDependency from '../../../common/components/ComponentStylesDependency/ComponentStylesDependency';

<ComponentStylesDependency 
    componentTitle="AccordionView"
    isMobileComponent={false} 
/>
```

```jsx
import React, { useState } from 'react';
import {AccordionView} from '@sbbol/web-library/desktop/components/AccordionView/AccordionView';
import {Row} from '@sbbol/web-library/desktop/components/Row/Row';
import {Col} from '@sbbol/web-library/desktop/components/Col/Col';
import {Label} from '@sbbol/web-library/desktop/components/Label/Label';
import {Amount} from '@sbbol/web-library/desktop/components/Amount/Amount';
import {Gap} from '@sbbol/web-library/desktop/components/Gap/Gap';

const currencyTitle = 'Российские рубли';
const currency = 'RUB';
const [isOpen, setIsOpen] = useState(false);
const [additionalDataLine, setAdditionalDataLine] = useState(false);

const DataLine = () => (
    <Row>
       <Col size={3}>
           <Label>
               <Label.Text>Сумма</Label.Text>
           </Label>
       </Col>
       <Col size={4}>
           <Amount value="8967452.3145" currency={currency} currencyTitle={currencyTitle} />
       </Col>
        <Col size={5}>
            {!additionalDataLine && <span onClick={() => setAdditionalDataLine(true)}>Добавить строку</span>}
        </Col>
    </Row>
);

<>
    <AccordionView>
        <AccordionView.Header>Заголовок аккордеона (Управление состоянием открытия/закрытия внутри). Текст заголовка может быть только в одну строку</AccordionView.Header>
        <AccordionView.Body>
            <DataLine />
            {additionalDataLine && <DataLine />}
        </AccordionView.Body>
    </AccordionView>

    <Gap size={16} />

    <AccordionView isOpen={isOpen} toggle={setIsOpen}>
        <AccordionView.Header>Заголовок аккордеона (Управление состоянием открытия/закрытия снаружи)</AccordionView.Header>
        <AccordionView.Body>
              <DataLine />
              {additionalDataLine && <DataLine />}       
        </AccordionView.Body>
    </AccordionView>
</>

```