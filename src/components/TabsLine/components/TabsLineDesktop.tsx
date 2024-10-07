import React from 'react';
import isEqual from 'lodash.isequal';
import {TestProps} from '@sberbusiness/triplex/types/CoreTypes';
import {TabsLineDropdown} from '@sberbusiness/triplex/components/TabsLine/components/TabsLineDropdown';
import {ITabsLineItemProps, TabsLineItem} from '@sberbusiness/triplex/components/TabsLine/components/TabsLineItem';
import {ITabsLineBase} from '@sberbusiness/triplex/components/TabsLine/types';

/** Свойства компонента TabsLineDesktop. */
export interface ITabsLineDesktopProps extends ITabsLineBase {
    /** Атрибуты кнопки дропдауна. */
    dropdownTargetHtmlAttributes?: React.HTMLAttributes<HTMLButtonElement> & TestProps;
    /** Максимальное число отображаемых табов. */
    maxVisible?: number;
}

/** Состояние компонента TabsLineDesktop. */
interface ITabsLineDesktopState {
    /** Табы, отображаемые в дропдауне. */
    dropdownTabs: ITabsLineItemProps[];
    /** Видимые табы. */
    inlineTabs: ITabsLineItemProps[];
}

/** Компонент TabsLineDesktop. */
export class TabsLineDesktop extends React.PureComponent<ITabsLineDesktopProps, ITabsLineDesktopState> {
    public static displayName = 'TabsLineDesktop';

    constructor(props: ITabsLineDesktopProps) {
        super(props);

        this.state = this.calculateState();
    }

    public componentDidUpdate(prevProps: ITabsLineDesktopProps): void {
        const isUpdateRequired = !isEqual(this.props.tabs, prevProps.tabs) || this.props.maxVisible !== prevProps.maxVisible;
        if (isUpdateRequired) {
            this.setState(this.calculateState());
        }
    }

    public render() {
        const {tabs} = this.props;

        return tabs.length ? <div className="cssClass[tabsLine]">{this.renderTabs()}</div> : null;
    }

    private calculateState = (): ITabsLineDesktopState => {
        const {tabs, maxVisible} = this.props;

        const dropdownTabs: ITabsLineItemProps[] = [];
        const inlineTabs: ITabsLineItemProps[] = [];

        tabs.forEach((item: ITabsLineItemProps, i: number) => {
            const fromDropdown = maxVisible && i + 1 >= maxVisible && tabs.length > maxVisible;
            const target = fromDropdown ? dropdownTabs : inlineTabs;

            target.push(item);
        });

        return {
            dropdownTabs,
            inlineTabs,
        };
    };

    private renderTab = ({selected, ...item}: ITabsLineItemProps) => {
        const {onChangeTab, selectedTabId} = this.props;

        const handleClick = (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
            onChangeTab(item.id);
            item.onClick?.(event);
        };

        return <TabsLineItem key={item.id} selected={selectedTabId === item.id} {...item} onClick={handleClick} />;
    };

    private renderTabs = () => {
        const {dropdownTargetHtmlAttributes, selectedTabId, onChangeTab} = this.props;
        const {dropdownTabs, inlineTabs} = this.state;

        const itemsToRender: JSX.Element[] = inlineTabs.map(this.renderTab);

        if (dropdownTabs.length > 0) {
            const selectedTab = dropdownTabs.find((item) => item.id === selectedTabId);
            const dropdownLabel = selectedTab ? selectedTab.label : dropdownTabs[0].label;

            itemsToRender.push(
                <TabsLineDropdown
                    key="TabsLineDropdown"
                    tabs={dropdownTabs}
                    isActive={selectedTab !== undefined}
                    label={dropdownLabel}
                    onClickTab={(item) => onChangeTab(item.id)}
                    selected={selectedTab}
                    targetHtmlAttributes={dropdownTargetHtmlAttributes}
                />
            );
        }

        return itemsToRender;
    };
}
