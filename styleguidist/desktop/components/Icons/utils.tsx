import React from 'react';
import deprecatedIcons from '@sberbusiness/icons/deprecated.json';
import deprecatedIllustrations from '@sberbusiness/illustrations/deprecated.json';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';

interface IIcon {
    name: string;
    component: React.ComponentType;
    deprecated: boolean;
}

export const getIconsFromModule = (iconsModule: any) => {
    const iconsNames = Object.keys(iconsModule);

    return iconsNames
        .sort((iconA, iconB) => {
            const sizeA = Number(iconA.match(/\d+$/)![0]);
            const sizeB = Number(iconB.match(/\d+$/)![0]);

            return sizeA - sizeB;
        })
        .map((iconName) => ({
            name: iconName,
            component: iconsModule[iconName],
            deprecated: (deprecatedIcons as string[]).includes(iconName) || (deprecatedIllustrations as string[]).includes(iconName)
        }));
};

export const renderIcon = (icon: IIcon, status: {active: boolean; disabled: boolean}): React.ReactNode => {
    const {name, component: Icon, deprecated} = icon;
    const {active, disabled} = status;
    const className = classnames('icon-item', 'hoverable', {deprecated, active, disabled});

    return (
        <div key={name} className={className}>
            <Icon />
            <span className="icon-name">{name}</span>
        </div>
    );
};
