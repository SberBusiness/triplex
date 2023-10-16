import React from 'react';
import {ITreeViewNodeProps, ITreeViewNodeProvideProps} from '@sberbusiness/triplex/components/TreeView/components/TreeViewNode';
import {
    IAccordionBaseProps,
    IAccordionBodyProvideProps,
    IAccordionHeaderProvideProps,
} from '@sberbusiness/triplex/components/AccordionBase/types';
import {TreeView} from '@sberbusiness/triplex/components/TreeView/TreeView';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {AccordionBase} from '../../AccordionBase/protected/AccordionBase';

/**
 * Свойства, передаваемые CollapsableTreeNode в рендер-функцию renderBody.
 *
 * @prop {boolean} activeNode - Текущая нода является активной при перемещении с клавиатуры.
 * @prop {boolean} animating - В текущий момент происходит анимация открытия/закрытия.
 * @prop {boolean} hasChildNodes - Текущая нода имеет дочерние ноды.
 * @prop {boolean} opened - Текущая нода раскрыта.
 * @prop {Function} toggle - Функция смены значения opened.
 */
export interface ICollapsableTreeNodeBodyProvideProps
    extends Pick<IAccordionBodyProvideProps, 'animating'>,
        Pick<ITreeViewNodeProvideProps, 'activeNode' | 'hasChildNodes'> {
    opened: boolean;
    toggle: (opened: boolean) => void;
}

/**
 * Свойства, передаваемые CollapsableTreeNode в рендер-функцию renderHeader.
 *
 * @prop {boolean} activeNode - Текущая нода является активной при перемещении с клавиатуры.
 * @prop {boolean} animating - В текущий момент происходит анимация открытия/закрытия.
 * @prop {boolean} hasChildNodes - Текущая нода имеет дочерние ноды.
 * @prop {boolean} isLastNode - Текущая нода является последней в дереве.
 * @prop {boolean} opened - Текущая нода раскрыта.
 * @prop {Function} toggle - Функция смены значения opened.
 */
export interface ICollapsableTreeNodeHeaderProvideProps
    extends Pick<IAccordionHeaderProvideProps, 'animating'>,
        Pick<ITreeViewNodeProvideProps, 'activeNode' | 'hasChildNodes' | 'isLastNode'> {
    opened: boolean;
    toggle: (opened: boolean) => void;
}

/**
 * Свойства CollapsableTreeNode.
 *
 * @param {Function} renderBody - Render-функция дочерних нод.
 * @param {Function} renderHeader - Render-функция не сворачиваемой части ноды.
 * @prop {Function} [toggle] - Функция смены значения opened.
 * @prop {Function} [onToggle] - Функция, вызываемая после окончания анимации открытия/закрытия.
 */
export interface ICollapsableTreeNodeProps extends Omit<ITreeViewNodeProps, 'children'>, Pick<IAccordionBaseProps, 'onToggle' | 'toggle'> {
    children?: never;
    renderBody: (props: ICollapsableTreeNodeBodyProvideProps) => JSX.Element | JSX.Element[] | undefined;
    renderHeader: (props: ICollapsableTreeNodeHeaderProvideProps) => JSX.Element;
}

/**
 * Состояние CollapsableTreeNode.
 *
 * @param {boolean} controlled - Флаг, означающий, что состояние opened передается снаружи.
 */
interface ICollapsableTreeNodeState {
    controlled: boolean;
}

/**
 * Нода дерева CollapsableTree.
 * Является оберткой TreeView.Node.
 * Сворачиваться/разворачиваться может только если есть дочерние ноды. Они передаются в renderBody.
 */
export class CollapsableTreeNode extends React.Component<ICollapsableTreeNodeProps, ICollapsableTreeNodeState> {
    public static displayName = 'CollapsableTreeNode';

    state = {
        controlled: typeof this.props.opened !== 'undefined',
    };

    public render(): JSX.Element {
        const {opened: openedProps, onToggle, renderBody, renderHeader, toggle, ...treeNodeProps} = this.props;
        const {controlled} = this.state;

        return (
            <TreeView.Node opened={openedProps} {...treeNodeProps}>
                {(treeViewNodeProps) => {
                    const opened = controlled ? openedProps : treeViewNodeProps.openedNode;
                    return (
                        <AccordionBase
                            expandAnimationClassName={classnames('cssClass[collapsableTreeNodeContent]', {
                                'cssClass[collapsed]': !opened,
                            })}
                            renderBody={this.renderBody(treeViewNodeProps)}
                            renderHeader={this.renderHeader(treeViewNodeProps)}
                            isOpen={opened}
                            onToggle={onToggle}
                        />
                    );
                }}
            </TreeView.Node>
        );
    }

    /**
     * Изменяет состояния ноды - раскрыта/свернута.
     * Эта функция передается дочерним компонентам и вызывается из них.
     */
    private toggle = ({openedNode, setOpenedNode}: ITreeViewNodeProvideProps) => (nextOpened: boolean) => {
        const {controlled} = this.state;
        const {opened: openedProps, toggle} = this.props;
        const opened = controlled ? openedProps : openedNode;

        if (opened !== nextOpened) {
            controlled ? toggle?.(nextOpened) : setOpenedNode(nextOpened);
        }
    };

    /** Render-функция для передачи дочерних нод. */
    private renderBody = (treeViewNodeProvideProps: ITreeViewNodeProvideProps) => (
        accordionBodyProvideProps: IAccordionBodyProvideProps
    ) => {
        const {activeNode, openedNode, hasChildNodes} = treeViewNodeProvideProps;
        const {animating} = accordionBodyProvideProps;
        const {opened: openedProps, renderBody} = this.props;
        const {controlled} = this.state;

        // Внутренние ноды оборачиваются дополнительным тегом.
        if (treeViewNodeProvideProps.hasChildNodes) {
            return (
                <TreeView.Group>
                    {renderBody({
                        activeNode,
                        hasChildNodes,
                        animating,
                        opened: controlled ? openedProps! : openedNode,
                        toggle: this.toggle(treeViewNodeProvideProps),
                    })}
                </TreeView.Group>
            );
        }

        return renderBody({
            activeNode,
            hasChildNodes,
            animating,
            opened: controlled ? openedProps! : openedNode,
            toggle: this.toggle(treeViewNodeProvideProps),
        });
    };

    /** Render-функция не сворачиваемой части ноды. */
    private renderHeader = (treeViewNodeProvideProps: ITreeViewNodeProvideProps) => (
        accordionHeaderProvideProps: IAccordionHeaderProvideProps
    ) => {
        const {activeNode, openedNode, hasChildNodes, isLastNode} = treeViewNodeProvideProps;
        const {animating} = accordionHeaderProvideProps;
        const {opened: openedProps, renderHeader} = this.props;
        const {controlled} = this.state;

        return renderHeader({
            activeNode,
            hasChildNodes,
            animating,
            isLastNode,
            opened: controlled ? openedProps! : openedNode,
            toggle: this.toggle(treeViewNodeProvideProps),
        });
    };
}
