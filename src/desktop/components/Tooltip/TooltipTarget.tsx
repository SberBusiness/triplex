import * as React from 'react';

export interface ITooltipTargetProps {
    children: React.ReactElement;
}

export class TooltipTarget extends React.Component<ITooltipTargetProps> {
    public static displayName = 'TooltipTarget';

    public render() {
        const {children} = this.props;
        return React.cloneElement(children, {key: 1});
    }
}
