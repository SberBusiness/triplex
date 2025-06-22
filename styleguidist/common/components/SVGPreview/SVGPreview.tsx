import React from 'react';
import deprecatedIcons from '@sberbusiness/icons/deprecated.json';
import deprecatedIllustrations from '@sberbusiness/illustrations/deprecated.json';
import {StringUtils} from '@sberbusiness/triplex/utils/stringUtils';
import {SVGPreviewSection} from './SVGPreviewSection';
import {invertedIcons} from './icons';
import {IIconProps} from './types';

/** Свойства компонента SVGPreview. */
interface ISVGPreviewProps {
    value: Record<string, React.ComponentType>;
    folder: 'icons' | 'illustrations';
    category?: string;
    status?: {
        active?: boolean;
        disabled?: boolean;
    };
}

/** Превью модуля с иконками/иллюстрациями. */
export const SVGPreview: React.FC<ISVGPreviewProps> = ({value, folder, status}) => {
    const icons: IIconProps[] = getIconsFromModule();
    const [sizes, iconsList] = mapIconsToSections();

    function getIconsFromModule(): IIconProps[] {
        const {active, disabled} = {active: false, disabled: false, ...status};

        return Object.keys(value).map((name) => ({
            active,
            component: value[name],
            deprecated: (deprecatedIcons as string[]).includes(name) || (deprecatedIllustrations as string[]).includes(name),
            disabled,
            inverted: invertedIcons.includes(name),
            name,
            path: `@sberbusiness/${folder}/${name}`,
        }));
    }

    function mapIconsToSections(): [number[], IIconProps[][]] {
        const iconObj: Record<string, Record<string, IIconProps>> = {};
        const sizeSet = new Set<number>();

        for (let i = 0, len = icons.length; i < len; i++) {
            const [restPart, sizePart] = splitIconName(icons[i].name);
            const size = Number(sizePart);

            if (!(sizePart in iconObj)) {
                iconObj[sizePart] = {};
            }

            iconObj[sizePart][restPart] = icons[i];

            sizeSet.add(size);
        }

        const sizes = Array.from(sizeSet).sort((a, b) => a - b);
        const data = Object.keys(iconObj).map((sizePart) => Object.keys(iconObj[sizePart]).map((restPart) => iconObj[sizePart][restPart]));

        return [sizes, data];
    }

    function splitIconName(name: string): string[] {
        let i = name.length;

        while (i > 0) {
            if (StringUtils.isDigit(name[i - 1]) === false) {
                break;
            }
            i--;
        }

        return [name.substring(0, i), name.substring(i)];
    }

    return (
        <div className="svg-preview">
            {iconsList.map((icons, index) => (
                <SVGPreviewSection key={`svg-preview-grid-block-${index}`} icons={icons} size={sizes[index]} />
            ))}
        </div>
    );
};
