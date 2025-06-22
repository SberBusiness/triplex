import React from 'react';
import {AlertProcess} from '@sberbusiness/triplex/components/Alert/AlertProcess/AlertProcess';
import {EAlertType} from '@sberbusiness/triplex/components/Alert/EAlertType';
import {Gap} from '@sberbusiness/triplex/components/Gap/Gap';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonSize, EButtonTheme} from '@sberbusiness/triplex/components/Button/enums';

<>
    <AlertProcess type={EAlertType.INFO}>
        Текст сообщения
        <Gap size={8} />
        <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.SM}>
            Button Name
        </Button>
    </AlertProcess>
    <br />
    <AlertProcess type={EAlertType.WARNING}>
        Текст сообщения
        <Gap size={8} />
        <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.SM}>
            Button Name
        </Button>
    </AlertProcess>
    <br />
    <AlertProcess type={EAlertType.ERROR}>
        Текст сообщения
        <Gap size={8} />
        <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.SM}>
            Button Name
        </Button>
    </AlertProcess>
    <br />
    <AlertProcess type={EAlertType.SYSTEM}>
        Текст сообщения
        <Gap size={8} />
        <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.SM}>
            Button Name
        </Button>
    </AlertProcess>
    <br />
    <AlertProcess type={EAlertType.FEATURE}>
        Текст сообщения
        <Gap size={8} />
        <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.SM}>
            Button Name
        </Button>
    </AlertProcess>
</>