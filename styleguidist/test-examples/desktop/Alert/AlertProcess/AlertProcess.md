```jsx
import React, { useEffect, useRef, useState } from 'react';
import ComponentPreview from '../../../../common/components/ComponentPreview/ComponentPreview';
import ComponentOptions from '../../../../common/components/ComponentOptions/ComponentOptions';
import {AlertProcessExample} from './AlertProcessExample';
import {EAlertType} from '@sberbusiness/triplex/desktop/components/Alert/EAlertType';

const [type, setType] = useState(EAlertType.FEATURE);
const [isCustomIcon, setIsCustomIcon] = useState(false);

const checkboxOptions = [
  {
    id: 'customIcon',
    label: 'Show custom icon',
    checked: isCustomIcon,
    onChange: setIsCustomIcon,
  },
];

const inputOptions = [
  {
    id: 'type',
    label: 'Type',
    onChange: setType,
    value: type,
  },
];

<>
  <ComponentOptions checkboxOptions={checkboxOptions} inputOptions={inputOptions} />
  <ComponentPreview>
    <AlertProcessExample type={type} isCustomIcon={isCustomIcon} />
  </ComponentPreview>
</>
```