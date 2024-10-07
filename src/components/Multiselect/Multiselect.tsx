import React from 'react';
import {ISelectExtendedProps, SelectExtended} from '@sberbusiness/triplex/components/SelectExtended/SelectExtended';
import {SelectExtendedTarget} from '@sberbusiness/triplex/components/SelectExtended/components/SelectExtendedTarget';
import {MultiselectDropdown} from './components/MultiselectDropdown';

export interface IMultiselectProps extends ISelectExtendedProps {}

/** Компонент мульти-списка. */
export class Multiselect extends React.PureComponent<IMultiselectProps> {
    public static Target = SelectExtendedTarget;
    public static Dropdown = MultiselectDropdown;

    render(): JSX.Element {
        return <SelectExtended {...this.props} />;
    }
}
