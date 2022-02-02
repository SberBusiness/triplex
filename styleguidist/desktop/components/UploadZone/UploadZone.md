## UploadZone + FileList (построенный на TableBasic)

```jsx
import React, {useState} from 'react';
import {UploadZone} from '@sbbol/web-library/desktop/components/UploadZone/UploadZone';
import {ClouddraguploadSrvIcon32} from '@sberbusiness/icons/ClouddraguploadSrvIcon32';
import {ELinkSize, ELinkType, Link} from '@sbbol/web-library/desktop/components/Link/Link';
import {HelpBoxSM} from '@sbbol/web-library/desktop/components/HelpBox/HelpBoxSM';
import {Gap} from '@sbbol/web-library/desktop/components/Gap/Gap';
import {MarkerStatus} from '@sbbol/web-library/desktop/components/MarkerStatus/MarkerStatus';
import {EMarkerStatus} from '@sbbol/web-library/desktop/components/Marker/enums';
import {ButtonIcon} from '@sbbol/web-library/desktop/components/Button/ButtonIcon/ButtonIcon';
import {DeleteSrvIcon20} from '@sberbusiness/icons/DeleteSrvIcon20';
import {PlugSrvIcon32} from '@sberbusiness/icons/PlugSrvIcon32';
import {DownloadSrvIcon20} from '@sberbusiness/icons/DownloadSrvIcon20';
import {EditSrvIcon20} from '@sberbusiness/icons/EditSrvIcon20';
import {TableBasic} from '@sbbol/web-library/desktop/components/Tables/TableBasic/TableBasic';
import {EVerticalAlign} from '@sbbol/web-library/desktop/components/Tables/TableBasic/enums';
import './UploadZone.less';

const [container, setContainer] = useState();

const renderContainerContent = () => (
    <div className="uploadZoneContainerContent">
        <ClouddraguploadSrvIcon32 />
        <Gap size={4} />
        <div className="text">Положите файлы сюда</div>
    </div>
);

const columns = [
    {
        fieldKey: 'number',
        width: 44,
        verticalAlign: EVerticalAlign.TOP,
    },
    {
        fieldKey: 'logo',
        width: 56,
        verticalAlign: EVerticalAlign.TOP,
    },
    {fieldKey: 'summary', verticalAlign: EVerticalAlign.TOP},
    {fieldKey: 'status', verticalAlign: EVerticalAlign.TOP},
    {fieldKey: 'download', verticalAlign: EVerticalAlign.TOP},
    {fieldKey: 'edit', verticalAlign: EVerticalAlign.TOP},
    {fieldKey: 'delete', verticalAlign: EVerticalAlign.TOP},
];

const getData = () => {
    const data = [
        {
            summary: {
                name: 'Название первого файла очень длинное',
                size: `Размер файла 23 мб`,
            },
            status: {
                status: EMarkerStatus.SUCCESS,
                text: 'Успешно',
                desc: 'Пояснения к статусу',
            },
        },
        {
            summary: {
                name: 'Название второго файла очень длинное',
                size: `Размер файла 23 мб`,
            },
            status: {
                status: EMarkerStatus.ERROR,
                text: 'Ошибка',
                desc: 'Пояснения к статусу',
            },
        },
        {
            summary: {
                name: 'Название третьего файла очень длинное',
                size: `Размер файла 23 мб`,
            },
            status: {
                status: EMarkerStatus.SUCCESS,
                text: 'Успешно',
                desc: 'Пояснения к статусу',
            },
        },
    ];

    return data.map((d, i) => {
        const rowNumber = i + 1;

        return {
            rowKey: String(rowNumber),
            dataAttributes: {'test-id': `FileList__Row${rowNumber}`},
            rowData: {
                number: String(rowNumber),
                logo: <PlugSrvIcon32 />,
                summary: (
                    <>
                        <div>{d.summary.name}</div>
                        <div className="fileListFileSize">{d.summary.size}</div>
                    </>
                ),
                status: (
                    <MarkerStatus status={d.status.status} description={d.status.desc}>
                        {d.status.text}
                    </MarkerStatus>
                ),
                download: (
                    <ButtonIcon>
                        <DownloadSrvIcon20 table />
                    </ButtonIcon>
                ),
                edit: (
                    <ButtonIcon>
                        <EditSrvIcon20 table />
                    </ButtonIcon>
                ),
                delete: (
                    <ButtonIcon>
                        <DeleteSrvIcon20 table />
                    </ButtonIcon>
                ),
            },
        };
    });
};

const renderUploadZoneContent = (openUploadDialog) => (
    <div className="uploadZoneContent">
        <UploadZone.Input multiple />
        <Gap size={16} />
        <ClouddraguploadSrvIcon32 />
        <Gap size={4} />
        <span>
            Перетащите файлы или <Link linkType={ELinkType.TEXT} size={ELinkSize.LG} onClick={openUploadDialog}>выберите на компьютере</Link>{' '}
            <HelpBoxSM>Допустимые форматы файлов pdf, tiff, jpeg, png, pcx, docx.</HelpBoxSM>
        </span>
        <Gap size={16} />
    </div>
);

<div ref={(node) => setContainer(node)} style={{position: 'relative'}}>
    <UploadZone onChange={(files) => console.log(files)} renderContainerContent={renderContainerContent} dropZoneContainer={container}>
        {({openUploadDialog}) => renderUploadZoneContent(openUploadDialog)}
    </UploadZone>
    <Gap size={16} />
    <TableBasic columns={columns} data={getData()} headless highlightRowOnHover />
</div>;
```

## UploadZone + FileList (построенный на TableBasic) two-step download

```jsx
import React, {useState} from 'react';
import {UploadZone} from '@sbbol/web-library/desktop/components/UploadZone/UploadZone';
import {ClouddraguploadSrvIcon32} from '@sberbusiness/icons/ClouddraguploadSrvIcon32';
import {ELinkSize, ELinkType, Link} from '@sbbol/web-library/desktop/components/Link/Link';
import {HelpBoxLG} from '@sbbol/web-library/desktop/components/HelpBox/HelpBoxLG';
import {Gap} from '@sbbol/web-library/desktop/components/Gap/Gap';
import {MarkerStatus} from '@sbbol/web-library/desktop/components/MarkerStatus/MarkerStatus';
import {EMarkerStatus} from '@sbbol/web-library/desktop/components/Marker/enums';
import {PlugSrvIcon32} from '@sberbusiness/icons/PlugSrvIcon32';
import {TableBasic} from '@sbbol/web-library/desktop/components/Tables/TableBasic/TableBasic';
import {ECellType, EVerticalAlign} from '@sbbol/web-library/desktop/components/Tables/TableBasic/enums';
import {Button} from '@sbbol/web-library/desktop/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sbbol/web-library/desktop/components/Button/enums';
import './UploadZone.less';

const [container, setContainer] = useState();

const renderContainerContent = () => (
    <div className="uploadZoneContainerContent">
        <ClouddraguploadSrvIcon32 />
        <Gap size={4} />
        <div className="text">Положите файлы сюда</div>
    </div>
);
//    ;

const columns = [
    {fieldKey: 'number', width: 44, verticalAlign: EVerticalAlign.TOP},
    {fieldKey: 'logo', width: 56, verticalAlign: EVerticalAlign.TOP},
    {fieldKey: 'summary', verticalAlign: EVerticalAlign.TOP},
    {fieldKey: 'status', verticalAlign: EVerticalAlign.TOP},
    {fieldKey: 'download', width: 140, cellType: ECellType.COMPONENTS, verticalAlign: EVerticalAlign.TOP},
    {fieldKey: 'delete', width: 90, cellType: ECellType.COMPONENTS, verticalAlign: EVerticalAlign.TOP},
];

const getData = () => {
    const data = [
        {
            summary: {
                name: 'Название первого файла',
                size: `Размер файла 23 мб`,
            },
            status: {
                status: EMarkerStatus.SUCCESS,
                text: 'Успешно',
                desc: 'Пояснения к статусу',
            },
            isRequested: false,
        },
        {
            summary: {
                name: 'Название второго файла',
                size: `Размер файла 23 мб`,
            },
            status: {
                status: EMarkerStatus.ERROR,
                text: 'Ошибка',
                desc: 'Пояснения к статусу',
            },
            isRequested: true,
        },
        {
            summary: {
                name: 'Название третьего файла',
                size: `Размер файла 23 мб`,
            },
            status: {
                status: EMarkerStatus.SUCCESS,
                text: 'Успешно',
                desc: 'Пояснения к статусу',
            },
            isRequested: true,
        },
    ];

    return data.map((d, i) => {
        const rowNumber = i + 1;

        return {
            rowKey: String(rowNumber),
            dataAttributes: {'test-id': `FileList__Row${rowNumber}`},
            rowData: {
                number: String(rowNumber),
                logo: <PlugSrvIcon32 />,
                summary: (
                    <>
                        <div>{d.summary.name}</div>
                        <div className="fileListFileSize">{d.summary.size}</div>
                    </>
                ),
                status: (
                    <MarkerStatus status={d.status.status} description={d.status.desc}>
                        {d.status.text}
                    </MarkerStatus>
                ),
                download: (
                    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.SM}>
                        {d.isRequested ? 'Скачать файл' : 'Запросить файл'}
                    </Button>
                ),
                delete: (
                    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.SM}>
                        Удалить
                    </Button>
                ),
            },
        };
    });
};

const renderUploadZoneContent = (openUploadDialog) => (
    <div className="uploadZoneContent">
        <UploadZone.Input multiple />
        <Gap size={16} />
        <ClouddraguploadSrvIcon32 />
        <Gap size={4} />
        <span>
            Перетащите файлы или <Link linkType={ELinkType.TEXT} size={ELinkSize.LG} onClick={openUploadDialog}>выберите на компьютере</Link>{' '}
            <HelpBoxLG>
                {
                    'Допустимый размер файла не более 40 мб. Допустимые форматы файлов pdf, tiff, jpeg, png, pcx, docx. Имя файла должно содержать следующие символы: русские и английские буквы, цифры, пробелы, и !№%()+-.;=@[]^_\\{\\}'
                }
            </HelpBoxLG>
        </span>
        <Gap size={16} />
    </div>
);

<div ref={(node) => setContainer(node)} style={{position: 'relative'}}>
    <UploadZone onChange={(files) => console.log(files)} renderContainerContent={renderContainerContent} dropZoneContainer={container}>
        {({openUploadDialog}) => renderUploadZoneContent(openUploadDialog)}
    </UploadZone>
    <Gap size={16} />
    <TableBasic columns={columns} data={getData()} headless highlightRowOnHover />
</div>;
```
