/**
 * Опции компонента Styleguidist, передаваемые через URL параметры.
 */
export interface IStyleguidistURLOptionsProps {
    // Опции, отображаемые как чекбоксы.
    checkboxOptions?: IStyleguidistURLOptionCheckbox[];
    // Опции, отображаемые как input[type="text"].
    inputOptions?: IStyleguidistURLOptionInput[];
}

interface IStyleguidistURLOptionCheckbox extends Omit<IStyleguidistComponentOptionCheckbox, 'hidden' | 'onChange' | 'label'> {}
interface IStyleguidistURLOptionInput extends Omit<IStyleguidistComponentOptionInput, 'hidden' | 'onChange'> {}

export interface IStyleguidistComponentOptionInput {
    id: string;
    // Флаг отображения в интерфейсе опций компонента.
    hidden?: boolean;
    label?: string;
    onChange: (value: string) => void;
    value: string;
}

export interface IStyleguidistComponentOptionCheckbox {
    id: string;
    checked: boolean;
    // Флаг отображения в интерфейсе опций компонента.
    hidden?: boolean;
    label: string;
    onChange: (checked: boolean) => void;
}
