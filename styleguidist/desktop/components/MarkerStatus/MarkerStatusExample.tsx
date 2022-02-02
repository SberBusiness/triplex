import React from 'react';
import {MarkerStatus} from '@sbbol/web-library/desktop/components/MarkerStatus/MarkerStatus';
import {EMarkerStatus} from '@sbbol/web-library/desktop/components/Marker/enums';
import {Row} from '@sbbol/web-library/desktop/components/Row/Row';
import {Col} from '@sbbol/web-library/desktop/components/Col/Col';

const renderRowExample = (content: JSX.Element) => (
    <Row>
        <Col size={3}>{content}</Col>
    </Row>
);

export const MarkerStatusExample = () => (
    <>
        {renderRowExample(
            <MarkerStatus status={EMarkerStatus.SUCCESS} description="Текст пояснения">
                Исполнено
            </MarkerStatus>
        )}
        {renderRowExample(
            <MarkerStatus status={EMarkerStatus.ERROR} description="Текст пояснения может быть в 2 строки">
                Ошибка
            </MarkerStatus>
        )}
        {renderRowExample(<MarkerStatus status={EMarkerStatus.WARNING}>Важное</MarkerStatus>)}
        {renderRowExample(<MarkerStatus status={EMarkerStatus.WAITING}>Ожидание</MarkerStatus>)}
    </>
);
