import renderer from 'react-test-renderer';
import React from 'react';
import {SMSInput} from '../SMSInput';
import {ESMSInputSize} from '../enums';

jest.mock('@sberbusiness/icons/SmssignSrvxIcon20', () => ({
    SmssignSrvxIcon20: 'svg',
}));

jest.mock('@sberbusiness/icons/ClosetooltipSrvxIcon16', () => ({
    ClosetooltipSrvxIcon16: 'svg',
}));

jest.mock('@sberbusiness/icons/ClosenotificationSrvxIcon16', () => ({
    ClosenotificationSrvxIcon16: 'svg',
}));

jest.mock('react-dom', () => ({
    findDOMNode: () => ({addEventListener: jest.fn()}),
}));

describe('SMSInput', () => {
    beforeEach(() => {
        allure.feature('SMSInput');
    });

    it('renders correctly', () => {
        const tree = renderer
            .create(
                <SMSInput data-test-id="SMSInput" code={''} size={ESMSInputSize.MD} onChangeCode={jest.fn()} onSubmitCode={jest.fn()}>
                    <SMSInput.Tooltip message="Запросить новый код">
                        <SMSInput.Refresh countdownTime={10} countdownTimeLeft={0} onRefresh={jest.fn()} />
                    </SMSInput.Tooltip>
                    <SMSInput.Input placeholder="Введите код" />
                    <SMSInput.Submit />
                </SMSInput>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
