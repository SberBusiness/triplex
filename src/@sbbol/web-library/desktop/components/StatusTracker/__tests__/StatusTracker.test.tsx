import React from 'react';
import renderer from 'react-test-renderer';
import {Button} from '@sbbol/web-library/desktop/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sbbol/web-library/desktop/components/Button/enums';
import {StatusTrackerStatus, StatusTrackerStepNumber} from '../enums';
import {StatusTracker} from '../StatusTracker';
import {allure} from '@jest/unit/allure-report';
import {ELinkSize, ELinkType, Link} from '../../Link/Link';

jest.mock('@sberbusiness/icons/SpinnersmallwhiteAniIcon20', () => ({
    SpinnersmallwhiteAniIcon20: 'svg',
}));

jest.mock('@sberbusiness/icons/SpinnersmallAniIcon20', () => ({
    SpinnersmallAniIcon20: 'svg',
}));

jest.mock('@sberbusiness/icons/ClosetooltipSrvxIcon16', () => ({
    ClosetooltipSrvxIcon16: 'svg',
}));

jest.mock('@sberbusiness/icons/WarningStsIcon64', () => ({
    WarningStsIcon64: 'svg',
}));

jest.mock('@sberbusiness/icons/ErrorStsIcon64', () => ({
    ErrorStsIcon64: 'svg',
}));

jest.mock('@sberbusiness/icons/SuccessStsIcon64', () => ({
    SuccessStsIcon64: 'svg',
}));

jest.mock('@sberbusiness/icons/WaitStsIcon64', () => ({
    WaitStsIcon64: 'svg',
}));

describe.skip('StatusTracker', () => {
    beforeEach(() => {
        allure.feature('StatusTracker');
    });

    it('renders correctly', () => {
        const tree = renderer
            .create(
                <StatusTracker currentStep={StatusTrackerStepNumber.FOUR} status={StatusTrackerStatus.WARNING}>
                    <StatusTracker.Body showIcon>
                        <StatusTracker.Body.Text>Тестовый текст</StatusTracker.Body.Text>
                        <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                            Button Name
                        </Button>
                    </StatusTracker.Body>
                    <StatusTracker.Footer>
                        <StatusTracker.Footer.Text>Тестовый текст</StatusTracker.Footer.Text>
                        <Link linkType={ELinkType.TEXT} size={ELinkSize.SM}>
                            Тестовая ссылка
                        </Link>
                    </StatusTracker.Footer>
                </StatusTracker>
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
});
