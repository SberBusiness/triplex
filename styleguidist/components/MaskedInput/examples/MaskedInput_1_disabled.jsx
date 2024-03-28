import React, {useState} from 'react';
import {MaskedInput} from '@sberbusiness/triplex/components/MaskedInput/MaskedInput';

const [value, setValue] = useState('');

<MaskedInput
    value={value}
    mask={MaskedInput.presets.masks.phone}
    onChange={(event) => setValue(event.target.value)}
    disabled
/>