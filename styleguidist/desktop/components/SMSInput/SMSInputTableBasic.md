```jsx
import {MasterTable} from '@sberbusiness/triplex/desktop/components/Tables/MasterTable';
import {SMSInput} from '@sberbusiness/triplex/desktop/components/SMSInput/SMSInput';
import {ESMSInputSize} from '@sberbusiness/triplex/desktop/components/SMSInput/enums';

const [code, setCode] = React.useState('');

const getColumns = () => [
    {
        fieldKey: 'number',
        label: '№',
        width: 65,
    },
    {
        fieldKey: 'example',
        label: 'Example',
    },
];

const getData = () => [
    {
        rowKey: 'SMSInput',
        rowData: {
            number: '0',
            example: (
                <div style={{width: '169px'}}>
                    <SMSInput
                        code={code}
                        size={ESMSInputSize.MD}
                        onChangeCode={setCode}
                        onSubmitCode={() => {}}
                    >
                        <SMSInput.Tooltip message="Запросить новый код">
                            <SMSInput.Refresh
                                countdownTime={10}
                                countdownTimeLeft={0}
                                onRefresh={() => {}}
                            />
                        </SMSInput.Tooltip>
                        <SMSInput.Input />
                        <SMSInput.Submit />
                    </SMSInput>
                </div>
            ),
        },
    },
];

<MasterTable.TableBasic
    columns={getColumns()}
    data={getData()}
    onClickRow={() => alert()}
    renderNoData={() => <></>}
    highlightRowOnHover
/>
```
