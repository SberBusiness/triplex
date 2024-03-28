import {isComponentType, isReactElement} from '@sberbusiness/triplex/utils/reactChild';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import React from 'react';

/** Свойства компонента SubRow. */
interface ISubRowProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Компонент SubRow. Подстрока с небольшим отступом, принимающая в children только колонки Col. */
export class SubRow extends React.Component<ISubRowProps> {
    public static displayName = 'SubRow';

    public componentDidMount(): void {
        this.checkChildren(this.props.children);
    }

    public componentDidUpdate(): void {
        this.checkChildren(this.props.children);
    }

    public render(): React.ReactNode {
        const {children, className} = this.props;
        return <div className={classnames(className, 'cssClass[subRow]')}>{children}</div>;
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
