import * as React from 'react';
import {
    IWithTreeViewContextProps,
    TreeViewContext,
    withTreeViewContext,
} from '@sberbusiness/triplex/desktop/components/TreeView/TreeViewContext';
import {TreeViewAbstractNode} from '@sberbusiness/triplex/desktop/components/TreeView/TreeViewAbstractNode';
import {TreeViewAbstractNodeUtils} from '@sberbusiness/triplex/desktop/components/TreeView/TreeViewAbstractNodeUtils';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';

/**
 * Свойства передаваемые TreeViewNode в render-функцию children.
 *
 * @prop {boolean} activeNode - Текущая нода является активной при перемещении с клавиатуры.
 * @prop {boolean} openedNode - Состояние ноды - свернута/раскрыта.
 * @prop {boolean} hasChildNodes - Текущая нода имеет дочерние ноды.
 * @prop {Function} setOpenedNode - Функция смены значения opened.
 * @prop {boolean} isLastNode - Текущая нода является последней в дереве.
 */
export interface ITreeViewNodeProvideProps {
    activeNode: boolean;
    openedNode: boolean;
    hasChildNodes: boolean;
    setOpenedNode: (opened: boolean) => void;
    isLastNode: boolean;
}

/**
 * Свойства TreeViewNode.
 *
 * @param {Function} children - Render-функция дочерних элементов.
 * @param {string} id - Id ноды.
 * @param {boolean} [opened] - Состояние ноды - свернута/раскрыта.
 */
export interface ITreeViewNodeProps extends React.HTMLAttributes<HTMLLIElement> {
    children: (props: ITreeViewNodeProvideProps) => JSX.Element;
    id: string;
    opened?: boolean;
}

/**
 * Свойства TreeViewNodeWithContext.
 * ITreeViewNodeProps - передаются родительским компонентом.
 * IWithTreeViewContextProps - добавляются из withTreeViewContext.
 */
export interface ITreeViewNodePropsWithContext extends ITreeViewNodeProps, IWithTreeViewContextProps {}

/**
 * Базовый компонент ноды визуального дерева.
 * Добавляет нужную семантическую разметку.
 * Создает абстрактную ноду на основе текущей.
 * Обрабатывает события focus/blur для дальнейшего перемещения с клавиатуры по дереву.
 */
export class TreeViewNodeWithContext extends React.Component<ITreeViewNodePropsWithContext> {
    private containerDOMNode?: HTMLLIElement;
    // Абстрактная нода текущей ViewNode.
    private readonly abstractNode: TreeViewAbstractNode;

    constructor(props: ITreeViewNodePropsWithContext) {
        super(props);

        const {treeViewContext} = props;

        // Создание абстрактной ноды.
        this.abstractNode = new TreeViewAbstractNode({id: props.id});

        // Установка свойства opened ноды.
        treeViewContext.setOpenedNode(this.abstractNode, Boolean(props.opened));

        // Добавление абстрактной ноды в дерево.
        treeViewContext.registerNode(this.abstractNode, treeViewContext.parentNode);
    }

    public componentDidUpdate(prevProps: ITreeViewNodePropsWithContext): void {
        const {opened, treeViewContext} = this.props;
        const {opened: prevOpened} = prevProps;

        if (opened !== prevOpened) {
            treeViewContext.setOpenedNode(this.abstractNode, Boolean(opened));
        }
    }

    public componentWillUnmount(): void {
        // Удаление абстрактной ноды из дерева.
        this.props.treeViewContext.removeNode(this.abstractNode);
    }

    public render(): JSX.Element {
        const {children, className, opened, treeViewContext, ...props} = this.props;

        return (
            /* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
            <TreeViewContext.Provider value={{...treeViewContext, parentNode: this.abstractNode}}>
                <li
                    role="treeitem"
                    // tabIndex самой первой ноды дерева равен 0, все остальные -1.
                    tabIndex={this.abstractNode.getTabIndex()}
                    aria-expanded={this.abstractNode.getOpened()}
                    className={classnames('cssClass[treeViewNode]', className)}
                    {...props}
                    onBlur={this.handleBlur}
                    onFocus={this.handleFocus}
                    ref={this.setContainerDOMNode}
                >
                    {children({
                        activeNode: this.abstractNode.getActive(),
                        openedNode: this.abstractNode.getOpened(),
                        hasChildNodes: Boolean(this.abstractNode.getChildren().length),
                        setOpenedNode: this.setOpenedNode(),
                        isLastNode: TreeViewAbstractNodeUtils.isLastNode(this.abstractNode),
                    })}
                </li>
            </TreeViewContext.Provider>
        );
    }

    /**
     * Обработчик события blur.
     * Если нода была активна - становится неактивной.
     */
    private handleBlur = (event: React.FocusEvent<HTMLLIElement>) => {
        const {onBlur, treeViewContext} = this.props;

        // Предотвращает всплытие до родительской ноды.
        event.stopPropagation();
        treeViewContext.setActiveNode(this.abstractNode, false);
        onBlur?.(event);
    };

    /**
     * Обработчик события focus.
     * При всплытии фокуса до контейнера ноды - нода становится активной.
     */
    private handleFocus = (event: React.FocusEvent<HTMLLIElement>) => {
        const {onFocus, treeViewContext} = this.props;

        // Предотвращает всплытие до родительской ноды, чтобы активной стала текущая нода, а не ее родитель.
        event.stopPropagation();
        treeViewContext.setActiveNode(this.abstractNode, true);
        onFocus?.(event);
    };

    private setContainerDOMNode = (DOMNode: HTMLLIElement) => (this.containerDOMNode = DOMNode);

    /**
     * Устанавливает флаг opened ноды.
     */
    private setOpenedNode = () => (opened: boolean) => {
        this.props.treeViewContext.setOpenedNode(this.abstractNode, opened);
    };
}

export const TreeViewNode = withTreeViewContext<ITreeViewNodePropsWithContext>(TreeViewNodeWithContext);
