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
                    './src/components/AccordionView/AccordionView.tsx'
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
                components: './src/components/Amount/Amount.tsx',
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
                    './src/components/Card/CardAction.tsx'
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
                components: './src/components/Col/Col.tsx',
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
                components: './src/components/Ellipsis/Ellipsis.tsx',
            },
            {
                name: 'Gap',
                components: './src/components/Gap/Gap.tsx',
            },
            {
                name: 'FormGroup',
                components: './src/components/FormGroup/FormGroup.tsx',
            },
            {
                name: 'HelpBoxes',
                components: './src/components/HelpBox/HelpBox.tsx',
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
                name: 'Label',
                components: './src/components/Label/Label.tsx',
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
                name: 'List components',
                components: [
                    './src/components/List/List.tsx',
                    './src/components/List/components/ListItem.tsx',
                    './src/components/List/components/ListItemControls.tsx',
                    './src/components/ListMaster/ListMaster.tsx',
                ],
            },
            {
                name: 'MarkerStatus',
                components: './src/components/MarkerStatus/MarkerStatus.tsx',
            },
            {
                name: 'MediaWidth',
                components: './src/components/MediaWidth/MediaWidth.tsx',
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
                components: './src/components/Notification/Notification.tsx',
            },
            {
                name: 'OrderedList',
                components: './src/components/OrderedList/OrderedList.tsx',
            },
            {
                name: 'Overlay',
                components: './src/components/Overlay/Overlay.tsx',
            },
            {
                name: 'Page components',
                components: [
                    './src/components/Page/Page.tsx',
                    './src/components/Page/components/HeaderPage.tsx',
                    './src/components/Page/components/FooterPage.tsx',
                    './src/components/Page/components/BodyPage.tsx',
                ],
            },
            {
                name: 'Pagination',
                components: [
                    './src/components/Pagination/Pagination.tsx',
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
                components: './src/components/SegmentedControl/SegmentedControl.tsx',
            },
            {
                name: 'Skeleton',
                components: './src/components/Skeleton/Skeleton.tsx',
            },
            {
                name: 'Selects',
                components: [
                    './src/components/Select/Select.tsx',
                    './src/components/SelectExtended/SelectExtended.tsx',
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
                    './src/components/SpinnerWidget/SpinnerWidget.tsx'
                ],
            },
            {
                name: 'Spoiler',
                components: './src/components/Spoiler/Spoiler.tsx',
            },
            {
                name: 'StatusTracker',
                components: './src/components/StatusTracker/StatusTracker.tsx',
            },
            {
                name: 'Steppers',
                components: [
                    './src/components/Stepper/Stepper.tsx',
                    './src/components/Stepper/StepperExtended.tsx'
                ],
            },
            {
                name: 'Suggests',
                components: [
                    './src/components/Suggest/Suggest.tsx',
                    './src/components/Suggest/SuggestCustom.tsx'
                ],
            },
            {
                name: 'TableBasic',
                components: './src/components/Tables/TableBasic/TableBasic.tsx',
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
                    './src/components/Tag/TagGroup.tsx'
                ],
            },
            {
                name: 'TextField',
                components: './src/components/TextField/TextField.tsx',
            },
            {
                name: 'ThemeProvider',
                components: './src/components/ThemeProvider/ThemeProvider.tsx',
            },
            {
                name: 'Tooltip',
                components: './src/components/Tooltip/Tooltip.tsx',
            },
            {
                name: 'Typography',
                components: [
                    './src/components/Typography/Text.tsx',
                    './src/components/Typography/Title.tsx'
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
                components: './src/components/Widget/Widget.tsx',
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
                        content: './styleguidist/components/Icons/Usage.md',
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
                    {
                        name: 'Illustrative',
                        content: './styleguidist/components/Icons/Illustrative.md',
                    },
                ],
            },
            {
                name: 'Illustrations',
                sections: [
                    {
                        name: 'Screens Marketing',
                        content: './styleguidist/components/Icons/ScreenMarket.md',
                    },
                    {
                        name: 'Screens Systems',
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
                name: 'Input | Autofill prevention',
                content: './styleguidist/components/Input/InputNoAutofill.md',
            },
            {
                name: 'PDF Viewer',
                content: './styleguidist/components/PDFViewer/PDFViewer.md',
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
];
