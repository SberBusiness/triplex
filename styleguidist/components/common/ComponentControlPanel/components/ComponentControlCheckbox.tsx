import React from 'react';
import '../styles/ComponentControlCheckbox.less';

/** Свойства ComponentControlCheckbox. */
interface IComponentControlCheckboxProps {
    checked: boolean;
    setChecked: (checked: boolean) => void;
}

/** Чекбокс на панели управления компонентом. */
const ComponentControlCheckbox: React.FC<IComponentControlCheckboxProps> = ({children, checked, setChecked, ...rest}) => {
    const renderFrame = () => (
        <svg
            className="checkbox-frame"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            focusable={false}
        >
            <rect x="0.5" y="0.5" width="19" height="19" rx="3.5" fill="white" stroke="#D0D7DD" />
        </svg>
    );

    const renderTick = () => (
        <svg
            className="checkbox-tick"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            focusable={false}
        >
            <path
                d="M1 6L4.9095 10.468C5.1367 10.7277 5.55241 10.6846 5.72157 10.3839L11 1"
                stroke="#21A19A"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    );

    return (
        <div className="component-control-checkbox">
            <label>
                {renderFrame()}
                <input type="checkbox" checked={checked} onChange={(event) => setChecked(event.target.checked)} {...rest} />
                {renderTick()}
                {children}
            </label>
        </div>
    );
};

export default ComponentControlCheckbox;
