import React from 'react';
import ReactDOM from 'react-dom';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {FooterDescription} from '@sberbusiness/triplex/components/Footer/components/FooterDescription';
import {TableFooterSummary} from '@sberbusiness/triplex/components/Tables/TableFooter/components/TableFooterSummary';
import {isIE} from '@sberbusiness/triplex/utils/userAgentUtils';
import {FooterDescriptionControls} from '@sberbusiness/triplex/components/Footer/components/FooterDescriptionControls';

/** Свойства компонента TableFooter. */
interface ITableFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Состояние загрузки. */
    isLoading?: boolean;
}

/** Состояние компонента TableFooter. */
interface ITableFooterState {
    /** Ширина подвала в пикселях. */
    footerWidth: number;
    /** Фиксированное позиционирование (прижат к низу окна). */
    isFixed: boolean;
}

/** Компонент подвала таблицы. */
export class TableFooter extends React.PureComponent<ITableFooterProps, ITableFooterState> {
    public static displayName = 'TableFooter';

    state = {
        footerWidth: 0,
        isFixed: false,
    };

    public static Summary = TableFooterSummary;
    public static Controls = FooterDescriptionControls;

    public componentDidMount(): void {
        if (isIE) {
            document.addEventListener('scroll', this.updateFooterStyle);
            this.updateFooterStyle();
        }
    }

    public componentWillUnmount(): void {
        isIE && document.removeEventListener('scroll', this.updateFooterStyle);
    }

    render(): JSX.Element {
        const {isFixed, footerWidth} = this.state;
        const {children, className, isLoading, ...htmlDivAttributes} = this.props;

        const footerWrapperClassName = classnames(className, 'cssClass[tableFooterWrapper]', {'cssClass[ieBrowser]': isIE});
        const footerClassName = classnames('cssClass[tableFooter]', {'cssClass[fixed]': isIE && isFixed});
        const footerStyle = isIE && isFixed ? {width: `${footerWidth}px`} : undefined;

        return (
            <div className={footerWrapperClassName} {...htmlDivAttributes}>
                <div className={footerClassName} style={footerStyle}>
                    <FooterDescription>{children}</FooterDescription>
                </div>
            </div>
        );
    }

    /** Перерасчёт стилей (позиционирования и ширины) футера. Только для IE. */
    private updateFooterStyle = () => {
        // eslint-disable-next-line react/no-find-dom-node
        const footerWrapper = ReactDOM.findDOMNode(this) as Element;
        if (!footerWrapper) {
            return;
        }

        const footer = footerWrapper.firstElementChild;
        const table = footerWrapper.previousElementSibling;
        if (!footer || !table) {
            return;
        }

        const rectFooter = footer.getBoundingClientRect();
        const rectTable = table.getBoundingClientRect();

        const isFixed = rectTable.bottom + rectFooter.height > window.innerHeight;

        this.setState((prevState) => ({
            footerWidth: isFixed && !this.state.isFixed ? rectTable.width : prevState.footerWidth,
            isFixed: isFixed,
        }));
    };
}
