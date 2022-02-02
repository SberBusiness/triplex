import React from 'react';
import deprecatedIcons from '@sberbusiness/icons/deprecated.json';
import deprecatedIllustrations from '@sberbusiness/illustrations/deprecated.json';

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
        .map(iconName => ({
            name: iconName,
            component: iconsModule[iconName],
            deprecated: (deprecatedIcons as string[]).includes(iconName) || (deprecatedIllustrations as string[]).includes(iconName)
        }));
};

export const renderIcon = (icon: IIcon) => {
    const IconComponent = icon.component;
    return (
        <div className="icon-item" key={icon.name}>
            <IconComponent />
            <div className={`icon-name${icon.deprecated ? ' deprecated' : ''}`}>{icon.name}</div>
        </div>
    );
};
