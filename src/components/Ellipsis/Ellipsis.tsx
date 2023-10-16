import React from 'react';
import {isOnlyIE} from '@sberbusiness/triplex/utils/userAgentUtils';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {EllipsisForIE} from './protected/EllipsisForIE';

export interface IEllipsisProps extends React.HTMLProps<HTMLDivElement> {
    /** Текст который нужно свернуть в троеточие. */
    children: React.ReactText;
    /** Количество строк после которых происходит сворачивание в троеточие. */
    maxLine: number;
}

/**
 * Компонент, для сворачивания в троеточие текста, который не поместился в заданное количество строк.
 * Данному компоненту нельзя устанавливать паддинги, так как во всех браузерах кроме IE реализация через css свойство line-clamp,
 * и если установить паддинги то в них будет видно часть спрятанного текста.
 */
export class Ellipsis extends React.Component<IEllipsisProps> {
    static displayName = 'Ellipsis';

    private ref: HTMLDivElement | null = null;

    componentDidMount(): void {
        this.setCssVar();
    }

    componentDidUpdate(prevProps: IEllipsisProps): void {
        if (this.props.maxLine != prevProps.maxLine) {
            this.setCssVar();
        }
    }

    private setCssVar = (): void => {
        const {maxLine} = this.props;
        if (!isOnlyIE && this.ref) {
            this.ref.style.setProperty('--ellipsis-line-clamp', maxLine.toString());
        }
    };

    private setRef = (el: HTMLDivElement) => {
        this.ref = el;
    };

    render(): JSX.Element {
        if (isOnlyIE) {
            const {children, ref, ...rest} = this.props;
            return <EllipsisForIE {...rest}>{children}</EllipsisForIE>;
        } else {
            const {children, maxLine, className, ...rest} = this.props;
            const ellipsisClassName = classnames(className, 'cssClass[ellipsisLineClamp]', {'cssClass[oneLine]': maxLine === 1});

            return (
                <div {...rest} className={ellipsisClassName} ref={this.setRef}>
                    {children}
                </div>
            );
        }
    }
}
