import React from 'react';
import {IWithTreeViewContextProps, TreeViewContext, withTreeViewContext} from '@sberbusiness/triplex/components/TreeView/TreeViewContext';
import {TreeViewAbstractNode} from '@sberbusiness/triplex/components/TreeView/TreeViewAbstractNode';
import {TreeViewAbstractNodeUtils} from '@sberbusiness/triplex/components/TreeView/TreeViewAbstractNodeUtils';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/** Свойства передаваемые TreeViewNode в render-функцию children. */
export interface ITreeViewNodeProvideProps {
    /** Текущая нода является активной при перемещении с клавиатуры. */
    activeNode: boolean;
    /** Состояние ноды - свернута/раскрыта. */
    openedNode: boolean;
    /** Текущая нода имеет дочерние ноды. */
    hasChildNodes: boolean;
    /** Функция смены значения opened. */
    setOpenedNode: (opened: boolean) => void;
    /** Текущая нода является последней в дереве. */
    isLastNode: boolean;
}

/** Свойства компонента TreeViewNode. */
export interface ITreeViewNodeProps extends Omit<React.HTMLAttributes<HTMLLIElement>, 'children'> {
    /** Render-функция дочерних элементов. */
    children: (props: ITreeViewNodeProvideProps) => JSX.Element;
    /** Идентификатор ноды. */
    id: string;
    /** Состояние ноды - свернута/раскрыта. */
    opened?: boolean;
    /** Идентификатор следующей ноды. */
    nextNodeId?: string;
    /** Идентификатор предыдущей ноды. */
    prevNodeId?: string;
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

        let prevNode;
        if (props.prevNodeId) {
            prevNode = TreeViewAbstractNodeUtils.getNode(props.prevNodeId, treeViewContext.parentNode);
        }

        let nextNode;
        if (props.nextNodeId) {
            nextNode = TreeViewAbstractNodeUtils.getNode(props.nextNodeId, treeViewContext.parentNode);
        }

        // Добавление абстрактной ноды в дерево.
        treeViewContext.registerNode(this.abstractNode, treeViewContext.parentNode, prevNode, nextNode);
    }

    public componentDidUpdate(prevProps: ITreeViewNodePropsWithContext): void {
        const {opened, treeViewContext} = this.props;
        const {opened: prevOpened} = prevProps;

        if (opened !== prevOpened) {
            treeViewContext.setOpenedNode(this.abstractNode, Boolean(opened));
        }
    }

    public componentWillUnmount(): void {
        const {treeViewContext} = this.props;
        // Удаление абстрактной ноды из дерева.
        treeViewContext.removeNode(this.abstractNode);
    }

    public render(): JSX.Element {
        const {children, className, nextNodeId, opened, prevNodeId, treeViewContext, ...props} = this.props;

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
                        hasChildNodes: Boolean(this.abstractNode.getChildren().length),
                        isLastNode: TreeViewAbstractNodeUtils.isLastNode(this.abstractNode),
                        openedNode: this.abstractNode.getOpened(),
                        setOpenedNode: this.setOpenedNode(),
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

    /** Устанавливает флаг opened ноды. */
    private setOpenedNode = () => (opened: boolean) => {
        this.props.treeViewContext.setOpenedNode(this.abstractNode, opened);
    };
}

export const TreeViewNode = withTreeViewContext<ITreeViewNodePropsWithContext>(TreeViewNodeWithContext);
