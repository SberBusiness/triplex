import React from 'react';
import {AlertProcess} from '@sberbusiness/triplex/components/Alert/AlertProcess/AlertProcess';
import {EAlertType} from '@sberbusiness/triplex/components/Alert/EAlertType';

<>
    <AlertProcess type={EAlertType.INFO}>
        Текст сообщения
    </AlertProcess>
    <br />
    <AlertProcess type={EAlertType.WARNING}>
        Текст сообщения
    </AlertProcess>
    <br />
    <AlertProcess type={EAlertType.ERROR}>
        Текст сообщения
    </AlertProcess>
    <br />
    <AlertProcess type={EAlertType.FEATURE}>
        Текст сообщения
    </AlertProcess>
</>