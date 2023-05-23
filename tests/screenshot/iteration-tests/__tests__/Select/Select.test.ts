import {componentIterationTest} from '../../utils/componentIterationTest';

componentIterationTest('Select', [
    ['Default state'],
    [
        'Picked state',
        {
            inputOptions: [{id: 'inputValue', value: 'i1'}],
        },
    ],
    [
        'Opened state',
        {
            checkboxOptions: [{id: 'Select-isOpen', checked: true}],
        },
        1000,
    ],
    [
        'Opened picked state',
        {
            checkboxOptions: [{id: 'Select-isOpen', checked: true}],
            inputOptions: [{id: 'inputValue', value: 'i1'}],
        },
        1000,
    ],
    [
        'Opened to top state',
        {
            checkboxOptions: [
                {id: 'Select-isOpen', checked: true},
                {id: 'Select-openToTop', checked: true},
            ],
        },
        1000,
    ],
    [
        'Disabled state',
        {
            checkboxOptions: [{id: 'Select-disabled', checked: true}],
        },
    ],
    [
        'Error state',
        {
            checkboxOptions: [{id: 'Select-error', checked: true}],
        },
    ],
], encodeURI('/#!/Screenshot tests/Select'));
