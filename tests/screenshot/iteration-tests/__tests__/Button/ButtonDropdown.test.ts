import {componentIterationTest} from '../../utils/componentIterationTest';

componentIterationTest(
    'ButtonDropdown',
    [
        ['General MD Default'],
        ['General MD Block', {checkboxOptions: [{id: 'block', checked: true}]}],
        ['General MD Disabled', {checkboxOptions: [{id: 'disabled', checked: true}]}],
        ['General MD Focused', {checkboxOptions: [{id: 'focused', checked: true}]}],
        [
            'General MD Block Disabled',
            {
                checkboxOptions: [
                    {id: 'block', checked: true},
                    {id: 'disabled', checked: true},
                ],
            },
        ],
        [
            'General MD Block Focused',
            {
                checkboxOptions: [
                    {id: 'block', checked: true},
                    {id: 'focused', checked: true},
                ],
            },
        ],

        ['General SM Default', {inputOptions: [{id: 'size', value: 'SM'}]}],
        ['General SM Block', {inputOptions: [{id: 'size', value: 'SM'}], checkboxOptions: [{id: 'block', checked: true}]}],
        ['General SM Disabled', {inputOptions: [{id: 'size', value: 'SM'}], checkboxOptions: [{id: 'disabled', checked: true}]}],
        ['General SM Focused', {inputOptions: [{id: 'size', value: 'SM'}], checkboxOptions: [{id: 'focused', checked: true}]}],
        [
            'General SM Block Disabled',
            {
                inputOptions: [{id: 'size', value: 'SM'}],
                checkboxOptions: [
                    {id: 'block', checked: true},
                    {id: 'disabled', checked: true},
                ],
            },
        ],
        [
            'General SM Block Focused',
            {
                inputOptions: [{id: 'size', value: 'SM'}],
                checkboxOptions: [
                    {id: 'block', checked: true},
                    {id: 'focused', checked: true},
                ],
            },
        ],

        ['Secondary MD Default', {inputOptions: [{id: 'theme', value: 'secondary'}]}],
        ['Secondary MD Block', {inputOptions: [{id: 'theme', value: 'secondary'}], checkboxOptions: [{id: 'block', checked: true}]}],
        ['Secondary MD Disabled', {inputOptions: [{id: 'theme', value: 'secondary'}], checkboxOptions: [{id: 'disabled', checked: true}]}],
        ['Secondary MD Focused', {inputOptions: [{id: 'theme', value: 'secondary'}], checkboxOptions: [{id: 'focused', checked: true}]}],
        [
            'Secondary MD Block Disabled',
            {
                inputOptions: [{id: 'theme', value: 'secondary'}],
                checkboxOptions: [
                    {id: 'block', checked: true},
                    {id: 'disabled', checked: true},
                ],
            },
        ],
        [
            'Secondary MD Block Focused',
            {
                inputOptions: [{id: 'theme', value: 'secondary'}],
                checkboxOptions: [
                    {id: 'block', checked: true},
                    {id: 'focused', checked: true},
                ],
            },
        ],

        [
            'Secondary SM Default',
            {
                inputOptions: [
                    {id: 'theme', value: 'secondary'},
                    {id: 'size', value: 'SM'},
                ],
            },
        ],
        [
            'Secondary SM Block',
            {
                inputOptions: [
                    {id: 'theme', value: 'secondary'},
                    {id: 'size', value: 'SM'},
                ],
                checkboxOptions: [{id: 'block', checked: true}],
            },
        ],
        [
            'Secondary SM Disabled',
            {
                inputOptions: [
                    {id: 'theme', value: 'secondary'},
                    {id: 'size', value: 'SM'},
                ],
                checkboxOptions: [{id: 'disabled', checked: true}],
            },
        ],
        [
            'Secondary SM Focused',
            {
                inputOptions: [
                    {id: 'theme', value: 'secondary'},
                    {id: 'size', value: 'SM'},
                ],
                checkboxOptions: [{id: 'focused', checked: true}],
            },
        ],
        [
            'Secondary SM Block Disabled',
            {
                inputOptions: [
                    {id: 'theme', value: 'secondary'},
                    {id: 'size', value: 'SM'},
                ],
                checkboxOptions: [
                    {id: 'block', checked: true},
                    {id: 'disabled', checked: true},
                ],
            },
        ],
        [
            'Secondary SM Block Focused',
            {
                inputOptions: [
                    {id: 'theme', value: 'secondary'},
                    {id: 'size', value: 'SM'},
                ],
                checkboxOptions: [
                    {id: 'block', checked: true},
                    {id: 'focused', checked: true},
                ],
            },
        ],

        ['Dots MD Default', {inputOptions: [{id: 'theme', value: 'dots'}]}],
        ['Dots MD Disabled', {inputOptions: [{id: 'theme', value: 'dots'}], checkboxOptions: [{id: 'disabled', checked: true}]}],
        ['Dots MD Focused', {inputOptions: [{id: 'theme', value: 'dots'}], checkboxOptions: [{id: 'focused', checked: true}]}],

        [
            'Dots SM Default',
            {
                inputOptions: [
                    {id: 'theme', value: 'dots'},
                    {id: 'size', value: 'SM'},
                ],
            },
        ],
        [
            'Dots SM Disabled',
            {
                inputOptions: [
                    {id: 'theme', value: 'dots'},
                    {id: 'size', value: 'SM'},
                ],
                checkboxOptions: [{id: 'disabled', checked: true}],
            },
        ],
        [
            'Dots SM Focused',
            {
                inputOptions: [
                    {id: 'theme', value: 'dots'},
                    {id: 'size', value: 'SM'},
                ],
                checkboxOptions: [{id: 'focused', checked: true}],
            },
        ],
    ],
    encodeURI('/#!/Screenshot tests/ButtonDropdown')
);
