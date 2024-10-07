/* eslint-env node */
const {getReleaseNotesSections} = require('../tools/getReleaseNotesSections');

module.exports = [
    {
        name: 'Components',
        sections: [
            {
                name: 'Accordions',
                components: [
                    './src/components/AccordionForm/AccordionForm.tsx',
                    './src/components/AccordionView/AccordionView.tsx',
                ],
            },
            {
                name: 'Alerts',
                components: [
                    './src/components/Alert/AlertContext/AlertContext.tsx',
                    './src/components/Alert/AlertProcess/AlertProcess.tsx',
                ],
            },
            {
                name: 'Amount',
                components: ['./src/components/Amount/Amount.tsx'],
            },
            {
                name: 'Buttons',
                components: [
                    './src/components/Button/Button.tsx',
                    './src/components/Button/ButtonIcon.tsx',
                    './src/components/Button/ButtonDropdown.tsx',
                    './src/components/Button/ButtonDropdownExtended.tsx',
                ],
            },
            {
                name: 'Cards',
                components: [
                    './src/components/Card/CardStatic.tsx',
                    './src/components/Card/CardAction.tsx',
                ],
            },
            {
                name: 'Checkboxes',
                components: [
                    './src/components/Checkbox/Checkbox.tsx',
                    './src/components/Checkbox/CheckboxXGroup.tsx',
                    './src/components/Checkbox/CheckboxYGroup.tsx',
                ],
            },
            {
                name: 'Chips',
                components: [
                    './src/components/Chip/Chip.tsx',
                    './src/components/Chip/ChipDatePicker.tsx',
                    './src/components/Chip/ChipIcon.tsx',
                    './src/components/Chip/ChipMultiselect.tsx',
                    './src/components/Chip/ChipOptions.tsx',
                    './src/components/Chip/ChipSelect.tsx',
                    './src/components/Chip/ChipSort.tsx',
                    './src/components/Chip/ChipSuggest.tsx',
                    './src/components/ChipGroup/ChipGroup.tsx',
                ],
            },
            {
                name: 'CheckboxTree',
                components: [
                    './src/components/CheckboxTree/CheckboxTree.tsx',
                    './src/components/CheckboxTreeExtended/CheckboxTreeExtended.tsx',
                ],
            },
            {
                name: 'Col',
                content: './styleguidist/components/Col/Col.md',
            },
            {
                name: 'Date Pickers',
                components: [
                    './src/components/Calendar/Calendar.tsx',
                    './src/components/DatePicker/DatePicker.tsx',
                    './src/components/MonthYearPicker/MonthYearPicker.tsx',
                    './src/components/DateRange/DateRange.tsx',
                ],
            },
            {
                name: 'Divider',
                components: './src/components/Divider/Divider.tsx',
            },
            {
                name: 'DocumentNumberEdit',
                components: './src/components/DocumentNumberEdit/DocumentNumberEdit.tsx',
            },
            {
                name: 'Ellipsis',
                components: ['./src/components/Ellipsis/Ellipsis.tsx'],
            },
            {
                name: 'Gap',
                content: './styleguidist/components/Gap/Gap.md',
            },
            {
                name: 'FormGroup',
                sections: [
                    {
                        name: 'FormGroup с FormFieldInput',
                        content: './styleguidist/components/FormGroup/FormGroupInput.md',
                    },
                    {
                        name: 'FormGroup с другими видами полей ввода (в разработке)',
                        content: './styleguidist/components/FormGroup/FormGroupDev.md',
                    },
                ],
            },
            {
                name: 'HelpBoxes',
                components: [
                    './src/components/HelpBox/HelpBox.tsx',
                    './src/components/HelpBox/HelpBoxSM.tsx',
                    './src/components/HelpBox/HelpBoxLG.tsx',
                ],
            },
            {
                name: 'Inputs',
                components: [
                    './src/components/Input/Input.tsx',
                    './src/components/NumberInput/NumberInput.tsx',
                    './src/components/AmountInput/AmountInput.tsx',
                    './src/components/TextArea/TextArea.tsx',
                    './src/components/MaskedInput/MaskedInput.tsx',
                    './src/components/InputGroup/InputGroup.tsx',
                    './src/components/SMSInput/SMSInput.tsx',
                ],
            },
            {
                name: 'Labels',
                content: './styleguidist/components/Labels/Labels.md',
            },
            {
                name: 'LightBox',
                components: './src/components/LightBox/LightBox.tsx',
            },
            {
                name: 'Link',
                components: './src/components/Link/Link.tsx',
            },
            {
                name: 'List',
                components: [
                    './src/components/List/List.tsx',
                    './src/components/List/components/ListItem.tsx',
                    './src/components/List/components/ListItemControls.tsx',
                    './src/components/ListMaster/ListMaster.tsx'
                ],
            },
            {
                name: 'MarkerStatus',
                content: './styleguidist/components/MarkerStatus/MarkerStatus.md',
            },
            {
                name: 'MediaWidth',
                content: './styleguidist/components/MediaWidth/MediaWidth.md',
            },
            {
                name: 'ModalWindow',
                components: './src/components/ModalWindow/ModalWindow.tsx',
            },
            {
                name: 'Multiselect',
                components: './src/components/Multiselect/Multiselect.tsx',
            },
            {
                name: 'Notification',
                sections: [
                    {
                        name: 'Notification Success',
                        content: './styleguidist/components/Notification/Success.md',
                    },
                    {
                        name: 'Notification Warning',
                        content: './styleguidist/components/Notification/Warning.md',
                    },
                    {
                        name: 'Notification Error',
                        content: './styleguidist/components/Notification/Error.md',
                    },
                    {
                        name: 'Notification Redirect',
                        content: './styleguidist/components/Notification/Redirect.md',
                    },
                    {
                        name: 'Notification сгруппированная',
                        content: './styleguidist/components/Notification/Group.md',
                    },
                    {
                        name: 'Notification c аналитикой',
                        content: './styleguidist/components/Notification/Analytics.md',
                    },
                    {
                        name: 'Notification c isShowCloseOnHover и withExtraBottomPadding',
                        content: './styleguidist/components/Notification/Notification.md',
                    },
                ],
            },
            {
                name: 'Overlay',
                components: ['./src/components/Overlay/Overlay.tsx'],
            },
            {
                name: 'Page',
                components: [
                    './src/components/Page/Page.tsx',
                    './src/components/Page/components/HeaderPage.tsx',
                    './src/components/Page/components/FooterPage.tsx',
                ],
            },
            {
                name: 'Radios',
                components: [
                    './src/components/Radio/Radio.tsx',
                    './src/components/Radio/RadioXGroup.tsx',
                    './src/components/Radio/RadioYGroup.tsx',
                ],
            },
            {
                name: 'SegmentedControl',
                components: ['./src/components/SegmentedControl/SegmentedControl.tsx'],
            },
            {
                name: 'Skeleton',
                components: ['./src/components/Skeleton/Skeleton.tsx'],
            },
            {
                name: 'Selects',
                components: [
                    './src/components/Select/Select.tsx',
                    './src/components/SelectExtended/SelectExtended.tsx',
                    './src/components/AmountCurrencySelect/AmountCurrencySelect.tsx',
                ],
            },
            {
                name: 'Sliders',
                components: [
                    './src/components/Slider/Slider.tsx',
                    './src/components/Slider/SliderRange.tsx',
                    './src/components/SliderExtended/SliderExtended.tsx',
                ],
            },
            {
                name: 'Spinners',
                components: [
                    './src/components/Spinner/Spinner.tsx',
                    './src/components/SpinnerWidget/SpinnerWidget.tsx',
                ],
            },
            {
                name: 'Spoiler',
                components: ['./src/components/Spoiler/Spoiler.tsx'],
            },
            {
                name: 'StatusTracker',
                components: ['./src/components/StatusTracker/StatusTracker.tsx'],
            },
            {
                name: 'Stepper',
                components: [
                    './src/components/Stepper/Stepper.tsx',
                    './src/components/Stepper/StepperExtended.tsx'
                ],
            },
            {
                name: 'Suggest',
                components: [
                    './src/components/Suggest/Suggest.tsx',
                    './src/components/Suggest/SuggestCustom.tsx',
                ],
            },
            {
                name: 'TableBasic',
                components: [
                    './src/components/Tables/TableBasic/TableBasic.tsx'
                ],
            },
            {
                name: 'Tabs',
                components: './src/components/Tabs/Tabs.tsx',
            },
            {
                name: 'TabsExtended',
                components: './src/components/TabsExtended/TabsExtended.tsx',
            },
            {
                name: 'TabsFolder',
                components: './src/components/TabsFolder/TabsFolder.tsx',
            },
            {
                name: 'TabsFolderExtended',
                components: './src/components/CarouselExtended/CarouselExtended.tsx',
            },
            {
                name: 'TabsLine',
                components: './src/components/TabsLine/TabsLine.tsx',
            },
            {
                name: 'Tags',
                components: [
                    './src/components/Tag/Tag.tsx',
                    './src/components/Tag/TagGroup.tsx',
                ],
            },
            {
                name: 'TextField',
                components: './src/components/TextField/TextField.tsx',
            },
            {
                name: 'ThemeProvider',
                components: ['./src/components/ThemeProvider/ThemeProvider.tsx'],
            },
            {
                name: 'Tooltip',
                components: './src/components/Tooltip/Tooltip.tsx',
            },
            {
                name: 'Typography',
                components: [
                    './src/components/Typography/Text.tsx',
                    './src/components/Typography/Title.tsx',
                ],
            },
            {
                name: 'UnorderedList',
                components: './src/components/UnorderedList/UnorderedList.tsx',
            },
            {
                name: 'UploadZone',
                components: './src/components/UploadZone/UploadZone.tsx',
            },
            {
                name: 'Widget',
                components: ['./src/components/Widget/Widget.tsx'],
            },
        ],
    },
    {
        name: 'Icons and Illustrations',
        sections: [
            {
                name: 'Icons',
                sections: [
                    {
                        name: 'How to use',
                        content: './styleguidist/components/Icons/HowToUse.md'
                    },
                    {
                        name: 'Accent',
                        content: './styleguidist/components/Icons/Accent.md',
                    },
                    {
                        name: 'Animated',
                        content: './styleguidist/components/Icons/Animated.md',
                    },
                    {
                        name: 'Brand',
                        content: './styleguidist/components/Icons/Brand.md',
                    },
                    {
                        name: 'Marketing',
                        content: './styleguidist/components/Icons/Marketing.md',
                    },
                    {
                        name: 'Navigation',
                        content: './styleguidist/components/Icons/Navigation.md',
                    },
                    {
                        name: 'Product',
                        content: './styleguidist/components/Icons/Product.md',
                    },
                    {
                        name: 'Service',
                        content: './styleguidist/components/Icons/Service.md',
                    },
                    {
                        name: 'Status',
                        content: './styleguidist/components/Icons/Status.md',
                    },
                ],
            },
            {
                name: 'Illustrations',
                sections: [
                    {
                        name: 'Screen Market',
                        content: './styleguidist/components/Icons/ScreenMarket.md',
                    },
                    {
                        name: 'Screen System',
                        content: './styleguidist/components/Icons/ScreenSystem.md',
                    },
                ],
            },
        ],
    },
    {
        name: 'DesignTokens',
        content: './styleguidist/components/DesignTokens/DesignTokens.md',
    },
    {
        name: 'Examples',
        sections: [
            {
                name: 'FormEditable',
                content: './styleguidist/components/Form/FormEditable.md',
            },
            {
                name: 'FormDetailed',
                content: './styleguidist/components/Form/FormDetailed.md',
            },
            {
                name: 'Input with no autofill',
                content: './styleguidist/components/Input/InputNoAutofill.md'
            },
            {
                name: 'SMSInput in TableBasic',
                content: './styleguidist/components/SMSInput/SMSInputTableBasic.md',
            },
        ],
    },
    {
        name: 'Release notes',
        sections: getReleaseNotesSections(),
    },
    {
        name: 'Fonts',
        content: './styleguidist/components/Fonts/Fonts.md',
    },
    {
        name: 'Screenshot tests',
        sections: [
            {
                name: 'Alerts',
                sections: [
                    {
                        name: 'AlertContext',
                        content: './styleguidist/test-examples/Alert/AlertContext/AlertContext.md',
                    },
                    {
                        name: 'AlertProcess',
                        content: './styleguidist/test-examples/Alert/AlertProcess/AlertProcess.md',
                    },
                ],
            },
            {
                name: 'Buttons',
                sections: [
                    {
                        name: 'Button',
                        content: './styleguidist/test-examples/Button/Button.md',
                    },
                    {
                        name: 'ButtonIcon',
                        content: './styleguidist/test-examples/Button/ButtonIcon.md',
                    },
                    {
                        name: 'ButtonDropdown',
                        content: './styleguidist/test-examples/Button/ButtonDropdown.md',
                    },
                ],
            },
            {
                name: 'Cards',
                sections: [
                    {
                        name: 'CardStatic',
                        content: './styleguidist/test-examples/Card/CardStatic.md',
                    },
                    {
                        name: 'CardAction',
                        content: './styleguidist/test-examples/Card/CardAction.md',
                    },
                ],
            },
            {
                name: 'Checkboxes',
                sections: [
                    {
                        name: 'Checkbox',
                        content: './styleguidist/test-examples/Checkbox/Checkbox.md',
                    },
                    {
                        name: 'CheckboxXGroup',
                        content: './styleguidist/test-examples/Checkbox/CheckboxXGroup.md',
                    },
                    {
                        name: 'CheckboxYGroup',
                        content: './styleguidist/test-examples/Checkbox/CheckboxYGroup.md',
                    },
                ],
            },
            {
                name: 'Col',
                content: './styleguidist/test-examples/Col/Col.md',
            },
            {
                name: 'DatePicker',
                content: './styleguidist/test-examples/DatePicker/DatePicker.md',
            },
            {
                name: 'Divider',
                content: './styleguidist/test-examples/Divider/Divider.md',
            },
            {
                name: 'Ellipsis',
                content: './styleguidist/test-examples/Ellipsis/Ellipsis.md',
            },
            {
                name: 'Input',
                content: './styleguidist/test-examples/Input/Input.md',
            },
            {
                name: 'InputGroup',
                content: './styleguidist/test-examples/InputGroup/InputGroup.md',
            },
            {
                name: 'Link',
                content: './styleguidist/test-examples/Link/Link.md',
            },
            {
                name: 'MaskedInput',
                content: './styleguidist/test-examples/MaskedInput/MaskedInput.md',
            },
            {
                name: 'MonthYearPicker',
                content: './styleguidist/test-examples/MonthYearPicker/MonthYearPicker.md',
            },
            {
                name: 'Multiselect',
                content: './styleguidist/test-examples/Multiselect/Multiselect.md',
            },
            {
                name: 'Radio buttons',
                sections: [
                    {
                        name: 'Radio',
                        content: './styleguidist/test-examples/Radio/Radio.md',
                    },
                    {
                        name: 'RadioXGroup',
                        content: './styleguidist/test-examples/Radio/RadioXGroup.md',
                    },
                    {
                        name: 'RadioYGroup',
                        content: './styleguidist/test-examples/Radio/RadioYGroup.md',
                    },
                ],
            },
            {
                name: 'SegmentedControl',
                content: './styleguidist/test-examples/SegmentedControl/SegmentedControl.md',
            },
            {
                name: 'Select',
                content: './styleguidist/test-examples/Select/Select.md',
            },
            {
                name: 'SliderExtended',
                content: './styleguidist/test-examples/SliderExtended/SliderExtended.md',
            },
            {
                name: 'StatusTracker',
                content: './styleguidist/test-examples/StatusTracker/StatusTracker.md',
            },
            {
                name: 'Stepper',
                content: './styleguidist/test-examples/Stepper/Stepper.md',
            },
            {
                name: 'Suggest',
                content: './styleguidist/test-examples/Suggest/Suggest.md',
            },
            {
                name: 'SuggestCustom',
                content: './styleguidist/test-examples/Suggest/SuggestCustom.md',
            },
            {
                name: 'SMSInput',
                content: './styleguidist/test-examples/SMSInput/SMSInput.md',
            },
            {
                name: 'Spoiler',
                content: './styleguidist/test-examples/Spoiler/Spoiler.md',
            },
            {
                name: 'Tabs',
                content: './styleguidist/test-examples/Tabs/Tabs.md',
            },
            {
                name: 'TabsFolder',
                content: './styleguidist/test-examples/TabsFolder/TabsFolder.md',
            },
            {
                name: 'Tag',
                sections: [
                    {
                        name: 'Tag',
                        content: './styleguidist/test-examples/Tag/Tag.md',
                    },
                    {
                        name: 'TagGroup',
                        content: './styleguidist/test-examples/Tag/TagGroup.md',
                    },
                ],
            },
            {
                name: 'TextArea',
                content: './styleguidist/test-examples/TextArea/TextArea.md',
            },
            {
                name: 'Tooltip',
                content: './styleguidist/test-examples/Tooltip/Tooltip.md',
            },
            {
                name: 'Typography',
                sections: [
                    {
                        name: 'Text',
                        content: './styleguidist/test-examples/Typography/Text.md',
                    },
                    {
                        name: 'Title',
                        content: './styleguidist/test-examples/Typography/Title.md',
                    },
                ],
            },
            {
                name: 'UploadZone',
                content: './styleguidist/test-examples/UploadZone/UploadZone.md',
            },
            {
                name: 'Widget',
                content: './styleguidist/test-examples/Widget/Widget.md',
            },
        ],
    },
];
