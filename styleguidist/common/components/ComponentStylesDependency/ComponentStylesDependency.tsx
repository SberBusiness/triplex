import React from 'react';
import Pathline from 'react-styleguidist/lib/client/rsg-components/Pathline/PathlineRenderer';
import StyleguidistAccordion from '../StyleguidistAccordion/StyleguidistAccordion';
import {EComponentType, getCSSBundlesFromComponentTitle} from '../../MapComponentToCSSBundle';
import './styles.less';

interface IComponentStylesDependencyProps {
    children?: never;
    className?: string;
    componentTitle: string;
    isMobileComponent: boolean;
}

/** Отображает список CSS бандлов необходимых для текущего компонента. */
const ComponentStylesDependency: React.FC<IComponentStylesDependencyProps> = ({componentTitle, className = '', isMobileComponent}) => {
    const renderBody = () => {
        // Массив путей к CSS бандлам.
        const paths = getCSSBundlesFromComponentTitle(componentTitle, isMobileComponent ? EComponentType.MOBILE : EComponentType.DESKTOP);

        return (
            <div className="content">
                Для корректного отображения компонента подключите общий файл стилей @sberbusiness/triplex:
                <Pathline>@sberbusiness/triplex/styles/{isMobileComponent ? 'mobile' : 'desktop'}/styles.css</Pathline>
                {paths.length ? (
                    <>
                        Или следующие файлы:
                        {paths.map((path) => (
                            <Pathline key={path}>{path}</Pathline>
                        ))}
                    </>
                ) : null}
            </div>
        );
    };

    return (
        <div className={`styles-dependency ${className}`}>
            <StyleguidistAccordion title="CSS зависимости">{renderBody}</StyleguidistAccordion>
        </div>
    );
};

export default ComponentStylesDependency;
