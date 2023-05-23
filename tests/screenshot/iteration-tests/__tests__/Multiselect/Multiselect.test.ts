import {componentIterationTest} from '../../utils/componentIterationTest';

componentIterationTest(
    'Multiselect',
    [
        ['Default state'],
        [
            'Filtered openned state',
            {
                checkboxOptions: [{id: 'open', checked: true}],
                inputOptions: [{id: 'filter', value: 'filter_text'}],
            },
            500,
        ],
        [
            'Disabled state',
            {
                checkboxOptions: [{id: 'disabled', checked: true}],
            },
        ],
        [
            'Loading openned state',
            {
                checkboxOptions: [
                    {id: 'open', checked: true},
                    {id: 'loading', checked: true},
                ],
                inputOptions: [{id: 'filter', value: 'filter_text'}],
            },
            500,
        ],
        [
            'Error state',
            {
                checkboxOptions: [{id: 'error', checked: true}],
            },
        ],
    ],
    encodeURI('/#!/Screenshot tests/Multiselect')
);
