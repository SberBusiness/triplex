import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {isComponentType, isReactElement} from '@sberbusiness/triplex/utils/reactChild';
import React from 'react';

/**
 * Свойства компонента Row.
 * @prop {boolean} [paddingBottom] Вертикальный нижний отступ.
 * @prop {React.ReactNode} children Контент, отображаемый в компоненте.
 */
interface IRowProps extends React.HTMLAttributes<HTMLDivElement> {
    paddingBottom?: boolean;
}

/**
 * Компонент Row. Строка с нижним отступом, принимающая в children только колонки Col.
 */
export class Row extends React.Component<IRowProps> {
    public static displayName = 'Row';

    public static defaultProps = {
        paddingBottom: true,
    };

    public componentDidMount(): void {
        this.checkChildren(this.props.children);
    }

    public componentDidUpdate(): void {
        this.checkChildren(this.props.children);
    }

    public render(): JSX.Element {
        const {children, className, paddingBottom, ...htmlDivAttributes} = this.props;
        const cn = classnames(className, 'cssClass[row]', {'cssClass[noPaddingBottom]': !paddingBottom});
        return (
            <div className={cn} {...htmlDivAttributes}>
                {children}
            </div>
        );
    }

    /**
     * Проверка children-компонентов на нужный тип.
     * @param {React.ReactNode} [children] Чилдрены для проверки по названиям компонента.
     */
    private checkChildren = (children: React.ReactNode) => {
        React.Children.forEach(children, (child) => {
            if (isReactElement(child) && isComponentType(child.type) && child.type.displayName !== 'Col') {
                throw new Error('You can use only < Col /> elements');
            }
        });
    };
}
