import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента Ellipsis. */
export interface IEllipsisProps extends React.HTMLProps<HTMLDivElement> {
    /** Текст который нужно свернуть в многоточие. */
    children: React.ReactText;
    /** Количество строк после которых происходит сворачивание в многоточие. */
    maxLine: number;
}

/**
 * Компонент, для сворачивания в многоточие текста, который не поместился в заданное количество строк.
 * Данному компоненту нельзя устанавливать паддинги, так как реализация через CSS свойство line-clamp, и если установить паддинги то в них
 * будет видно часть спрятанного текста.
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
        if (this.ref) {
            this.ref.style.setProperty('--ellipsis-line-clamp', maxLine.toString());
        }
    };

    private setRef = (instance: HTMLDivElement) => {
        this.ref = instance;
    };

    render(): JSX.Element {
        const {children, className, maxLine, ...rest} = this.props;
        const classNames = classnames('cssClass[ellipsisLineClamp]', {'cssClass[oneLine]': maxLine === 1}, className);

        return (
            <div className={classNames} {...rest} data-tx={process.env.npm_package_version} ref={this.setRef}>
                {children}
            </div>
        );
    }
}
