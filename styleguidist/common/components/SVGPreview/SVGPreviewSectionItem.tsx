import React, {useRef} from 'react';
import cx from 'clsx';
import copy from 'clipboard-copy';
import {IIconProps} from './types';
import './styles/SVGPreviewSectionItem.less';

/** Свойства компонента SVGPreviewSectionItem. */
interface ISVGPreviewSectionItemProps {
    icon: IIconProps;
}

/** Элемент в компоненте SVGPreviewSection. */
export const SVGPreviewSectionItem = React.forwardRef<HTMLButtonElement, ISVGPreviewSectionItemProps>(({icon}, ref) => {
    const {name, component: Icon, path, active, disabled, deprecated, inverted} = icon;
    const itemRef = useRef<HTMLButtonElement | null>(null);
    const timeout = useRef<number>();

    const handleClick = () => {
        void copy(`import {${name}} from '${path}';`);
        itemRef.current!.classList.add('copied');
        clearTimeout(timeout.current);
        timeout.current = window.setTimeout(() => itemRef.current!.classList.remove('copied'), 1000);
    };

    /** Функция для хранения ссылки. */
    const setRef = (instance: HTMLButtonElement | null) => {
        itemRef.current = instance;
        if (typeof ref === 'function') {
            ref(instance);
        } else if (ref) {
            ref.current = instance;
        }
    };

    return (
        <button className={cx('svg-preview-section-item', {inverted})} onClick={handleClick} ref={setRef}>
            <div className={cx('svg-preview-section-item-target', 'hoverable', {active, disabled})}>
                <Icon />
            </div>
            <div className={cx('svg-preview-section-item-name', {deprecated})}>{name}</div>
        </button>
    );
});

SVGPreviewSectionItem.displayName = 'IconModuleSectionItem';
