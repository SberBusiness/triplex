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
                    './src/@sbbol/web-library/desktop/components/Alert/AlertContext/AlertContext.tsx',
                    './src/@sbbol/web-library/desktop/components/Alert/AlertProcess/AlertProcess.tsx',
                ],
            },
            {
                name: 'Amount',
                components: ['./src/@sbbol/web-library/desktop/components/Amount/Amount.tsx'],
            },
            {
                name: 'Buttons',
                components: [
                    './src/@sbbol/web-library/desktop/components/Button/Button.tsx',
                    './src/@sbbol/web-library/desktop/components/Button/ButtonDropdown.tsx',
                    './src/@sbbol/web-library/desktop/components/Button/ButtonDropdownExtended.tsx',
                ],
            },
            {
                name: 'Calendar',
                components: ['./src/@sbbol/web-library/desktop/components/Calendar/Calendar.tsx'],
            },
            {
                name: 'Cards',
                components: [
                    './src/@sbbol/web-library/desktop/components/Card/CardStatic.tsx',
                    './src/@sbbol/web-library/desktop/components/Card/CardAction.tsx',
                    './src/@sbbol/web-library/desktop/components/Card/CardTableTotal.tsx',
                ],
            },
            {
                name: 'Checkboxes',
                components: [
                    './src/@sbbol/web-library/desktop/components/Checkbox/Checkbox.tsx',
                    './src/@sbbol/web-library/desktop/components/Checkbox/CheckboxXGroup.tsx',
                    './src/@sbbol/web-library/desktop/components/Checkbox/CheckboxYGroup.tsx',
                    './src/@sbbol/web-library/desktop/components/CheckboxTree/CheckboxTree.tsx',
                    './src/@sbbol/web-library/desktop/components/CheckboxTreeExtended/CheckboxTreeExtended.tsx',
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
                name: 'Divider',
                content: './styleguidist/desktop/components/Divider/Divider.md',
            },
            {
                name: 'DocumentNumberEdit',
                content: './styleguidist/desktop/components/DocumentNumberEdit/DocumentNumberEdit.md',
            },
            {
                name: 'Ellipsis',
                components: ['./src/@sbbol/web-library/desktop/components/Ellipsis/Ellipsis.tsx'],
            },
            {
                name: 'Gap',
                content: './styleguidist/desktop/components/Gap/Gap.md',
            },
            {
                name: 'HelpBoxes',
                components: [
                    './src/@sbbol/web-library/desktop/components/HelpBox/HelpBox.tsx',
                    './src/@sbbol/web-library/desktop/components/HelpBox/HelpBoxSM.tsx',
                    './src/@sbbol/web-library/desktop/components/HelpBox/HelpBoxLG.tsx',
                ],
            },
            {
                name: 'Inputs',
                sections: [
                    {
                        name: 'AmountInput',
                        components: ['./src/@sbbol/web-library/desktop/components/AmountInput/AmountInput.tsx'],
                    },
                    {
                        name: 'Input',
                        components: ['./src/@sbbol/web-library/desktop/components/Input/Input.tsx'],
                    },
                    {
                        name: 'MaskedInput',
                        components: ['./src/@sbbol/web-library/desktop/components/MaskedInput/MaskedInput.tsx'],
                    },
                    {
                        name: 'NumberInput',
                        components: ['./src/@sbbol/web-library/desktop/components/NumberInput/NumberInput.tsx'],
                    },
                    {
                        name: 'SMSInput',
                        components: ['./src/@sbbol/web-library/desktop/components/SMSInput/SMSInput.tsx'],
                    },
                    {
                        name: 'TextArea',
                        components: ['./src/@sbbol/web-library/desktop/components/TextArea/TextArea.tsx'],
                    },
                ],
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
                        name: 'LightBox с TopOverlay',
                        content: './styleguidist/desktop/components/LightBox/LightBoxWithTopOverlay.md',
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
                ],
            },
            {
                name: 'Link',
                content: './styleguidist/desktop/components/Link/Link.md',
            },
            {
                name: 'MarkerStatus',
                content: './styleguidist/desktop/components/MarkerStatus/MarkerStatus.md',
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
                components: ['./src/@sbbol/web-library/desktop/components/Multiselect/Multiselect.tsx'],
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
                components: ['./src/@sbbol/web-library/desktop/components/Overlay/Overlay.tsx'],
            },
            {
                name: 'Page',
                components: [
                    './src/@sbbol/web-library/desktop/components/Page/Page.tsx',
                    './src/@sbbol/web-library/desktop/components/Page/components/HeaderPage.tsx',
                    './src/@sbbol/web-library/desktop/components/Page/components/FooterPage.tsx',
                ],
            },
            {
                name: 'RadioGroup',
                components: [
                    './src/@sbbol/web-library/desktop/components/Radio/RadioXGroup.tsx',
                    './src/@sbbol/web-library/desktop/components/Radio/RadioYGroup.tsx',
                ],
            },
            {
                name: 'SegmentedControl',
                components: [
                    './src/@sbbol/web-library/desktop/components/SegmentedControl/SegmentedControl.tsx',
                ],
            },
            {
                name: 'Skeleton',
                components: ['./src/@sbbol/web-library/desktop/components/Skeleton/Skeleton.tsx'],
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
                        content: './styleguidist/desktop/components/AmountCurrencySelect/AmountCurrencySelect.md',
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
                        components: ['./src/@sbbol/web-library/desktop/components/Spinner/Spinner.tsx'],
                    },
                    {
                        name: 'SpinnerWidget',
                        components: ['./src/@sbbol/web-library/desktop/components/SpinnerWidget/SpinnerWidget.tsx'],
                    },
                ],
            },
            {
                name: 'Spoiler',
                components: ['./src/@sbbol/web-library/desktop/components/Spoiler/Spoiler.tsx'],
            },
            {
                name: 'StatusTracker',
                content: './styleguidist/desktop/components/StatusTracker/StatusTracker.md',
            },
            {
                name: 'Suggest',
                sections: [
                    {
                        name: 'Async',
                        content: './styleguidist/desktop/components/Suggest/AsyncExample/SuggestAsyncExample.md',
                    },
                    {
                        name: 'Sync',
                        content: './styleguidist/desktop/components/Suggest/SyncExample/SuggestSyncExample.md',
                    },
                    {
                        name: 'Custom',
                        content: './styleguidist/desktop/components/Suggest/CustomExample/CustomExample.md',
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
                components: ['./src/@sbbol/web-library/desktop/components/TabsExtended/TabsExtended.tsx'],
            },
            {
                name: 'TabsFolder',
                components: ['./src/@sbbol/web-library/desktop/components/TabsFolder/TabsFolder.tsx'],
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
                name: 'Tooltip',
                components: ['./src/@sbbol/web-library/desktop/components/Tooltip/Tooltip.tsx'],
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
                components: ['./src/@sbbol/web-library/desktop/components/XStepper/XStepper.tsx'],
            },
            {
                name: 'Widget',
                components: ['./src/@sbbol/web-library/desktop/components/Widget/Widget.tsx'],
            },
        ],
    },
    {
        name: 'Mobile Components',
        sections: [
            {
                name: 'Buttons',
                components: [
                    './src/@sbbol/web-library/mobile/components/Button/ButtonGeneral.tsx',
                    './src/@sbbol/web-library/mobile/components/Button/ButtonSecondary.tsx',
                    './src/@sbbol/web-library/mobile/components/Button/ButtonDanger.tsx',
                ],
            },
            {
                name: 'Inputs',
                components: ['./src/@sbbol/web-library/mobile/components/input/Input/Input.tsx'],
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
                    }
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
                name: 'Col',
                content: './styleguidist/test-examples/desktop/Col/Col.md',
            },
            {
                name: 'DatePicker',
                content: './styleguidist/test-examples/desktop/DatePicker/DatePicker.md',
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
