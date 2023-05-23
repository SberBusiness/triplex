import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {Col} from '@sberbusiness/triplex/desktop/components/Col/Col';
import {isComponentType, isReactElement} from '@sberbusiness/triplex/desktop/utils/reactChild';
import * as React from 'react';

/**
 * Свойства компонента Field.
 * @prop {React.ReactElement} children Чилдрены. принимает максимум три <Col/>.
 * @prop {boolean} [alignLabel] Выравнивание лейбла относительно input или select(добавление верхнего отступа).
 */
interface IFieldProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    alignLabel?: boolean;
}

/**
 * Компонент Field. Поле с количеством колонок от одной до трех.
 */
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
