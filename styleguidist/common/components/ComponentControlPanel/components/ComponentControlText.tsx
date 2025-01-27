import React, {useRef} from 'react';
import {uniqueId} from '@sberbusiness/triplex/utils/uniqueId';
import './styles/ComponentControlText.less';

interface IComponentControlNumberProps {
    children: React.ReactNode;
    value: string;
    setValue: (value: string) => void;
}

const ComponentControlText: React.FC<IComponentControlNumberProps> = ({children, value, setValue, ...rest}) => {
    const id = useRef(uniqueId('control-'));

    return (
        <div className="component-control-text">
            <label htmlFor={id.current}>{children}</label>
            <input id={id.current} type="text" value={value} onChange={(event) => setValue(event.target.value)} {...rest} />
        </div>
    );
};

export default ComponentControlText;
