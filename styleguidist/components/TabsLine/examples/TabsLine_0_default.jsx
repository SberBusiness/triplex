import React, {useState} from 'react';
import {TabsLine} from '@sberbusiness/triplex/components/TabsLine/TabsLine';

const [selectedTabId, setSelectedTabId] = useState('tabs-line-all');

const tabs = [
    {
        id: 'tabs-line-all',
        label: 'Все',
        'aria-label': 'Все',
        'data-test-id': 'TabsLine__All',
    },
    {
        id: 'tabs-line-draft',
        label: 'Черновики',
        'aria-label': 'Черновик',
        'data-test-id': 'TabsLine__Draft',
        showNotificationIcon: true,
    },
    {
        id: 'tabs-line-sign',
        label: 'На подпись и отправку',
        'aria-label': 'На подпись и отправку',
        'data-test-id': 'TabsLine__Sign',
    },
    {
        id: 'tabs-line-executed',
        label: 'Исполненные',
        'aria-label': 'Исполненные',
        'data-test-id': 'TabsLine__Executed',
    },
    {
        id: 'tabs-line-rejected',
        label: 'Отклоненные',
        'aria-label': 'Отклоненные',
        'data-test-id': 'TabsLine__Rejected',
    },
];

<TabsLine
    tabs={tabs}
    selectedTabId={selectedTabId}
    maxVisible={4}
    onChangeTab={setSelectedTabId}
    dropdownTargetHtmlAttributes={{
        'data-test-id': 'TabsLine__DropdownTarget',
    }}
/>