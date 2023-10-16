import React from 'react';
import {isComponentType, isReactElement} from '@sberbusiness/triplex/utils/reactChild';
import {AccordionFormItem, IAccordionItemProps} from '@sberbusiness/triplex/components/AccordionForm/AccordionFormItem';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {glueFunctions} from '@sberbusiness/triplex/utils/glueFunctions';
import {EStepStatus} from '@sberbusiness/triplex/components/Step/enums';

/**
 * Свойства компонента аккордеона.
 *
 * Обработчики закрытия/удаления вызываются с индексом либо идентификатором вкладки (если идентификатор был передан).
 * Так же можно отдельно обработчики закрытия и удаления навешивать на отдельные вкладки.
 */
export interface IAccordionProps extends React.HTMLAttributes<HTMLUListElement> {
    /** Обработчик открытия/закрытия вкладки. */
    onToggle?: (newOpened: boolean, id: string) => void;
    /** Обработчик удаления вкладки. */
    onRemove?: (id: string) => void;
}

/**
 * Проверка и каст текущего реакт - элемента.
 * @param {React.ReactNode} item Нода реакта для проверки.
 */
const checkItem = (item: React.ReactNode): item is React.ReactElement<IAccordionItemProps> => {
    return isReactElement(item) && isComponentType(item.type) && item.type === AccordionFormItem;
};

/**
 * Компонент аккордеона.
 */
export class AccordionForm extends React.PureComponent<IAccordionProps> {
    public static displayName = 'AccordionForm';
    public static Item = AccordionFormItem;

    public render(): React.ReactNode {
        const {className, onRemove, onToggle, children, ...rest} = this.props;
        let content = children;
        let hasSingleChild = false;

        if (children) {
            if (checkItem(children)) {
                hasSingleChild = true;
                content = React.cloneElement<IAccordionItemProps>(children, {
                    onRemove: glueFunctions(children.props.onRemove, onRemove),
                    onToggle: glueFunctions(children.props.onToggle, onToggle),
                });
            } else if (children instanceof Array) {
                hasSingleChild = children.length === 1;
                const childArray = new Array<React.ReactElement<IAccordionItemProps> | null>(children.length);
                for (let i = 0, n = children.length, lastIdx = n - 1; i < n; i++) {
                    const child = children[i];

                    const prevChild = i > 0 ? children[i - 1] : undefined;
                    let prevStatus: EStepStatus | undefined;
                    if (checkItem(prevChild)) {
                        prevStatus = prevChild.props.status;
                    }

                    const nextChild = i < lastIdx ? children[i + 1] : undefined;
                    let nextStatus: EStepStatus | undefined;
                    if (checkItem(nextChild)) {
                        nextStatus = nextChild.props.status;
                    }

                    // Пустые ноды допустимы.
                    if (child) {
                        if (checkItem(child)) {
                            childArray[i] = React.cloneElement<IAccordionItemProps>(child, {
                                num: child.props.num || i + 1,
                                id: child.props.id || i.toString(),
                                key: child.props.id || i,
                                prevStatus,
                                nextStatus,
                                onRemove: glueFunctions(child.props.onRemove, onRemove),
                                onToggle: glueFunctions(child.props.onToggle, onToggle),
                            });
                        } else {
                            throw new Error('You can use as children only AccordionFormItem components');
                        }
                    } else {
                        childArray[i] = null;
                    }
                }
                content = childArray;
            } else {
                throw new Error('You can use as children only AccordionFormItem components');
            }
        }

        return (
            <ul {...rest} className={classnames(className, 'cssClass[accordion]', {'cssClass[single]': hasSingleChild})} style={{}}>
                {content}
            </ul>
        );
    }
}
