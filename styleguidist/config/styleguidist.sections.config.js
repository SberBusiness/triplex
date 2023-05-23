const {getReleaseNotesSections} = require('../tools/getReleaseNotesSections');

const sections = [
    {
        name: 'Components',
        sections: [
            {
                name: 'Accordions',
                sections: [
                    {
                        name: 'AccordionForm',
                        content: './styleguidist/desktop/components/AccordionForm/AccordionForm.md',
                    },
                    {
                        name: 'AccordionView',
                        content: './styleguidist/desktop/components/AccordionView/AccordionView.md',
                    },
                ],
            },
            {
                name: 'Alerts',
                components: [
                    './src/desktop/components/Alert/AlertContext/AlertContext.tsx',
                    './src/desktop/components/Alert/AlertProcess/AlertProcess.tsx',
                ],
            },
            {
                name: 'Amount',
                components: ['./src/desktop/components/Amount/Amount.tsx'],
            },
            {
                name: 'Buttons',
                components: [
                    './src/desktop/components/Button/Button.tsx',
                    './src/desktop/components/Button/ButtonIcon.tsx',
                    './src/desktop/components/Button/ButtonDropdown.tsx',
                    './src/desktop/components/Button/ButtonDropdownExtended.tsx',
                ],
            },
            {
                name: 'Calendar',
                components: ['./src/desktop/components/Calendar/Calendar.tsx'],
            },
            {
                name: 'Cards',
                components: [
                    './src/desktop/components/Card/CardStatic.tsx',
                    './src/desktop/components/Card/CardAction.tsx',
                    './src/desktop/components/Card/CardTableTotal.tsx',
                ],
            },
            {
                name: 'Checkboxes',
                components: [
                    './src/desktop/components/Checkbox/Checkbox.tsx',
                    './src/desktop/components/Checkbox/CheckboxXGroup.tsx',
                    './src/desktop/components/Checkbox/CheckboxYGroup.tsx',
                ],
            },
            {
                name: 'CheckboxTree',
                components: [
                    './src/desktop/components/CheckboxTree/CheckboxTree.tsx',
                    './src/desktop/components/CheckboxTreeExtended/CheckboxTreeExtended.tsx',
                ],
            },
            {
                name: 'Col',
                content: './styleguidist/desktop/components/Col/Col.md',
            },
            {
                name: 'DatePicker',
                sections: [
                    {
                        name: 'DatePicker',
                        content: './styleguidist/desktop/components/DatePicker/DatePicker.md',
                    },
                    {
                        name: 'MonthYearPicker',
                        content: './styleguidist/desktop/components/DatePicker/MonthYearPicker.md',
                    },
                ],
            },
            {
                name: 'DateRange',
                content: './styleguidist/desktop/components/DateRange/DateRange.md',
            },
            {
                name: 'Divider',
                content: './styleguidist/desktop/components/Divider/Divider.md',
            },
            {
                name: 'DocumentNumberEdit',
                content: './styleguidist/desktop/components/DocumentNumberEdit/DocumentNumberEdit.md',
            },
            {
                name: 'Ellipsis',
                components: ['./src/desktop/components/Ellipsis/Ellipsis.tsx'],
            },
            {
                name: 'Gap',
                content: './styleguidist/desktop/components/Gap/Gap.md',
            },
            {
                name: 'FormGroup',
                sections: [
                    {
                        name: 'FormGroup с Input',
                        content: './styleguidist/desktop/components/FormGroup/FormGroupInput.md',
                    },
                    {
                        name: 'FormGroup с MaskedInput',
                        content: './styleguidist/desktop/components/FormGroup/FormGroupMaskedInput.md',
                    },
                    {
                        name: 'FormGroup с другими видами полей ввода (в разработке)',
                        content: './styleguidist/desktop/components/FormGroup/FormGroupDev.md',
                    }
                ]
            },
            {
                name: 'HelpBoxes',
                components: [
                    './src/desktop/components/HelpBox/HelpBox.tsx',
                    './src/desktop/components/HelpBox/HelpBoxSM.tsx',
                    './src/desktop/components/HelpBox/HelpBoxLG.tsx',
                ],
            },
            {
                name: 'Inputs',
                sections: [
                    {
                        name: 'AmountInput',
                        components: ['./src/desktop/components/AmountInput/AmountInput.tsx'],
                    },
                    {
                        name: 'Input',
                        components: ['./src/desktop/components/Input/Input.tsx'],
                    },
                    {
                        name: 'MaskedInput',
                        components: ['./src/desktop/components/MaskedInput/MaskedInput.tsx'],
                    },
                    {
                        name: 'MaskedInputDeprecated',
                        components: ['./src/desktop/components/MaskedInputDeprecated/MaskedInputDeprecated.tsx'],
                    },
                    {
                        name: 'NumberInput',
                        components: ['./src/desktop/components/NumberInput/NumberInput.tsx'],
                    },
                    {
                        name: 'SMSInput',
                        components: ['./src/desktop/components/SMSInput/SMSInput.tsx'],
                    },
                    {
                        name: 'SMSInputDeprecated',
                        content: './styleguidist/desktop/components/SMSInput/SMSInputDeprecated.md',
                    },
                    {
                        name: 'TextArea',
                        components: ['./src/desktop/components/TextArea/TextArea.tsx'],
                    },
                ],
            },
            {
                name: 'InputGroup',
                content: './styleguidist/desktop/components/InputGroup/InputGroup.md',
            },
            {
                name: 'Labels',
                content: './styleguidist/desktop/components/Labels/Labels.md',
            },
            {
                name: 'LightBoxes',
                sections: [
                    {
                        name: 'LightBox базовый',
                        content: './styleguidist/desktop/components/LightBox/LightBox.md',
                    },
                    {
                        name: 'LightBox с TopOverlay и sidebar в header',
                        content: './styleguidist/desktop/components/LightBox/LightBoxWithTopOverlayAndHeaderSidebar.md',
                    },
                    {
                        name: 'LightBox с TopOverlay в SideOverlay',
                        content: './styleguidist/desktop/components/LightBox/LightBoxWithTopOverlayInSideOverlay.md',
                    },
                    {
                        name: 'LightBox с несколькими SideOverlay',
                        content: './styleguidist/desktop/components/LightBox/LightBoxWithMultipleSideOverlays.md',
                    },
                    {
                        name: 'LightBox с SideOverlay через Portal',
                        content: './styleguidist/desktop/components/LightBox/LightBoxWithPortalSideOverlays.md',
                    },
                    {
                        name: 'LightBox с табами',
                        content: './styleguidist/desktop/components/LightBox/LightBoxWithTabs.md',
                    },
                    {
                        name: 'LightBox, занимающий определенную область экрана',
                        content: './styleguidist/desktop/components/LightBox/LightBoxCustomView.md',
                    },
                    {
                        name: 'LightBox с accessibility',
                        content: './styleguidist/desktop/components/LightBox/LightBoxWithTopOverlayInSideOverlayAccessibility.md',
                    },
                ],
            },
            {
                name: 'Link',
                components: ['./src/desktop/components/Link/Link.tsx'],
            },
            {
                name: 'MarkerStatus',
                content: './styleguidist/desktop/components/MarkerStatus/MarkerStatus.md',
            },
            {
                name: 'MediaWidth',
                content: './styleguidist/desktop/components/MediaWidth/MediaWidth.md',
            },
            {
                name: 'Modal windows',
                sections: [
                    {
                        name: 'ModalWindowBasic',
                        content: './styleguidist/desktop/components/ModalWindow/ModalWindowBasic.md',
                    },
                ],
            },
            {
                name: 'Multiselect',
                components: ['./src/desktop/components/Multiselect/Multiselect.tsx'],
            },
            {
                name: 'Notification',
                sections: [
                    {
                        name: 'Notification Success',
                        content: './styleguidist/desktop/components/Notification/Success.md',
                    },
                    {
                        name: 'Notification Warning',
                        content: './styleguidist/desktop/components/Notification/Warning.md',
                    },
                    {
                        name: 'Notification Error',
                        content: './styleguidist/desktop/components/Notification/Error.md',
                    },
                    {
                        name: 'Notification Redirect',
                        content: './styleguidist/desktop/components/Notification/Redirect.md',
                    },
                    {
                        name: 'Notification сгруппированная',
                        content: './styleguidist/desktop/components/Notification/Group.md',
                    },
                    {
                        name: 'Notification c аналитикой',
                        content: './styleguidist/desktop/components/Notification/Analytics.md',
                    },
                    {
                        name: 'Notification c isShowCloseOnHover и withExtraBottomPadding',
                        content: './styleguidist/desktop/components/Notification/Notification.md',
                    },
                ],
            },
            {
                name: 'Overlay',
                components: ['./src/desktop/components/Overlay/Overlay.tsx'],
            },
            {
                name: 'Page',
                components: [
                    './src/desktop/components/Page/Page.tsx',
                    './src/desktop/components/Page/components/HeaderPage.tsx',
                    './src/desktop/components/Page/components/FooterPage.tsx',
                ],
            },
            {
                name: 'Radios',
                components: [
                    './src/desktop/components/Radio/Radio.tsx',
                    './src/desktop/components/Radio/RadioXGroup.tsx',
                    './src/desktop/components/Radio/RadioYGroup.tsx',
                ],
            },
            {
                name: 'SegmentedControl',
                components: ['./src/desktop/components/SegmentedControl/SegmentedControl.tsx'],
            },
            {
                name: 'Skeleton',
                components: ['./src/desktop/components/Skeleton/Skeleton.tsx'],
            },
            {
                name: 'Selects',
                sections: [
                    {
                        name: 'Select',
                        content: './styleguidist/desktop/components/Select/Select.md',
                    },
                    {
                        name: 'SelectExtended',
                        content: './styleguidist/desktop/components/SelectExtended/SelectExtended.md',
                    },
                    {
                        name: 'AmountCurrencySelect',
                        components: ['./src/desktop/components/AmountCurrencySelect/AmountCurrencySelect.tsx'],
                    },
                ],
            },
            {
                name: 'Slider',
                sections: [
                    {
                        name: 'Slider base',
                        content: './styleguidist/desktop/components/Slider/Slider.md',
                    },
                    {
                        name: 'Slider with dynamic min max',
                        content: './styleguidist/desktop/components/Slider/SliderWithDynamicMinMax.md',
                    },
                    {
                        name: 'Slider with tooltip',
                        content: './styleguidist/desktop/components/Slider/SliderTooltip.md',
                    },
                    {
                        name: 'Slider reverse',
                        content: './styleguidist/desktop/components/Slider/SliderReverse.md',
                    },
                    {
                        name: 'Slider custom steps',
                        content: './styleguidist/desktop/components/Slider/SliderCustomSteps.md',
                    },
                    {
                        name: 'Slider amount example',
                        content: './styleguidist/desktop/components/Slider/SliderAmountExample.md',
                    },
                    {
                        name: 'SliderRange',
                        content: './styleguidist/desktop/components/Slider/SliderRange.md',
                    },
                ],
            },
            {
                name: 'SliderExtended',
                sections: [
                    {
                        name: 'SliderExtended base',
                        content: './styleguidist/desktop/components/SliderExtended/SliderExtended.md',
                    },
                    {
                        name: 'SliderExtended with tooltip',
                        content: './styleguidist/desktop/components/SliderExtended/SliderExtendedTooltip.md',
                    },
                    {
                        name: 'SliderExtended reverse',
                        content: './styleguidist/desktop/components/SliderExtended/SliderExtendedReverse.md',
                    },
                    {
                        name: 'SliderExtended custom steps',
                        content: './styleguidist/desktop/components/SliderExtended/SliderExtendedCustomSteps.md',
                    },
                    {
                        name: 'SliderExtended amount example',
                        content: './styleguidist/desktop/components/SliderExtended/SliderExtendedAmountExample.md',
                    },
                    {
                        name: 'SliderExtended range',
                        content: './styleguidist/desktop/components/SliderExtended/SliderExtendedRange.md',
                    },
                ],
            },
            {
                name: 'Spinners',
                sections: [
                    {
                        name: 'Spinner',
                        components: ['./src/desktop/components/Spinner/Spinner.tsx'],
                    },
                    {
                        name: 'SpinnerWidget',
                        components: ['./src/desktop/components/SpinnerWidget/SpinnerWidget.tsx'],
                    },
                ],
            },
            {
                name: 'Spoiler',
                components: ['./src/desktop/components/Spoiler/Spoiler.tsx'],
            },
            {
                name: 'StatusTracker',
                components: [
                    './src/desktop/components/StatusTracker/StatusTracker.tsx',
                    './src/desktop/components/StatusTrackerDeprecated/StatusTrackerDeprecated.tsx',
                ],
            },
            {
                name: 'Stepper',
                components: [
                    './src/desktop/components/Stepper/Stepper.tsx',
                    './src/desktop/components/Stepper/StepperExtended.tsx'
                ],
            },
            {
                name: 'Suggest',
                sections: [
                    {
                        name: 'Sync',
                        content: './styleguidist/desktop/components/Suggest/SyncExample/SuggestSyncExample.md',
                    },
                    {
                        name: 'Async',
                        content: './styleguidist/desktop/components/Suggest/AsyncExample/SuggestAsyncExample.md',
                    },
                    {
                        name: 'Custom',
                        content: './styleguidist/desktop/components/Suggest/CustomExample/SuggestCustomExample.md',
                    },
                ],
            },
            {
                name: 'TableBasic',
                content: './styleguidist/desktop/components/Tables/TableBasic/TableBasic.md',
            },
            {
                name: 'Tabs',
                content: './styleguidist/desktop/components/Tabs/Tabs.md',
            },
            {
                name: 'TabsExtended',
                components: ['./src/desktop/components/TabsExtended/TabsExtended.tsx'],
            },
            {
                name: 'TabsFolder',
                components: ['./src/desktop/components/TabsFolder/TabsFolder.tsx'],
            },
            {
                name: 'TabsFolderExtended',
                content: './styleguidist/desktop/components/TabsFolderExtended/TabsFolderExtended.md',
            },
            {
                name: 'Tag',
                sections: [
                    {
                        name: 'Tag',
                        content: './styleguidist/desktop/components/Tag/Tag.md',
                    },
                    {
                        name: 'TagGroup',
                        content: './styleguidist/desktop/components/Tag/TagGroup.md',
                    },
                ],
            },
            {
                name: 'TextField',
                sections: [
                    {
                        name: 'Input',
                        content: 'styleguidist/desktop/components/TextField/TextField.md'
                    },
                    {
                        name: 'MaskedInput',
                        content: 'styleguidist/desktop/components/TextField/TextFieldMasked.md'
                    }
                ],
            },
            {
                name: 'Tooltip',
                components: ['./src/desktop/components/Tooltip/Tooltip.tsx'],
            },
            {
                name: 'Typography',
                sections: [
                    {
                        name: 'Text',
                        content: './styleguidist/desktop/components/Typography/Text.md',
                    },
                    {
                        name: 'Title',
                        content: './styleguidist/desktop/components/Typography/Title.md',
                    },
                ],
            },
            {
                name: 'UploadZone',
                content: './styleguidist/desktop/components/UploadZone/UploadZone.md',
            },
            {
                name: 'XStepper',
                components: ['./src/desktop/components/XStepper/XStepper.tsx'],
            },
            {
                name: 'Widget',
                components: ['./src/desktop/components/Widget/Widget.tsx'],
            },
        ],
    },
    {
        name: 'Mobile Components',
        sections: [
            {
                name: 'Buttons',
                components: [
                    './src/mobile/components/Button/ButtonGeneral.tsx',
                    './src/mobile/components/Button/ButtonSecondary.tsx',
                    './src/mobile/components/Button/ButtonDanger.tsx',
                ],
            },
            {
                name: 'Inputs',
                components: ['./src/mobile/components/input/Input/Input.tsx'],
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
                        name: 'Accent',
                        content: './styleguidist/desktop/components/Icons/Accent.md',
                    },
                    {
                        name: 'Animated',
                        content: './styleguidist/desktop/components/Icons/Animated.md',
                    },
                    {
                        name: 'Brand',
                        content: './styleguidist/desktop/components/Icons/Brand.md',
                    },
                    {
                        name: 'Marketing',
                        content: './styleguidist/desktop/components/Icons/Marketing.md',
                    },
                    {
                        name: 'Navigation',
                        content: './styleguidist/desktop/components/Icons/Navigation.md',
                    },
                    {
                        name: 'Product',
                        content: './styleguidist/desktop/components/Icons/Product.md',
                    },
                    {
                        name: 'Service',
                        content: './styleguidist/desktop/components/Icons/Service.md',
                    },
                    {
                        name: 'Statuses',
                        content: './styleguidist/desktop/components/Icons/Statuses.md',
                    },
                ],
            },
            {
                name: 'Illustrations',
                sections: [
                    {
                        name: 'Screen Market',
                        content: './styleguidist/desktop/components/Icons/ScreenMarket.md',
                    },
                    {
                        name: 'Screen System',
                        content: './styleguidist/desktop/components/Icons/ScreenSystem.md',
                    },
                ],
            },
        ],
    },
    {
        name: 'Examples',
        sections: [
            {
                name: 'FormEditable',
                content: './styleguidist/desktop/components/Form/FormEditable.md',
            },
            {
                name: 'FormDetailed',
                content: './styleguidist/desktop/components/Form/FormDetailed.md',
            },
            {
                name: 'Input with no autofill',
                content: './styleguidist/desktop/components/Input/InputNoAutofill.md'
            },
            {
                name: 'Select accessibility',
                content: './styleguidist/desktop/components/Select/SelectAccessibility.md',
            },
            {
                name: 'SMSInput in TableBasic',
                content: './styleguidist/desktop/components/SMSInput/SMSInputTableBasic.md',
            },
        ],
    },
    {
        name: 'Release notes',
        sections: getReleaseNotesSections(),
    },
    {
        name: 'Fonts',
        content: './styleguidist/desktop/components/Fonts/Fonts.md',
    },
    {
        name: 'Screenshot tests',
        sections: [
            {
                name: 'Alerts',
                sections: [
                    {
                        name: 'AlertContext',
                        content: './styleguidist/test-examples/desktop/Alert/AlertContext/AlertContext.md',
                    },
                    {
                        name: 'AlertProcess',
                        content: './styleguidist/test-examples/desktop/Alert/AlertProcess/AlertProcess.md',
                    },
                ],
            },
            {
                name: 'Buttons',
                sections: [
                    {
                        name: 'Button',
                        content: './styleguidist/test-examples/desktop/Button/Button.md',
                    },
                    {
                        name: 'ButtonIcon',
                        content: './styleguidist/test-examples/desktop/Button/ButtonIcon.md',
                    },
                    {
                        name: 'ButtonDropdown',
                        content: './styleguidist/test-examples/desktop/Button/ButtonDropdown.md',
                    },
                ],
            },
            {
                name: 'Cards',
                sections: [
                    {
                        name: 'CardStatic',
                        content: './styleguidist/test-examples/desktop/Card/CardStatic.md',
                    },
                    {
                        name: 'CardAction',
                        content: './styleguidist/test-examples/desktop/Card/CardAction.md',
                    },
                ],
            },
            {
                name: 'Checkboxes',
                sections: [
                    {
                        name: 'Checkbox',
                        content: './styleguidist/test-examples/desktop/Checkbox/Checkbox.md',
                    },
                    {
                        name: 'CheckboxXGroup',
                        content: './styleguidist/test-examples/desktop/Checkbox/CheckboxXGroup.md',
                    },
                    {
                        name: 'CheckboxYGroup',
                        content: './styleguidist/test-examples/desktop/Checkbox/CheckboxYGroup.md',
                    },
                ],
            },
            {
                name: 'Col',
                content: './styleguidist/test-examples/desktop/Col/Col.md',
            },
            {
                name: 'DatePicker',
                content: './styleguidist/test-examples/desktop/DatePicker/DatePicker.md',
            },
            {
                name: 'Divider',
                content: './styleguidist/test-examples/desktop/Divider/Divider.md',
            },
            {
                name: 'Ellipsis',
                content: './styleguidist/test-examples/desktop/Ellipsis/Ellipsis.md',
            },
            {
                name: 'Input',
                content: './styleguidist/test-examples/desktop/Input/Input.md',
            },
            {
                name: 'InputGroup',
                content: './styleguidist/test-examples/desktop/InputGroup/InputGroup.md',
            },
            {
                name: 'Link',
                content: './styleguidist/test-examples/desktop/Link/Link.md',
            },
            {
                name: 'MaskedInput',
                content: './styleguidist/test-examples/desktop/MaskedInput/MaskedInput.md',
            },
            {
                name: 'MonthYearPicker',
                content: './styleguidist/test-examples/desktop/MonthYearPicker/MonthYearPicker.md',
            },
            {
                name: 'Multiselect',
                content: './styleguidist/test-examples/desktop/Multiselect/Multiselect.md',
            },
            {
                name: 'Radios',
                sections: [
                    {
                        name: 'Radio',
                        content: './styleguidist/test-examples/desktop/Radio/Radio.md',
                    },
                    {
                        name: 'RadioXGroup',
                        content: './styleguidist/test-examples/desktop/Radio/RadioXGroup.md',
                    },
                    {
                        name: 'RadioYGroup',
                        content: './styleguidist/test-examples/desktop/Radio/RadioYGroup.md',
                    },
                ],
            },
            {
                name: 'SegmentedControl',
                content: './styleguidist/test-examples/desktop/SegmentedControl/SegmentedControl.md',
            },
            {
                name: 'Select',
                content: './styleguidist/test-examples/desktop/Select/Select.md',
            },
            {
                name: 'SliderExtended',
                content: './styleguidist/test-examples/desktop/SliderExtended/SliderExtended.md',
            },
            {
                name: 'StatusTracker',
                content: './styleguidist/test-examples/desktop/StatusTracker/StatusTracker.md',
            },
            {
                name: 'Stepper',
                content: './styleguidist/test-examples/desktop/Stepper/Stepper.md',
            },
            {
                name: 'Suggest',
                content: './styleguidist/test-examples/desktop/Suggest/Suggest.md',
            },
            {
                name: 'SuggestCustom',
                content: './styleguidist/test-examples/desktop/Suggest/SuggestCustom.md',
            },
            {
                name: 'SMSInput',
                content: './styleguidist/test-examples/desktop/SMSInput/SMSInput.md',
            },
            {
                name: 'Spoiler',
                content: './styleguidist/test-examples/desktop/Spoiler/Spoiler.md',
            },
            {
                name: 'Tabs',
                content: './styleguidist/test-examples/desktop/Tabs/Tabs.md',
            },
            {
                name: 'TabsFolder',
                content: './styleguidist/test-examples/desktop/TabsFolder/TabsFolder.md',
            },
            {
                name: 'Tag',
                sections: [
                    {
                        name: 'Tag',
                        content: './styleguidist/test-examples/desktop/Tag/Tag.md',
                    },
                    {
                        name: 'TagGroup',
                        content: './styleguidist/test-examples/desktop/Tag/TagGroup.md',
                    },
                ],
            },
            {
                name: 'TextArea',
                content: './styleguidist/test-examples/desktop/TextArea/TextArea.md',
            },
            {
                name: 'Tooltip',
                content: './styleguidist/test-examples/desktop/Tooltip/Tooltip.md',
            },
            {
                name: 'Typography',
                sections: [
                    {
                        name: 'Text',
                        content: './styleguidist/test-examples/desktop/Typography/Text.md',
                    },
                    {
                        name: 'Title',
                        content: './styleguidist/test-examples/desktop/Typography/Title.md',
                    },
                ],
            },
            {
                name: 'UploadZone',
                content: './styleguidist/test-examples/desktop/UploadZone/UploadZone.md',
            },
            {
                name: 'Widget',
                content: './styleguidist/test-examples/desktop/Widget/Widget.md',
            },
        ],
    },
];

exports.sections = sections;
