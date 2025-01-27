import React, {useState} from 'react';
import {TabsLine} from '@sberbusiness/triplex/components/TabsLine/TabsLine';

const [selectedTabId, setSelectedTabId] = useState('tabs-line-all-with-separator');

const tabs = [
    {
        id: 'tabs-line-all-with-separator',
        label: 'Все',
    },
    {
        id: 'tabs-line-draft-with-separator',
        label: 'Черновики',
        showNotificationIcon: true,
    },
    {
        id: 'tabs-line-sign-with-separator',
        label: 'На подпись и отправку',
    },
    {
        id: 'tabs-line-executed-with-separator',
        label: 'Исполненные',
    },
    {
        id: 'tabs-line-rejected-with-separator',
        label: 'Отклоненные',
    },
];

<TabsLine
    tabs={tabs}
    selectedTabId={selectedTabId}
    maxVisible={4}
    onChangeTab={setSelectedTabId}
    withSeparator
/>