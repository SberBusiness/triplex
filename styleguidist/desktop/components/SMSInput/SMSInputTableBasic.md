```jsx
import React
  from 'react';
import { MasterTable } from '@sbbol/web-library/desktop/components/Tables/MasterTable';
import { SMSInput } from '@sbbol/web-library/desktop/components/SMSInput/SMSInput';
import {EmptytableSrvIcon64} from '@sberbusiness/icons/EmptytableSrvIcon64';

const COUNTDOWN_TIME = 10;

const createColumns = () => {
  return [
    {
      fieldKey: 'number',
      label: '№',
      width: 65
    },
    {
      fieldKey: 'smsinput',
      label: 'SMSInput',
    },
  ];
};

const createData = () => [
  {
    rowKey: 'smsinput',
    rowData: [
      '1',
      (
        <div style={{width: '169px'}}>
            <SMSInput
                message="Запросить новый код"
                messageTicking="Запросить новый код через"
                onRefreshCode={(event) => {
                    event.stopPropagation();
                }}
                onSubmitCode={(code, event) => {
                    event.stopPropagation();
                }}
                onClick={(event) => {
                    event.stopPropagation();
                }}
                smsCountdownTime={10}
            />
        </div>
      )
    ],
  },
];

const handleClickRow = (rowKey) => {
  alert(`Успешный клик по строчке с техническим индетификатором: ${String(rowKey)}`);
};

const renderNoData = () => [<EmptytableSrvIcon64 key="icon" />, <div key="text">Нет данных</div>];

<>
  <MasterTable.TableBasic
    columns={createColumns()}
    data={createData()}
    onClickRow={handleClickRow}
    highlightRowOnHover
    renderNoData={renderNoData}
    data-test-id="TestTable__MasterTable.TableBasic"
  />
</>
```
