import {componentIterationTest} from '../../utils/componentIterationTest';

componentIterationTest(
    'Tooltip',
    [
        //above
        [
            'above-start state',
            {
                checkboxOptions: [{id: 'showTooltip', checked: true}],
                inputOptions: [
                    {id: 'preferPlace', value: 'above'},
                    {id: 'alignTip', value: 'start'},
                ],
            },
            500
        ],
        [
            'above-center state',
            {
                checkboxOptions: [{id: 'showTooltip', checked: true}],
                inputOptions: [
                    {id: 'preferPlace', value: 'above'},
                    {id: 'alignTip', value: 'center'},
                ],
            },
            500
        ],
        [
            'above-end state',
            {
                checkboxOptions: [{id: 'showTooltip', checked: true}],
                inputOptions: [
                    {id: 'preferPlace', value: 'above'},
                    {id: 'alignTip', value: 'end'},
                ],
            },
            500
        ],
        //below
        [
            'below-start state',
            {
                checkboxOptions: [{id: 'showTooltip', checked: true}],
                inputOptions: [
                    {id: 'preferPlace', value: 'below'},
                    {id: 'alignTip', value: 'start'},
                ],
            },
            500
        ],
        [
            'below-center state',
            {
                checkboxOptions: [{id: 'showTooltip', checked: true}],
                inputOptions: [
                    {id: 'preferPlace', value: 'below'},
                    {id: 'alignTip', value: 'center'},
                ],
            },
            500
        ],
        [
            'below-end state',
            {
                checkboxOptions: [{id: 'showTooltip', checked: true}],
                inputOptions: [
                    {id: 'preferPlace', value: 'below'},
                    {id: 'alignTip', value: 'end'},
                ],
            },
            500
        ],
        //right
        [
            'right-start state',
            {
                checkboxOptions: [{id: 'showTooltip', checked: true}],
                inputOptions: [
                    {id: 'preferPlace', value: 'right'},
                    {id: 'alignTip', value: 'start'},
                ],
            },
            500
        ],
        [
            'right-center state',
            {
                checkboxOptions: [{id: 'showTooltip', checked: true}],
                inputOptions: [
                    {id: 'preferPlace', value: 'right'},
                    {id: 'alignTip', value: 'center'},
                ],
            },
            500
        ],
        [
            'right-end state',
            {
                checkboxOptions: [{id: 'showTooltip', checked: true}],
                inputOptions: [
                    {id: 'preferPlace', value: 'right'},
                    {id: 'alignTip', value: 'end'},
                ],
            },
            500
        ],
        //left
        [
            'left-start state',
            {
                checkboxOptions: [{id: 'showTooltip', checked: true}],
                inputOptions: [
                    {id: 'preferPlace', value: 'left'},
                    {id: 'alignTip', value: 'start'},
                ],
            },
            500
        ],
        [
            'left-center state',
            {
                checkboxOptions: [{id: 'showTooltip', checked: true}],
                inputOptions: [
                    {id: 'preferPlace', value: 'left'},
                    {id: 'alignTip', value: 'center'},
                ],
            },
            500
        ],
        [
            'left-end state',
            {
                checkboxOptions: [{id: 'showTooltip', checked: true}],
                inputOptions: [
                    {id: 'preferPlace', value: 'left'},
                    {id: 'alignTip', value: 'end'},
                ],
            },
            500
        ],
    ],
    encodeURI('/#!/Screenshot tests/Tooltip')
);
