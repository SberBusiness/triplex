import React, {useEffect} from 'react';
import ComponentOptionsCheckboxes from './components/ComponentOptionsCheckboxes';
import ComponentOptionsInputs from './components/ComponentOptionsInputs';
import {URLUtils} from './URLUtils';
import {
    IStyleguidistComponentOptionCheckbox,
    IStyleguidistComponentOptionInput,
} from '../../../../common/types/styleguidist-preview-options';
import './styles.less';

export interface IComponentOptionsProps {
    // Опции, отображаемые как чекбоксы.
    checkboxOptions?: IStyleguidistComponentOptionCheckbox[];
    // Блок опций визуально не отображается.
    hidden?: boolean;
    // Опции, отображаемые как input[type="text"].
    inputOptions?: IStyleguidistComponentOptionInput[];
}

/**
 * Компонент отображения настраиваемых опций для демонстрационного компонента.
 */
const ComponentOptions: React.FC<IComponentOptionsProps> = ({checkboxOptions, hidden, inputOptions}) => {
    useEffect(() => {
        if (URLUtils.isComponentPage()) {
            URLUtils.updateComponentOptionsFromUrl({checkboxOptions, inputOptions});
        }
    }, []);

    useEffect(() => {
        if (URLUtils.isComponentPage()) {
            const nextCheckboxUrlOptions = checkboxOptions
                ? checkboxOptions.map(({label, hidden, onChange, ...option}) => option)
                : undefined;
            const nextInputUrlOptions = inputOptions ? inputOptions.map(({hidden, onChange, ...option}) => option) : undefined;
            URLUtils.updateURLOptionsFromComponent({checkboxOptions: nextCheckboxUrlOptions, inputOptions: nextInputUrlOptions});
        }
    }, [checkboxOptions, inputOptions]);

    return (
        <div className={`component-options ${hidden ? 'hidden' : ''}`}>
            {checkboxOptions ? (
                <div className="options-group">
                    <ComponentOptionsCheckboxes options={checkboxOptions} />
                </div>
            ) : null}
            {inputOptions ? (
                <div className="options-group">
                    <ComponentOptionsInputs options={inputOptions} />
                </div>
            ) : null}
        </div>
    );
};

export default ComponentOptions;
