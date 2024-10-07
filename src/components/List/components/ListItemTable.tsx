import React from 'react';
import {SwipeableArea} from '@sberbusiness/triplex/components/SwipeableArea/SwipeableArea';
import {
    IListItemProps,
    ListItem,
    ListItemContent,
    ListItemControls,
    ListItemSelectable,
    ListItemTailRight,
} from '@sberbusiness/triplex/components/List';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

interface IListItemTableSelectableProps extends Omit<IListItemTableProps, 'selected' | 'onSelect'> {
    /** Обработчик изменения флага selected. */
    onSelect: (selected: boolean) => void;
    /** Флаг состояния selected. */
    selected: boolean;
}

interface IListItemTableProps extends Omit<IListItemProps, 'onSelect'> {
    /** Кнопки действий - <ListItemControlsButton ... /> */
    controlButtons?: React.ReactNode;
    /** Обработчик клика по контенту элемента списка. Событие onClick передается на контейнер контента. */
    onClickItem?: (event: React.MouseEvent<HTMLDivElement>) => void;
    /** Обработчик изменения флага selected. */
    onSelect?: never;
    /** Флаг состояния selected. */
    selected?: never;
}

/** Элемент списка, для отображения табличных данных. */
export const ListItemTable = React.forwardRef<HTMLLIElement, IListItemTableProps | IListItemTableSelectableProps>(
    ({children, className, controlButtons, onClickItem, onSelect, selected, ...rest}, ref) => {
        const selectable = typeof onSelect !== 'undefined' && typeof selected !== 'undefined';

        const renderContent = () => <ListItemContent onClick={onClickItem}>{children}</ListItemContent>;

        return (
            <ListItem className={classnames('cssClass[listItemTable]', className)} {...rest} ref={ref}>
                <SwipeableArea rightSwipeableArea={controlButtons ? <ListItemControls>{controlButtons}</ListItemControls> : undefined}>
                    <ListItemTailRight />

                    {selectable ? (
                        <ListItemSelectable selected={selected} onSelect={onSelect}>
                            {renderContent()}
                        </ListItemSelectable>
                    ) : (
                        renderContent()
                    )}
                </SwipeableArea>
            </ListItem>
        );
    }
);

ListItemTable.displayName = 'ListItemTable';
