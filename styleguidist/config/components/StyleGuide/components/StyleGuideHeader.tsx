import React from 'react';
import ThemeSwitcher from '../../../../common/components/ThemeSwitcher/ThemeSwitcher';
import cx from 'clsx';
import Version from 'react-styleguidist/lib/client/rsg-components/Version';
import {ETriplexTheme} from '@sberbusiness/triplex/components/ThemeProvider/ETriplexTheme';

interface IStyleGuideHeaderProps {
    version?: string;
    theme: ETriplexTheme;
    onChangeTheme: (newTheme: ETriplexTheme) => void;
}

const StyleGuideHeader: React.FC<IStyleGuideHeaderProps> = ({theme, onChangeTheme, version}) => (
    <header className={cx('styleguide-header', {mobileFixed: !document.location.hash.includes('List')})}>
        {/* Пустой элемент для удобства горизонтального центрирования версии внутри хэдера */}
        <span className="styleguide-header-left-col" />
        {<Version>{version}</Version>}
        <ThemeSwitcher theme={theme} onChangeTheme={onChangeTheme} />
    </header>
);

export default StyleGuideHeader;
