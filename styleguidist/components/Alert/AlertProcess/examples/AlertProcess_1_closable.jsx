import React from 'react';
import {AlertProcess} from '@sberbusiness/triplex/components/Alert/AlertProcess/AlertProcess';
import {EAlertType} from '@sberbusiness/triplex/components/Alert/EAlertType';

const handleClose = () => alert();

<>
    <AlertProcess type={EAlertType.INFO} onClose={handleClose} closable>
        Текст сообщения
    </AlertProcess>
    <br />
    <AlertProcess type={EAlertType.WARNING} onClose={handleClose} closable>
        Текст сообщения
    </AlertProcess>
    <br />
    <AlertProcess type={EAlertType.ERROR} onClose={handleClose} closable>
        Текст сообщения
    </AlertProcess>
    <br />
    <AlertProcess type={EAlertType.SYSTEM} onClose={handleClose} closable>
        Текст сообщения
    </AlertProcess>
    <br />
    <AlertProcess type={EAlertType.FEATURE} onClose={handleClose} closable>
        Текст сообщения
    </AlertProcess>
</>