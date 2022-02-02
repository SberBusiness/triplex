import {componentIterationTest} from '../../utils/componentIterationTest';

componentIterationTest('Ellipsis', [
    ['Default state'],
    [
        'Full text',
        {
            inputOptions: [{id: 'maxLine', value: '4'}],
        },
    ],
], encodeURI('/#!/Screenshot tests/Ellipsis'));
