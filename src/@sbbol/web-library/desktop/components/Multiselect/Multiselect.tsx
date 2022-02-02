import React from 'react';
import {ISelectExtendedProps, SelectExtended} from '@sbbol/web-library/desktop/components/Select/SelectExtended';
import {SelectExtendedTarget} from '@sbbol/web-library/desktop/components/Select/components/SelectExtendedTarget';
import {MultiselectDropdown} from '@sbbol/web-library/desktop/components/Multiselect/components/MultiselectDropdown';

interface IMultiselectProps extends ISelectExtendedProps {}

/** Компонент мульти-списка. */
export class Multiselect extends React.PureComponent<IMultiselectProps> {
    public static Target = SelectExtendedTarget;
    public static Dropdown = MultiselectDropdown;

    render(): JSX.Element {
        return <SelectExtended {...this.props} />;
    }
}
