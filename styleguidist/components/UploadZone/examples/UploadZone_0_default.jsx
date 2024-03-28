import React from 'react';
import {UploadZone} from '@sberbusiness/triplex/components/UploadZone/UploadZone';
import {ClouddraguploadSrvIcon32} from '@sberbusiness/icons/ClouddraguploadSrvIcon32';
import {PlugSrvIcon32} from '@sberbusiness/icons/PlugSrvIcon32';
import {DeleteSrvIcon20} from '@sberbusiness/icons/DeleteSrvIcon20';
import {DownloadSrvIcon20} from '@sberbusiness/icons/DownloadSrvIcon20';
import {Gap} from '@sberbusiness/triplex/components/Gap/Gap';
import {Link, ELinkSize, ELinkType} from '@sberbusiness/triplex/components/Link/Link';
import {HelpBox} from '@sberbusiness/triplex/components/HelpBox/HelpBox';
import {ETooltipSize} from '@sberbusiness/triplex/components/Tooltip/enums';
import {TableBasic} from '@sberbusiness/triplex/components/Tables/TableBasic/TableBasic';
import {EVerticalAlign} from '@sberbusiness/triplex/components/Tables/TableBasic/enums';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';
import {EFontType, ETextSize, ELineType} from '@sberbusiness/triplex/components/Typography/enums';
import {MarkerStatus} from '@sberbusiness/triplex/components/MarkerStatus/MarkerStatus';
import {EMarkerStatus} from '@sberbusiness/triplex/components/Marker/enums';
import {ButtonIcon} from '@sberbusiness/triplex/components/Button/ButtonIcon';

import './UploadZone.less';

const [container, setContainer] = React.useState();

const renderContainerContent = () => (
    <div className="uploadZoneOverlay">
        <ClouddraguploadSrvIcon32 />
        <Gap size={4} />
        <div className="uploadZoneOverlayText">Положите файлы сюда</div>
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
                        <Text tag="div" type={EFontType.GENERAL} size={ETextSize.B1} line={ELineType.EXTRA}>
                            {d.summary.name}
                        </Text>
                        <Gap size={4} />
                        <Text tag="div" type={EFontType.SECONDARY} size={ETextSize.B2}>
                            {d.summary.size}
                        </Text>
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
        <div>
            <Text type={EFontType.GENERAL} size={ETextSize.B1}>
                Перетащите файлы или
            </Text>
            {'\u0020'}
            <Link linkType={ELinkType.TEXT} size={ELinkSize.LG} onClick={openUploadDialog}>
                выберите на компьютере
            </Link>
            {'\u00A0'}
            <HelpBox tooltipSize={ETooltipSize.SM}>Допустимые форматы файлов: PDF, TIFF, JPEG, PNG, PCX, DOCX.</HelpBox>
        </div>
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