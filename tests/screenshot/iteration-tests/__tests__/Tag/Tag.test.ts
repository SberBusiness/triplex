import {componentIterationTest} from '../../utils/componentIterationTest';

componentIterationTest('Tag', [
    ['Default', {}],
    ['Editable', {
        checkboxOptions: [
            {id: 'editable', checked: true},
        ]
    }],
    ['Fixed width', {
        checkboxOptions: [
            {id: 'fixedWidth', checked: true},
        ]
    }],
], encodeURI('/#!/Screenshot tests/Tag/Tag'));