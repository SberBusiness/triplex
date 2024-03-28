import React, {useRef} from 'react';
import {uniqueId} from '@sberbusiness/triplex/utils/uniqueId';
import '../styles/ComponentControlSelect.less';

/** Свойства ComponentControlSelect. */
interface IComponentControlSelectProps {
    children: React.ReactNode;
    value: string;
    setValue: (value: string) => void;
    options: string[];
}

/** Поле с опциями на панели управления компонентом. */
const ComponentControlSelect: React.FC<IComponentControlSelectProps> = ({children, value, setValue, options, ...rest}) => {
    const id = useRef(uniqueId('control-'));

    const renderArrow = () => (
        <svg
            className="component-control-select-arrow"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            focusable={false}
        >
            <path d="M2 5L6 8L10 5" stroke="#1F1F22" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );

    return (
        <div className="component-control-select">
            <label htmlFor={id.current}>{children}</label>
            <select id={id.current} value={value} onChange={(event) => setValue(event.target.value)} {...rest}>
                {options.map((value, index) => (
                    <option key={index}>{value}</option>
                ))}
            </select>
            {renderArrow()}
        </div>
    );
};

export default ComponentControlSelect;
