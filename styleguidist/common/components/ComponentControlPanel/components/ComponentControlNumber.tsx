import React, {useRef} from 'react';
import {uniqueId} from '@sberbusiness/triplex/utils/uniqueId';
import './styles/ComponentControlNumber.less';

interface IComponentControlNumberProps {
    children: React.ReactNode;
    value: string;
    setValue: (value: string) => void;
}

const ComponentControlNumber: React.FC<IComponentControlNumberProps> = ({children, value, setValue, ...rest}) => {
    const id = useRef(uniqueId('control-'));

    return (
        <div className="component-control-number">
            <label htmlFor={id.current}>{children}</label>
            <input id={id.current} type="number" value={value} onChange={(event) => setValue(event.target.value)} {...rest} />
        </div>
    );
};

export default ComponentControlNumber;
