import React from 'react';
import {AlertProcess} from '@sberbusiness/triplex/components/Alert/AlertProcess/AlertProcess';
import {EAlertType} from '@sberbusiness/triplex/components/Alert/EAlertType';
import {Gap} from '@sberbusiness/triplex/components/Gap/Gap';
import {UnorderedList} from '@sberbusiness/triplex/components/List/UnorderedList';

const items = [
    'Текст элемента списка',
    'Текст элемента списка',
    'Текст элемента списка',
];

<>
    <AlertProcess type={EAlertType.INFO}>
        Текст сообщения
        <Gap size={8} />
        <UnorderedList values={items} />
    </AlertProcess>
    <br />
    <AlertProcess type={EAlertType.WARNING}>
        Текст сообщения
        <Gap size={8} />
        <UnorderedList values={items} />
    </AlertProcess>
    <br />
    <AlertProcess type={EAlertType.ERROR}>
        Текст сообщения
        <Gap size={8} />
        <UnorderedList values={items} />
    </AlertProcess>
    <br />
    <AlertProcess type={EAlertType.FEATURE}>
        Текст сообщения
        <Gap size={8} />
        <UnorderedList values={items} />
    </AlertProcess>
</>