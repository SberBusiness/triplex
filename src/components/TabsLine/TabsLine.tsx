import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {MobileView} from '@sberbusiness/triplex/components/MobileView/MobileView';
import {ITabsLineDesktopProps, TabsLineDesktop} from '@sberbusiness/triplex/components/TabsLine/components/TabsLineDesktop';
import {TabsLineMobile} from '@sberbusiness/triplex/components/TabsLine/components/TabsLineMobile';

/** Состояние компонента TabsLine. */
export interface ITabsLineProps extends ITabsLineDesktopProps, React.HTMLAttributes<HTMLDivElement> {
    children?: never;
    /** Горизонтальный отступ от первого таба слева и последнего таба справа. */
    paddingX?: 0 | 4 | 8 | 12 | 16 | 24;
    /** Разделитель в виде нижнего бордера. */
    withSeparator?: boolean;
}

/** Компонент TabsLine. */
export const TabsLine: React.FC<ITabsLineProps> = ({
    className,
    dropdownTargetHtmlAttributes,
    maxVisible,
    onChangeTab,
    paddingX,
    selectedTabId,
    tabs,
    withSeparator,
    ...htmlDivAttributes
}) => {
    return (
        <div
            className={classnames(className, 'cssClass[tabsLineWrapper]', {
                'cssClass[withSeparator]': Boolean(withSeparator),
            })}
            {...htmlDivAttributes}
            data-paddingx-size={paddingX}
        >
            <MobileView
                fallback={
                    <TabsLineDesktop
                        tabs={tabs}
                        onChangeTab={onChangeTab}
                        selectedTabId={selectedTabId}
                        dropdownTargetHtmlAttributes={dropdownTargetHtmlAttributes}
                        maxVisible={maxVisible}
                    />
                }
            >
                <TabsLineMobile tabs={tabs} onChangeTab={onChangeTab} selectedTabId={selectedTabId} />
            </MobileView>
        </div>
    );
};
