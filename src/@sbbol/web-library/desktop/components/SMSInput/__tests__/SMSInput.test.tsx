import React from 'react';
import renderer from 'react-test-renderer';
import {SMSInput} from '../SMSInput';
import {allure} from '@jest/unit/allure-report';

jest.mock('@sberbusiness/icons/ClosetooltipSrvxIcon16', () => ({
    ClosetooltipSrvxIcon16: 'svg',
}));

describe.skip('SMSInput', () => {
    beforeEach(() => {
        allure.feature('SMSInput');
    });

    it('renders correctly', () => {
        const tree = renderer
            .create(
                <SMSInput
                    data-test-id="SMSInput"
                    message="Запросить новый код"
                    messageTicking="Запросить новый код через"
                    onRefreshCode={jest.fn()}
                    onSubmitCode={jest.fn()}
                    smsCountdownTime={0}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
