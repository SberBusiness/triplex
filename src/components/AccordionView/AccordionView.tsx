import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {
    AccordionViewHeader,
    IAccordionViewHeaderProps,
} from '@sberbusiness/triplex/components/AccordionView/components/AccordionViewHeader';
import {AccordionViewBody, IAccordionViewBodyProps} from '@sberbusiness/triplex/components/AccordionView/components/AccordionViewBody';
import {TestProps} from '@sberbusiness/triplex/types/CoreTypes';
import {IAccordionBodyProvideProps, IAccordionHeaderProvideProps} from '@sberbusiness/triplex/components/AccordionBase/types';
import {AccordionBase} from '../AccordionBase/protected/AccordionBase';

/** Свойства компонента AccordionView. */
interface AccordionViewPros extends React.HTMLAttributes<HTMLDivElement>, TestProps {
    children: [React.ReactElement<IAccordionViewHeaderProps>, React.ReactElement<IAccordionViewBodyProps>];
    /**
     * Флаг открытия/закрытия аккордеона, для внешнего управления.
     * Если пропс не передан, то управление открытием/закрытием происходит внутри компонента.
     */
    isOpen?: boolean;
    /**
     * Функция вызывающаяся после открытия/закрытия аккордеона пользователем.
     * isOpen - состояние открыт/закрыт после действий пользователя.
     */
    onToggle?: (isOpen: boolean) => void;
    /**
     * Функция вызывающаяся для открытия/закрытия аккордеона пользователем.
     * isOpen - состояние открыт/закрыт после действий пользователя.
     */
    toggle?: (isOpen: boolean) => void;
}

/** Компонент аккордеон, только для отображения пользователю информации. */
export class AccordionView extends React.Component<AccordionViewPros> {
    public static displayName = 'AccordionView';

    public static Header = AccordionViewHeader;
    public static Body = AccordionViewBody;

    public render(): JSX.Element {
        const {children, className, isOpen, onToggle, toggle, ...htmlAttributes} = this.props;

        return (
            <div {...htmlAttributes} className={classnames(className, 'cssClass[accordionView]')}>
                <AccordionBase
                    expandAnimationClassName="cssClass[accordionViewContent]"
                    renderBody={this.renderBody}
                    renderHeader={this.renderHeader}
                    isOpen={isOpen}
                    onToggle={onToggle}
                    toggle={toggle}
                />
            </div>
        );
    }

    private renderBody = (props: IAccordionBodyProvideProps) => {
        const [header, body] = this.props.children;
        return React.cloneElement(body, {...props});
    };

    private renderHeader = (props: IAccordionHeaderProvideProps) => {
        const [header] = this.props.children;
        return React.cloneElement(header, {...props});
    };
}
