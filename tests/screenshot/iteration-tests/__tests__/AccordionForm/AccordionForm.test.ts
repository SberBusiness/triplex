import {xcomponentIterationTest} from '../../utils/componentIterationTest';

xcomponentIterationTest('AccordionForm', [
    [
        'default_collapsed',
        {
            checkboxOptions: [
                {id: 'firstIsNoRemove', checked: true},
                {id: 'lastIsDisabled', checked: true},
                {id: 'onlyOne', checked: false},
                {id: 'independentMode', checked: false},
                {id: 'clickFocus', checked: false},
            ],
            inputOptions: [
                {id: 'focusIdx', value: '-1'},
                {id: 'current', value: ''},
            ],
        },
        250,
    ],
    [
        'default_expanded',
        {
            checkboxOptions: [
                {id: 'firstIsNoRemove', checked: true},
                {id: 'lastIsDisabled', checked: true},
                {id: 'onlyOne', checked: false},
                {id: 'independentMode', checked: false},
                {id: 'clickFocus', checked: false},
            ],
            inputOptions: [
                {id: 'focusIdx', value: '-1'},
                {id: 'current', value: '0'},
            ],
        },
        250,
    ],
    [
        'focused_collapsed',
        {
            checkboxOptions: [
                {id: 'firstIsNoRemove', checked: true},
                {id: 'lastIsDisabled', checked: true},
                {id: 'onlyOne', checked: false},
                {id: 'independentMode', checked: false},
                {id: 'clickFocus', checked: false},
            ],
            inputOptions: [
                {id: 'focusIdx', value: '0'},
                {id: 'current', value: ''},
            ],
        },
        250,
    ],
    [
        'focused_expanded',
        {
            checkboxOptions: [
                {id: 'firstIsNoRemove', checked: true},
                {id: 'lastIsDisabled', checked: true},
                {id: 'onlyOne', checked: false},
                {id: 'independentMode', checked: false},
                {id: 'clickFocus', checked: false},
            ],
            inputOptions: [
                {id: 'focusIdx', value: '0'},
                {id: 'current', value: '0'},
            ],
        },
        250,
    ],
    [
        'mouse_focused_collapsed',
        {
            checkboxOptions: [
                {id: 'firstIsNoRemove', checked: true},
                {id: 'lastIsDisabled', checked: true},
                {id: 'onlyOne', checked: false},
                {id: 'independentMode', checked: false},
                {id: 'clickFocus', checked: true},
            ],
            inputOptions: [
                {id: 'focusIdx', value: '0'},
                {id: 'current', value: '0'},
            ],
        },
        1000,
    ],
    [
        'mouse_focused_expanded',
        {
            checkboxOptions: [
                {id: 'firstIsNoRemove', checked: true},
                {id: 'lastIsDisabled', checked: true},
                {id: 'onlyOne', checked: false},
                {id: 'independentMode', checked: false},
                {id: 'clickFocus', checked: true},
            ],
            inputOptions: [
                {id: 'focusIdx', value: '0'},
                {id: 'current', value: ''},
            ],
        },
        3000,
    ],
]);
