import React from 'react';
import renderer from 'react-test-renderer';
import {Button} from '@sberbusiness/triplex/desktop/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/desktop/components/Button/enums';
import {StatusTrackerDeprecatedStatus, StatusTrackerDeprecatedStepNumber} from '../enums';
import {StatusTrackerDeprecated} from '../StatusTrackerDeprecated';
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

describe.skip('StatusTrackerDeprecated', () => {
    beforeEach(() => {
        allure.feature('StatusTrackerDeprecated');
    });

    it('renders correctly', () => {
        const tree = renderer
            .create(
                <StatusTrackerDeprecated
                    currentStep={StatusTrackerDeprecatedStepNumber.FOUR}
                    status={StatusTrackerDeprecatedStatus.WARNING}
                >
                    <StatusTrackerDeprecated.Body showIcon>
                        <StatusTrackerDeprecated.Body.Text>Тестовый текст</StatusTrackerDeprecated.Body.Text>
                        <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                            Button Name
                        </Button>
                    </StatusTrackerDeprecated.Body>
                    <StatusTrackerDeprecated.Footer>
                        <StatusTrackerDeprecated.Footer.Text>Тестовый текст</StatusTrackerDeprecated.Footer.Text>
                        <Link linkType={ELinkType.TEXT} size={ELinkSize.SM}>
                            Тестовая ссылка
                        </Link>
                    </StatusTrackerDeprecated.Footer>
                </StatusTrackerDeprecated>
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
});
