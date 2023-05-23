import {componentIterationTest} from '../../utils/componentIterationTest';

componentIterationTest(
    'Radio',
    [
        ['default'],
        ['checked', {checkboxOptions: [{id: 'checked', checked: true}]}, 200],
        ['focused', {checkboxOptions: [{id: 'focused', checked: true}]}],
        ['disabled', {checkboxOptions: [{id: 'disabled', checked: true}]}],
        [
            'checked focused',
            {
                checkboxOptions: [
                    {id: 'checked', checked: true},
                    {id: 'focused', checked: true},
                ],
            },
            200,
        ],
        [
            'checked disabled',
            {
                checkboxOptions: [
                    {id: 'checked', checked: true},
                    {id: 'disabled', checked: true},
                ],
            },
            200,
        ],
    ],
    encodeURI('/#!/Screenshot tests/Radio')
);
