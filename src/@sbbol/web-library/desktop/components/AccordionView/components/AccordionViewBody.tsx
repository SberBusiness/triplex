import * as React from 'react';
import {IAccordionBodyProvideProps} from '@sbbol/web-library/desktop/components/AccordionBase/types';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';

/**
 * Свойства компонента.
 */
export interface IAccordionViewBodyProps extends Partial<IAccordionBodyProvideProps>, React.HTMLAttributes<HTMLDivElement> {}

/**
 * Тело компонента аккордеон.
 */
export class AccordionViewBody extends React.PureComponent<IAccordionViewBodyProps> {
    public static displayName = 'AccordionViewBody';

    public render(): JSX.Element {
        const {children, className} = this.props;
        return (
            <div className={classnames(className, 'cssClass[accordionViewBody]')} {...this.getHtmlDivAttributes()}>
                {children}
            </div>
        );
    }

    private getHtmlDivAttributes = (): React.HTMLAttributes<HTMLDivElement> => {
        const {animating, className, isOpen, toggle, ...htmlDivAttributes} = this.props;
        return htmlDivAttributes;
    };
}
