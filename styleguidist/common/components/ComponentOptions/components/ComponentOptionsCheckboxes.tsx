import React from 'react';
import {IStyleguidistComponentOptionCheckbox} from '../../../../../common/types/styleguidist-preview-options';

interface IComponentOptionsCheckboxesProps {
    options: IStyleguidistComponentOptionCheckbox[];
}

/**
 * Компонент - группа опций в виде чекбоксов.
 */
const ComponentOptionsCheckboxes: React.FC<IComponentOptionsCheckboxesProps> = ({options}) => {
    return (
        <>
            {options.map(({hidden, label, onChange, ...inputProps}) => (
                <div className="option" key={inputProps.id} hidden={hidden}>
                    <label><input {...inputProps} type="checkbox" onChange={(e) => {onChange(e.target.checked)}}/> {label}</label>
                </div>
            ))}
        </>
    );
};

export default ComponentOptionsCheckboxes;
