import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import ComponentControlCheckbox from './components/ComponentControlCheckbox';
import ComponentControlText from './components/ComponentControlText';
import ComponentControlNumber from './components/ComponentControlNumber';
import ComponentControlSelect from './components/ComponentControlSelect';
import './styles/ComponentControlPanel.less';

/** Свойства ComponentControlPanel. */
interface IComponentControlPanelProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Внутренние составляющие ComponentControlPanel. */
interface IComponentControlPanelComposition extends React.HTMLAttributes<HTMLDivElement> {
    Text: typeof ComponentControlText;
    Number: typeof ComponentControlNumber;
    Checkbox: typeof ComponentControlCheckbox;
    Select: typeof ComponentControlSelect;
}

/** Панель управления для примера компонента. */
export const ComponentControlPanel: React.FC<IComponentControlPanelProps> & IComponentControlPanelComposition = ({className, ...rest}) => (
    <div className={classnames('component-control-panel', className)} {...rest} />
);

ComponentControlPanel.displayName = 'ComponentControlPanel';
ComponentControlPanel.Text = ComponentControlText;
ComponentControlPanel.Number = ComponentControlNumber;
ComponentControlPanel.Checkbox = ComponentControlCheckbox;
ComponentControlPanel.Select = ComponentControlSelect;
