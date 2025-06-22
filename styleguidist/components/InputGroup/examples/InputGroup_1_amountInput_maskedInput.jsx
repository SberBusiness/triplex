import React, {useState} from 'react';
import {AmountInput} from '@sberbusiness/triplex/components/AmountInput/AmountInput';
import {MaskedInput} from '@sberbusiness/triplex/components/MaskedInput/MaskedInput';
import './style.less';

const renderAmountInput = () => {
    const [value, setValue] = useState('');

    return <AmountInput value={value} onChange={setValue} />;
};

const renderMaskedInput = () => {
    const [value, setValue] = useState('');

    return (
        <MaskedInput
            value={value}
            mask={[/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/]}
            onChange={(event) => setValue(event.target.value)}
        />
    );
};

<InputGroup className="input-group-wrapper">
    {renderAmountInput()}
    {renderMaskedInput()}
</InputGroup>