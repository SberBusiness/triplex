import React from 'react';
import {AlertProcess} from '@sberbusiness/triplex/components/Alert/AlertProcess/AlertProcess';
import {EAlertType} from '@sberbusiness/triplex/components/Alert/EAlertType';
import {Gap} from '@sberbusiness/triplex/components/Gap/Gap';
import {Link, ELinkType, ELinkSize} from '@sberbusiness/triplex/components/Link/Link';

const handleClick = (event) => event.preventDefault();

<>
    <AlertProcess type={EAlertType.INFO}>
        Текст сообщения
        <Gap size={8} />
        <Link href="#" linkType={ELinkType.TEXT} size={ELinkSize.LG} onClick={handleClick}>
            Текст ссылки
        </Link>
    </AlertProcess>
    <br />
    <AlertProcess type={EAlertType.WARNING}>
        Текст сообщения
        <Gap size={8} />
        <Link href="#" linkType={ELinkType.TEXT} size={ELinkSize.LG} onClick={handleClick}>
            Текст ссылки
        </Link>
    </AlertProcess>
    <br />
    <AlertProcess type={EAlertType.ERROR}>
        Текст сообщения
        <Gap size={8} />
        <Link href="#" linkType={ELinkType.TEXT} size={ELinkSize.LG} onClick={handleClick}>
            Текст ссылки
        </Link>
    </AlertProcess>
    <br />
    <AlertProcess type={EAlertType.SYSTEM}>
        Текст сообщения
        <Gap size={8} />
        <Link href="#" linkType={ELinkType.TEXT} size={ELinkSize.LG} onClick={handleClick}>
            Текст ссылки
        </Link>
    </AlertProcess>
    <br />
    <AlertProcess type={EAlertType.FEATURE}>
        Текст сообщения
        <Gap size={8} />
        <Link href="#" linkType={ELinkType.TEXT} size={ELinkSize.LG} onClick={handleClick}>
            Текст ссылки
        </Link>
    </AlertProcess>
</>