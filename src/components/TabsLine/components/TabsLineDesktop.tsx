import React, {useEffect, useRef, useState} from 'react';
import {TestProps} from '@sberbusiness/triplex/types/CoreTypes';
import {TabsLineDropdown} from '@sberbusiness/triplex/components/TabsLine/components/TabsLineDropdown';
import {ITabsLineItemProps, TabsLineItem} from '@sberbusiness/triplex/components/TabsLine/components/TabsLineItem';
import {ITabsLineBase} from '@sberbusiness/triplex/components/TabsLine/types';
import {isKey} from '@sberbusiness/triplex/utils/keyboard';
import {isEqual} from 'lodash';

/** Свойства компонента TabsLineDesktop. */
export interface ITabsLineDesktopProps extends ITabsLineBase {
    /** Атрибуты кнопки дропдауна. */
    dropdownTargetHtmlAttributes?: React.HTMLAttributes<HTMLButtonElement> & TestProps;
    /** Максимальное число отображаемых табов. */
    maxVisible?: number;
}

export const TabsLineDesktop: React.FC<ITabsLineDesktopProps> = ({
    tabs,
    dropdownTargetHtmlAttributes,
    selectedTabId,
    onChangeTab,
    maxVisible,
}) => {
    const [inlineTabs, setInlineTabs] = useState<ITabsLineItemProps[]>([]);
    const [dropdownTabs, setDropdownTabs] = useState<ITabsLineItemProps[]>([]);

    const tabsRef = useRef<HTMLDivElement>(null);
    const focusableTabIndexRef = useRef(0);
    const inlineTabsRefs = useRef<HTMLButtonElement[]>([]);

    useEffect(() => {
        const newDropdownTabs: ITabsLineItemProps[] = [];
        const newInlineTabs: ITabsLineItemProps[] = [];

        tabs.forEach((item: ITabsLineItemProps, i: number) => {
            const collapsed = maxVisible && i + 1 >= maxVisible && tabs.length > maxVisible;
            const target = collapsed ? newDropdownTabs : newInlineTabs;

            target.push(item);
        });

        if (isEqual(newInlineTabs, inlineTabs) === false) {
            setInlineTabs(newInlineTabs);
        }

        if (isEqual(newDropdownTabs, dropdownTabs) === false) {
            setDropdownTabs(newDropdownTabs);
        }
    }, [tabs, maxVisible]);

    const renderInlineTab = ({selected, onClick, onFocus, onBlur, ...item}: ITabsLineItemProps, index: number) => {
        const tabIndex = focusableTabIndexRef.current === index ? 0 : -1;

        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            onChangeTab(item.id);
            onClick?.(event);
        };

        const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
            /** Является ли таб в фокусе последним перед дропдауном */
            const isLastInlineTab = inlineTabs.length - 1 === focusableTabIndexRef.current;

            if (isKey(event.code, 'ARROW_LEFT') || (isKey(event.code, 'ARROW_RIGHT') && !isLastInlineTab)) {
                /** Движение влево или вправо */
                const delta = isKey(event.code, 'ARROW_RIGHT') ? 1 : -1;

                /** Следующий таб, к которому переходим клавишей ArrowLeft/ArrowRight */
                const nextTabIndex = focusableTabIndexRef.current + delta;
                const nextTab = inlineTabsRefs.current[nextTabIndex];

                if (nextTab) {
                    event.preventDefault();
                    nextTab.focus();
                }
            }
        };

        const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
            focusableTabIndexRef.current = index;
            onFocus?.(event);
        };

        const handleBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
            focusableTabIndexRef.current = 0;
            onBlur?.(event);
        };

        const setRef = (node: HTMLButtonElement) => {
            inlineTabsRefs.current[index] = node;
        };

        return (
            <TabsLineItem
                key={item.id}
                selected={selectedTabId === item.id}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                tabIndex={tabIndex}
                onFocus={handleFocus}
                onBlur={handleBlur}
                {...item}
                ref={setRef}
            />
        );
    };

    const renderTabs = () => {
        const itemsToRender: JSX.Element[] = inlineTabs.map((item, index) => renderInlineTab(item, index));

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

    return tabs.length ? (
        <div className="cssClass[tabsLine]" ref={tabsRef}>
            {renderTabs()}
        </div>
    ) : null;
};
