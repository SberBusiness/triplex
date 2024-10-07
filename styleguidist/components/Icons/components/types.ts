import React from 'react';

export interface IIconProps {
    name: string;
    component: React.ComponentType;
    path: string;
    active: boolean;
    disabled: boolean;
    deprecated: boolean;
    inverted: boolean;
}
