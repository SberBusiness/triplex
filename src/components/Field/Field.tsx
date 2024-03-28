import React from 'react';
import {isComponentType, isReactElement} from '@sberbusiness/triplex/utils/reactChild';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства компонента Field. */
interface IFieldProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Выравнивание лейбла относительно input или select (добавление верхнего отступа). */
    alignLabel?: boolean;
}

/** Поле с количеством колонок от одной до трех. */
export class Field extends React.Component<IFieldProps> {
    public static displayName = 'Field';

    public componentDidMount(): void {
        this.checkChildren(this.props.children);
    }

    public componentDidUpdate(): void {
        this.checkChildren(this.props.children);
    }

    public render(): React.ReactNode {
        const {alignLabel, children, className, ...htmlDivAttributes} = this.props;
        const fieldClassNames = classnames(className, 'cssClass[field]', {'cssClass[alignLabel]': Boolean(alignLabel)});

        return (
            <div className={fieldClassNames} {...htmlDivAttributes}>
                {children}
            </div>
        );
    }

    /**
     * Проверка children-компонентов на нужный тип.
     * @param {React.ReactNode} [children] Чилдрены для проверки по названиям компонента.
     */
    private checkChildren = (children: React.ReactNode) => {
        if (React.Children.count(children) > 3) {
            throw new Error('You can use maximum three elements');
        }
        React.Children.forEach(children, (child) => {
            if (isReactElement(child) && isComponentType(child.type) && child.type.displayName !== 'Col') {
                throw new Error('You can use only < Col /> elements');
            }
        });
    };
}
