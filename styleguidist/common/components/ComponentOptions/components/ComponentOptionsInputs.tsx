import React from 'react';
import {IStyleguidistComponentOptionInput} from '../../../../../common/types/styleguidist-preview-options';

interface IComponentOptionInputsProps {
    options: IStyleguidistComponentOptionInput[];
}

/**
 * Компонент - группа опций в виде полей ввода.
 */
const ComponentOptionsInputs: React.FC<IComponentOptionInputsProps> = ({options}) => {
    return (
        <>
            {options.map(({hidden, onChange, label, ...inputProps}) => (
                <div className="option" key={inputProps.id} hidden={hidden}>
                    <div className="styleguidist-row">
                        {label && (
                            <div className="styleguidist-col3">
                                <label htmlFor={inputProps.id}>{label}</label>
                            </div>
                        )}
                        <div className={label ? 'styleguidist-col8' : 'styleguidist-col12'}>
                            <input type="text" {...inputProps} onChange={(e) => onChange(e.target.value)} />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ComponentOptionsInputs;
