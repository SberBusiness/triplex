## UploadZone + FileList (построенный на TableBasic)

```jsx
import {UploadZone} from '@sberbusiness/triplex/components/UploadZone/UploadZone';
import {ClouddraguploadSrvIcon32} from '@sberbusiness/icons/ClouddraguploadSrvIcon32';
import {ELinkSize, ELinkType, Link} from '@sberbusiness/triplex/components/Link/Link';
import {Gap} from '@sberbusiness/triplex/components/Gap/Gap';
import {MarkerStatus} from '@sberbusiness/triplex/components/MarkerStatus/MarkerStatus';
import {EMarkerStatus} from '@sberbusiness/triplex/components/Marker/enums';
import {ButtonIcon} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {DeleteSrvIcon20} from '@sberbusiness/icons/DeleteSrvIcon20';
import {PlugSrvIcon32} from '@sberbusiness/icons/PlugSrvIcon32';
import {DownloadSrvIcon20} from '@sberbusiness/icons/DownloadSrvIcon20';
import {TableBasic} from '@sberbusiness/triplex/components/Tables/TableBasic/TableBasic';
import {EVerticalAlign} from '@sberbusiness/triplex/components/Tables/TableBasic/enums';
import {HelpBox} from '@sberbusiness/triplex/components/HelpBox/HelpBox';
import {ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';
import './UploadZone.less';

const [container, setContainer] = React.useState();

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
        width: 32,
        verticalAlign: EVerticalAlign.TOP,
    },
    {
        fieldKey: 'logo',
        width: 56,
        verticalAlign: EVerticalAlign.TOP,
    },
    {
        fieldKey: 'summary', 
        verticalAlign: EVerticalAlign.TOP,
    },
    {
        fieldKey: 'status',
        width: 160,
        verticalAlign: EVerticalAlign.TOP,
    },
    {
        fieldKey: 'download',
        width: 56,
        verticalAlign: EVerticalAlign.TOP,
    },
    {
        fieldKey: 'delete',
        width: 56,
        verticalAlign: EVerticalAlign.TOP,
    },
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
            Перетащите файлы или
            <Link linkType={ELinkType.TEXT} size={ELinkSize.LG} onClick={openUploadDialog}>
                выберите на компьютере
            </Link>
            {'\u00A0'}
            <HelpBox tooltipSize={ETooltipSize.SM}>Допустимые форматы файлов: PDF, TIFF, JPEG, PNG, PCX, DOCX.</HelpBox>
        </span>
        <Gap size={16} />
    </div>
);

<div ref={(node) => setContainer(node)} style={{position: 'relative'}}>
    <UploadZone renderContainerContent={renderContainerContent} dropZoneContainer={container}>
        {({openUploadDialog}) => renderUploadZoneContent(openUploadDialog)}
    </UploadZone>
    <Gap size={16} />
    <TableBasic columns={columns} data={getData()} headless highlightRowOnHover />
</div>
```

## UploadZone + FileList (построенный на TableBasic) two-step download

```jsx
import {UploadZone} from '@sberbusiness/triplex/components/UploadZone/UploadZone';
import {ClouddraguploadSrvIcon32} from '@sberbusiness/icons/ClouddraguploadSrvIcon32';
import {ELinkSize, ELinkType, Link} from '@sberbusiness/triplex/components/Link/Link';
import {HelpBox} from '@sberbusiness/triplex/components/HelpBox/HelpBox';
import {ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';
import {Gap} from '@sberbusiness/triplex/components/Gap/Gap';
import {MarkerStatus} from '@sberbusiness/triplex/components/MarkerStatus/MarkerStatus';
import {EMarkerStatus} from '@sberbusiness/triplex/components/Marker/enums';
import {PlugSrvIcon32} from '@sberbusiness/icons/PlugSrvIcon32';
import {TableBasic} from '@sberbusiness/triplex/components/Tables/TableBasic/TableBasic';
import {ECellType, EVerticalAlign} from '@sberbusiness/triplex/components/Tables/TableBasic/enums';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import './UploadZone.less';

const [container, setContainer] = React.useState();

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
        width: 32,
        verticalAlign: EVerticalAlign.TOP,
    },
    {
        fieldKey: 'logo',
        width: 56,
        verticalAlign: EVerticalAlign.TOP,
    },
    {
        fieldKey: 'summary',
        verticalAlign: EVerticalAlign.TOP,
    },
    {
        fieldKey: 'status',
        width: 160,
        verticalAlign: EVerticalAlign.TOP,
    },
    {
        fieldKey: 'download',
        width: 138,
        cellType: ECellType.COMPONENTS, 
        verticalAlign: EVerticalAlign.TOP,
    },
    {
        fieldKey: 'button',
        width: 81,
        cellType: ECellType.COMPONENTS,
        verticalAlign: EVerticalAlign.TOP,
    },
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
                    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.SM} block>
                        {d.isRequested ? 'Скачать файл' : 'Запросить файл'}
                    </Button>
                ),
                button: (
                    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.SM} block>
                        Кнопка
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
            Перетащите файлы или
            <Link linkType={ELinkType.TEXT} size={ELinkSize.LG} onClick={openUploadDialog}>
                выберите на компьютере
            </Link>
            {'\u00A0'}
            <HelpBox tooltipSize={ETooltipSize.LG}>
                {
                    'Максимальный размер одного файла – не более 40 Мб в форматах PDF, TIFF, JPEG, PNG, PCX, DOCX. Имя файла должно содержать русские и английские буквы, цифры, пробелы и следующие символы: !№%()+-.;=@[]^_{}'
                }
            </HelpBox>
        </span>
        <Gap size={16} />
    </div>
);

<div ref={(node) => setContainer(node)} style={{position: 'relative'}}>
    <UploadZone renderContainerContent={renderContainerContent} dropZoneContainer={container}>
        {({openUploadDialog}) => renderUploadZoneContent(openUploadDialog)}
    </UploadZone>
    <Gap size={16} />
    <TableBasic columns={columns} data={getData()} headless highlightRowOnHover />
</div>
```
