import * as React from 'react';
import {IAccordionBodyProvideProps, IAccordionHeaderProvideProps} from '@sberbusiness/triplex/desktop/components/AccordionBase/types';
import {WidgetHeader} from './components/WidgetHeader/WidgetHeader';
import {WidgetBody} from './protected/WidgetBody/WidgetBody';
import {WidgetFooter} from './protected/WidgetFooter/WidgetFooter';
import {AccordionBase} from '../AccordionBase/protected/AccordionBase';
import {IWidgetBodyProvideProps, IWidgetFooterProvideProps, IWidgetHeaderProvideProps} from './types';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';

interface IWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
    /** @prop {boolean} [isOpen] Флаг открыт/закрыт, для контролируемого виджета. */
    isOpen?: boolean;
    /** @prop {boolean} [isStatic] Флаг несворачиваемости виджета. */
    isStatic?: boolean;
    /** @prop {Function} [onToggle] Обработчик открытия/закрытия. */
    onToggle?: (isOpen: boolean) => void;
    /** @prop {Function} renderBody Рендер-функция Body. */
    renderBody: (props: IWidgetBodyProvideProps) => JSX.Element;
    /** @prop {Function} [renderFooter] Рендер-функция Footer. */
    renderFooter?: (props: IWidgetFooterProvideProps) => JSX.Element;
    /** @prop {Function} renderHeader Рендер-функция Header. */
    renderHeader: (props: IWidgetHeaderProvideProps) => JSX.Element;
    /** @prop {Function} [toggle] Функция изменения флага isOpen, для контролируемого виджета. */
    toggle?: (isOpen: boolean) => void;
}

export class Widget extends React.Component<IWidgetProps> {
    public static displayName = 'Widget';

    public static Header = WidgetHeader;
    public static Body = WidgetBody;
    public static Footer = WidgetFooter;

    public render(): React.ReactElement {
        const {className, isOpen, isStatic, onToggle, toggle} = this.props;
        return (
            <div className={classnames(className, 'cssClass[widget]')} {...this.getHtmlDivAttributes()}>
                <AccordionBase
                    expandAnimationClassName="cssClass[widgetContent]"
                    renderBody={this.renderAccordionBody}
                    renderHeader={this.renderAccordionHeader}
                    isOpen={isStatic ? true : isOpen}
                    onToggle={onToggle}
                    toggle={toggle}
                />
            </div>
        );
    }

    private getHtmlDivAttributes = (): React.HTMLAttributes<HTMLDivElement> => {
        const {className, isOpen, onToggle, renderBody, renderFooter, renderHeader, toggle, isStatic, ...htmlDivAttributes} = this.props;
        return htmlDivAttributes;
    };

    private renderAccordionBody = (props: IAccordionBodyProvideProps) => {
        const {renderBody, renderFooter} = this.props;
        return (
            <div>
                {renderBody({...props, widgetWithoutFooter: !renderFooter})}
                {/* {} - это задел на будущее, когда захотим что-то передавать из Widget в WidgetFooter. */}
                {renderFooter ? renderFooter({}) : null}
            </div>
        );
    };

    private renderAccordionHeader = (props: IAccordionHeaderProvideProps) => {
        const {renderHeader, isStatic} = this.props;
        return renderHeader({
            ...props,
            toggle: isStatic ? undefined : props.toggle,
            isStatic: Boolean(isStatic),
        });
    };
}
