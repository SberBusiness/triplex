import React from 'react';
import {AlertProcess} from '@sberbusiness/triplex/components/Alert/AlertProcess/AlertProcess';
import {EAlertType} from '@sberbusiness/triplex/components/Alert/EAlertType';

const renderHeader = () => <AlertProcess.Header>Текст заголовка</AlertProcess.Header>;

<>
    <AlertProcess type={EAlertType.INFO} renderHeader={renderHeader}>
        Текст сообщения
    </AlertProcess>
    <br />
    <AlertProcess type={EAlertType.WARNING} renderHeader={renderHeader}>
        Текст сообщения
    </AlertProcess>
    <br />
    <AlertProcess type={EAlertType.ERROR} renderHeader={renderHeader}>
        Текст сообщения
    </AlertProcess>
    <br />
    <AlertProcess type={EAlertType.FEATURE} renderHeader={renderHeader}>
        Текст сообщения
    </AlertProcess>
</>