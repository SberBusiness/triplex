import {componentIterationTest} from '../../utils/componentIterationTest';

componentIterationTest(
    'Link',
    [
        /** Тесты Link Text. */
        /** Тесты без доп контента. */
        ['Default Link Text SM', {
            inputOptions: [
                {id: 'type', value: 'text'},
                {id: 'size', value: 'sm'},
            ]
        }],
        ['Default Link Text LG', {
            inputOptions: [
                {id: 'type', value: 'text'},
                {id: 'size', value: 'lg'},
            ]
        }],
        /** Тесты c доп контентом. */
        ['Default Link Text SM with contentAfter', {
            inputOptions: [
                {id: 'type', value: 'text'},
                {id: 'size', value: 'sm'},
            ],
            checkboxOptions: [
                {id: 'contentAfter', checked: true},
            ]
        }],
        ['Default Link Text LG with contentAfter', {
            inputOptions: [
                {id: 'type', value: 'text'},
                {id: 'size', value: 'lg'},
            ],
            checkboxOptions: [
                {id: 'contentAfter', checked: true},
            ]
        }],
        ['Default Link Text SM with contentBefore', {
            inputOptions: [
                {id: 'type', value: 'text'},
                {id: 'size', value: 'sm'},
            ],
            checkboxOptions: [
                {id: 'contentBefore', checked: true},
            ]
        }],
        ['Default Link Text LG with contentBefore', {
            inputOptions: [
                {id: 'type', value: 'text'},
                {id: 'size', value: 'lg'},
            ],
            checkboxOptions: [
                {id: 'contentBefore', checked: true},
            ]
        }],
        ['Default Link Text SM with both contentAfter and contentBefore', {
            inputOptions: [
                {id: 'type', value: 'text'},
                {id: 'size', value: 'sm'},
            ],
            checkboxOptions: [
                {id: 'contentAfter', checked: true},
                {id: 'contentBefore', checked: true},
            ]
        }],
        ['Default Link Text LG with both contentAfter and contentBefore', {
            inputOptions: [
                {id: 'type', value: 'text'},
                {id: 'size', value: 'lg'},
            ],
            checkboxOptions: [
                {id: 'contentAfter', checked: true},
                {id: 'contentBefore', checked: true},
            ]
        }],
        /** Аналогичные тесты для фокусного состояния. */
        /** Тесты без доп контента. */
        ['Focus Link Text SM', {
            inputOptions: [
                {id: 'type', value: 'text'},
                {id: 'size', value: 'sm'},
            ],
            checkboxOptions: [
                {id: 'focus', checked: true},
            ]
        }],
        ['Focus Link Text LG', {
            inputOptions: [
                {id: 'type', value: 'text'},
                {id: 'size', value: 'lg'},
            ],
            checkboxOptions: [
                {id: 'focus', checked: true},
            ]
        }],
        /** Тесты c доп контентом. */
        ['Focus Link Text SM with contentAfter', {
            inputOptions: [
                {id: 'type', value: 'text'},
                {id: 'size', value: 'sm'},
            ],
            checkboxOptions: [
                {id: 'focus', checked: true},
                {id: 'contentAfter', checked: true},
            ]
        }],
        ['Focus Link Text LG with contentAfter', {
            inputOptions: [
                {id: 'type', value: 'text'},
                {id: 'size', value: 'lg'},
            ],
            checkboxOptions: [
                {id: 'focus', checked: true},
                {id: 'contentAfter', checked: true},
            ]
        }],
        ['Focus Link Text SM with contentBefore', {
            inputOptions: [
                {id: 'type', value: 'text'},
                {id: 'size', value: 'sm'},
            ],
            checkboxOptions: [
                {id: 'focus', checked: true},
                {id: 'contentBefore', checked: true},
            ]
        }],
        ['Focus Link Text LG with contentBefore', {
            inputOptions: [
                {id: 'type', value: 'text'},
                {id: 'size', value: 'lg'},
            ],
            checkboxOptions: [
                {id: 'focus', checked: true},
                {id: 'contentBefore', checked: true},
            ]
        }],
        ['Focus Link Text SM with both contentAfter and contentBefore', {
            inputOptions: [
                {id: 'type', value: 'text'},
                {id: 'size', value: 'sm'},
            ],
            checkboxOptions: [
                {id: 'focus', checked: true},
                {id: 'contentAfter', checked: true},
                {id: 'contentBefore', checked: true},
            ]
        }],
        ['Focus Link Text LG with both contentAfter and contentBefore', {
            inputOptions: [
                {id: 'type', value: 'text'},
                {id: 'size', value: 'lg'},
            ],
            checkboxOptions: [
                {id: 'focus', checked: true},
                {id: 'contentAfter', checked: true},
                {id: 'contentBefore', checked: true},
            ]
        }],
        /** Тесты Link Line. */
        ['Default Link Line SM', {
            inputOptions: [
                {id: 'type', value: 'line'},
                {id: 'size', value: 'sm'},
            ]
        }],
        ['Default Link Line LG', {
            inputOptions: [
                {id: 'type', value: 'line'},
                {id: 'size', value: 'lg'},
            ]
        }],
        ['Focus Link Line SM', {
            inputOptions: [
                {id: 'type', value: 'line'},
                {id: 'size', value: 'sm'},
            ],
            checkboxOptions: [
                {id: 'focus', checked: true},
            ]
        }],
        ['Focus Link Line LG', {
            inputOptions: [
                {id: 'type', value: 'line'},
                {id: 'size', value: 'lg'},
            ],
            checkboxOptions: [
                {id: 'focus', checked: true},
            ]
        }],
    ],
    encodeURI('/#!/Screenshot tests/Link')
);
