import {componentIterationTest} from '../../utils/componentIterationTest';

componentIterationTest(
    'Button',
    [
        ['General MD Default'],
        ['General MD Block', {checkboxOptions: [{id: 'block', checked: true}]}],
        ['General MD Loading', {checkboxOptions: [{id: 'loading', checked: true}]}],
        ['General MD Disabled', {checkboxOptions: [{id: 'disabled', checked: true}]}],
        ['General MD Focused', {checkboxOptions: [{id: 'focused', checked: true}]}],
        [
            'General MD Block Loading',
            {
                checkboxOptions: [
                    {id: 'block', checked: true},
                    {id: 'loading', checked: true},
                ],
            },
        ],
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
        [
            'General MD Loading Focused',
            {
                checkboxOptions: [
                    {id: 'loading', checked: true},
                    {id: 'focused', checked: true},
                ],
            },
        ],
        [
            'General MD Loading Disabled',
            {
                checkboxOptions: [
                    {id: 'loading', checked: true},
                    {id: 'disabled', checked: true},
                ],
            },
        ],
        [
            'General MD Block Loading Disabled',
            {
                checkboxOptions: [
                    {id: 'block', checked: true},
                    {id: 'loading', checked: true},
                    {id: 'disabled', checked: true},
                ],
            },
        ],
        [
            'General MD Block Loading Focused',
            {
                checkboxOptions: [
                    {id: 'block', checked: true},
                    {id: 'loading', checked: true},
                    {id: 'focused', checked: true},
                ],
            },
        ],

        ['General SM Default', {inputOptions: [{id: 'size', value: 'SM'}]}],
        ['General SM Block', {inputOptions: [{id: 'size', value: 'SM'}], checkboxOptions: [{id: 'block', checked: true}]}],
        ['General SM Loading', {inputOptions: [{id: 'size', value: 'SM'}], checkboxOptions: [{id: 'loading', checked: true}]}],
        ['General SM Disabled', {inputOptions: [{id: 'size', value: 'SM'}], checkboxOptions: [{id: 'disabled', checked: true}]}],
        ['General SM Focused', {inputOptions: [{id: 'size', value: 'SM'}], checkboxOptions: [{id: 'focused', checked: true}]}],
        [
            'General SM Block Loading',
            {
                inputOptions: [{id: 'size', value: 'SM'}],
                checkboxOptions: [
                    {id: 'block', checked: true},
                    {id: 'loading', checked: true},
                ],
            },
        ],
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
        [
            'General SM Loading Focused',
            {
                inputOptions: [{id: 'size', value: 'SM'}],
                checkboxOptions: [
                    {id: 'loading', checked: true},
                    {id: 'focused', checked: true},
                ],
            },
        ],
        [
            'General SM Loading Disabled',
            {
                inputOptions: [{id: 'size', value: 'SM'}],
                checkboxOptions: [
                    {id: 'loading', checked: true},
                    {id: 'disabled', checked: true},
                ],
            },
        ],
        [
            'General SM Block Loading Disabled',
            {
                inputOptions: [{id: 'size', value: 'SM'}],
                checkboxOptions: [
                    {id: 'block', checked: true},
                    {id: 'loading', checked: true},
                    {id: 'disabled', checked: true},
                ],
            },
        ],
        [
            'General SM Block Loading Focused',
            {
                inputOptions: [{id: 'size', value: 'SM'}],
                checkboxOptions: [
                    {id: 'block', checked: true},
                    {id: 'loading', checked: true},
                    {id: 'focused', checked: true},
                ],
            },
        ],

        ['Secondary MD Default', {inputOptions: [{id: 'theme', value: 'secondary'}]}],
        ['Secondary MD Block', {inputOptions: [{id: 'theme', value: 'secondary'}], checkboxOptions: [{id: 'block', checked: true}]}],
        ['Secondary MD Loading', {inputOptions: [{id: 'theme', value: 'secondary'}], checkboxOptions: [{id: 'loading', checked: true}]}],
        ['Secondary MD Disabled', {inputOptions: [{id: 'theme', value: 'secondary'}], checkboxOptions: [{id: 'disabled', checked: true}]}],
        ['Secondary MD Focused', {inputOptions: [{id: 'theme', value: 'secondary'}], checkboxOptions: [{id: 'focused', checked: true}]}],
        [
            'Secondary MD Block Loading',
            {
                inputOptions: [{id: 'theme', value: 'secondary'}],
                checkboxOptions: [
                    {id: 'block', checked: true},
                    {id: 'loading', checked: true},
                ],
            },
        ],
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
            'Secondary MD Loading Disabled',
            {
                inputOptions: [{id: 'theme', value: 'secondary'}],
                checkboxOptions: [
                    {id: 'loading', checked: true},
                    {id: 'disabled', checked: true},
                ],
            },
        ],
        [
            'Secondary MD Loading Focused',
            {
                inputOptions: [{id: 'theme', value: 'secondary'}],
                checkboxOptions: [
                    {id: 'loading', checked: true},
                    {id: 'focused', checked: true},
                ],
            },
        ],
        [
            'Secondary MD Block Loading Disabled',
            {
                inputOptions: [{id: 'theme', value: 'secondary'}],
                checkboxOptions: [
                    {id: 'block', checked: true},
                    {id: 'loading', checked: true},
                    {id: 'disabled', checked: true},
                ],
            },
        ],
        [
            'Secondary MD Block Loading Focused',
            {
                inputOptions: [{id: 'theme', value: 'secondary'}],
                checkboxOptions: [
                    {id: 'block', checked: true},
                    {id: 'loading', checked: true},
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
            'Secondary SM Loading',
            {
                inputOptions: [
                    {id: 'theme', value: 'secondary'},
                    {id: 'size', value: 'SM'},
                ],
                checkboxOptions: [{id: 'loading', checked: true}],
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
            'Secondary SM Block Loading',
            {
                inputOptions: [
                    {id: 'theme', value: 'secondary'},
                    {id: 'size', value: 'SM'},
                ],
                checkboxOptions: [
                    {id: 'block', checked: true},
                    {id: 'loading', checked: true},
                ],
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
        [
            'Secondary SM Loading Disabled',
            {
                inputOptions: [
                    {id: 'theme', value: 'secondary'},
                    {id: 'size', value: 'SM'},
                ],
                checkboxOptions: [
                    {id: 'loading', checked: true},
                    {id: 'disabled', checked: true},
                ],
            },
        ],
        [
            'Secondary SM Loading Focused',
            {
                inputOptions: [
                    {id: 'theme', value: 'secondary'},
                    {id: 'size', value: 'SM'},
                ],
                checkboxOptions: [
                    {id: 'loading', checked: true},
                    {id: 'focused', checked: true},
                ],
            },
        ],
        [
            'Secondary SM Block Loading Disabled',
            {
                inputOptions: [
                    {id: 'theme', value: 'secondary'},
                    {id: 'size', value: 'SM'},
                ],
                checkboxOptions: [
                    {id: 'block', checked: true},
                    {id: 'loading', checked: true},
                    {id: 'disabled', checked: true},
                ],
            },
        ],
        [
            'Secondary SM Block Loading Focused',
            {
                inputOptions: [
                    {id: 'theme', value: 'secondary'},
                    {id: 'size', value: 'SM'},
                ],
                checkboxOptions: [
                    {id: 'block', checked: true},
                    {id: 'loading', checked: true},
                    {id: 'focused', checked: true},
                ],
            },
        ],

        ['Danger MD Default', {inputOptions: [{id: 'theme', value: 'danger'}]}],
        ['Danger MD Block', {inputOptions: [{id: 'theme', value: 'danger'}], checkboxOptions: [{id: 'block', checked: true}]}],
        ['Danger MD Loading', {inputOptions: [{id: 'theme', value: 'danger'}], checkboxOptions: [{id: 'loading', checked: true}]}],
        ['Danger MD Disabled', {inputOptions: [{id: 'theme', value: 'danger'}], checkboxOptions: [{id: 'disabled', checked: true}]}],
        ['Danger MD Focused', {inputOptions: [{id: 'theme', value: 'danger'}], checkboxOptions: [{id: 'focused', checked: true}]}],
        [
            'Danger MD Block Loading',
            {
                inputOptions: [{id: 'theme', value: 'danger'}],
                checkboxOptions: [
                    {id: 'block', checked: true},
                    {id: 'loading', checked: true},
                ],
            },
        ],
        [
            'Danger MD Block Disabled',
            {
                inputOptions: [{id: 'theme', value: 'danger'}],
                checkboxOptions: [
                    {id: 'block', checked: true},
                    {id: 'disabled', checked: true},
                ],
            },
        ],
        [
            'Danger MD Block Focused',
            {
                inputOptions: [{id: 'theme', value: 'danger'}],
                checkboxOptions: [
                    {id: 'block', checked: true},
                    {id: 'focused', checked: true},
                ],
            },
        ],
        [
            'Danger MD Loading Disabled',
            {
                inputOptions: [{id: 'theme', value: 'danger'}],
                checkboxOptions: [
                    {id: 'loading', checked: true},
                    {id: 'disabled', checked: true},
                ],
            },
        ],
        [
            'Danger MD Loading Focused',
            {
                inputOptions: [{id: 'theme', value: 'danger'}],
                checkboxOptions: [
                    {id: 'loading', checked: true},
                    {id: 'focused', checked: true},
                ],
            },
        ],
        [
            'Danger MD Block Loading Disabled',
            {
                inputOptions: [{id: 'theme', value: 'danger'}],
                checkboxOptions: [
                    {id: 'block', checked: true},
                    {id: 'loading', checked: true},
                    {id: 'disabled', checked: true},
                ],
            },
        ],
        [
            'Danger MD Block Loading Focused',
            {
                inputOptions: [{id: 'theme', value: 'danger'}],
                checkboxOptions: [
                    {id: 'block', checked: true},
                    {id: 'loading', checked: true},
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

        ['Link MD Default', {inputOptions: [{id: 'theme', value: 'link'}]}],
        ['Link MD Focused', {inputOptions: [{id: 'theme', value: 'link'}], checkboxOptions: [{id: 'focused', checked: true}]}],

        [
            'Link SM Default',
            {
                inputOptions: [
                    {id: 'theme', value: 'link'},
                    {id: 'size', value: 'SM'},
                ],
            },
        ],
        [
            'Link SM Focused',
            {
                inputOptions: [
                    {id: 'theme', value: 'link'},
                    {id: 'size', value: 'SM'},
                ],
                checkboxOptions: [{id: 'focused', checked: true}],
            },
        ],

        ['Tile Default', {inputOptions: [{id: 'theme', value: 'tile'}]}],
        ['Tile Block', {inputOptions: [{id: 'theme', value: 'tile'}], checkboxOptions: [{id: 'block', checked: true}]}],
        ['Tile Loading', {inputOptions: [{id: 'theme', value: 'tile'}], checkboxOptions: [{id: 'loading', checked: true}]}],
        ['Tile Disabled', {inputOptions: [{id: 'theme', value: 'tile'}], checkboxOptions: [{id: 'disabled', checked: true}]}],
        ['Tile Focused', {inputOptions: [{id: 'theme', value: 'tile'}], checkboxOptions: [{id: 'focused', checked: true}]}],
        [
            'Tile Block Loading',
            {
                inputOptions: [{id: 'theme', value: 'tile'}],
                checkboxOptions: [
                    {id: 'block', checked: true},
                    {id: 'loading', checked: true},
                ],
            },
        ],
        [
            'Tile Block Disabled',
            {
                inputOptions: [{id: 'theme', value: 'tile'}],
                checkboxOptions: [
                    {id: 'block', checked: true},
                    {id: 'disabled', checked: true},
                ],
            },
        ],
        [
            'Tile Block Focused',
            {
                inputOptions: [{id: 'theme', value: 'tile'}],
                checkboxOptions: [
                    {id: 'block', checked: true},
                    {id: 'focused', checked: true},
                ],
            },
        ],
        [
            'Tile Loading Disabled',
            {
                inputOptions: [{id: 'theme', value: 'tile'}],
                checkboxOptions: [
                    {id: 'loading', checked: true},
                    {id: 'disabled', checked: true},
                ],
            },
        ],
        [
            'Tile Loading Focused',
            {
                inputOptions: [{id: 'theme', value: 'tile'}],
                checkboxOptions: [
                    {id: 'loading', checked: true},
                    {id: 'focused', checked: true},
                ],
            },
        ],
        [
            'Tile Block Loading Disabled',
            {
                inputOptions: [{id: 'theme', value: 'tile'}],
                checkboxOptions: [
                    {id: 'block', checked: true},
                    {id: 'loading', checked: true},
                    {id: 'disabled', checked: true},
                ],
            },
        ],
        [
            'Tile Block Loading Focused',
            {
                inputOptions: [{id: 'theme', value: 'tile'}],
                checkboxOptions: [
                    {id: 'block', checked: true},
                    {id: 'loading', checked: true},
                    {id: 'focused', checked: true},
                ],
            },
        ],
    ],
    encodeURI('/#!/Screenshot tests/Button')
);
