// Токены локальных компонентов Triplex.
import {TDesignTokensComponents} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokensTypes';
import {ETriplexTheme} from '@sberbusiness/triplex/components/ThemeProvider/ETriplexTheme';
import {GetTokensValueByTheme} from '@sberbusiness/triplex/components/DesignTokens/GetTokensValueByTheme';
import {
    AccordionForm_Tokens,
    AccordionView_Tokens,
    AlertContext_Tokens,
    AlertProcess_Tokens,
    Body_Tokens,
    Button_Tokens,
    Calendar_Tokens,
    Card_Tokens,
    Checkbox_Tokens,
    Confirm_Tokens,
    Divider_Tokens,
    SmallInput_Tokens,
    Dropdown_Tokens,
    DropdownList_Tokens,
    Footer_Tokens,
    FormField_Tokens,
    Header_Tokens,
    Input_Tokens,
    Label_Tokens,
    LightBox_Tokens,
    Link_Tokens,
    Marker_Tokens,
    MarkerStatus_Tokens,
    Multiselect_Tokens,
    Notification_Tokens,
    Radio_Tokens,
    SegmentedControl_Tokens,
    Select_Tokens,
    Skeleton_Tokens,
    Slider_DM,
    SMSInput_Tokens,
    Spinner_Tokens,
    Spoiler_Tokens,
    Stepper_Tokens,
    TableBasic_Tokens,
    Tabs_Tokens,
    TabsFolder_Tokens,
    Tag_Tokens,
    Text_Tokens,
    Title_Tokens,
    Tooltip_Tokens,
    TopOverlay_Tokens,
    UnorderedList_Tokens,
    UploadZone_Tokens,
    Widget_Tokens,
    TDesignTokensComponentsAccordionFormValue,
    TDesignTokensComponentsAccordionViewValue,
    TDesignTokensComponentsAlertContextValue,
    TDesignTokensComponentsAlertProcessValue,
    TDesignTokensComponentsBodyValue,
    TDesignTokensComponentsButtonValue,
    TDesignTokensComponentsCalendarValue,
    TDesignTokensComponentsCardValue,
    TDesignTokensComponentsCheckboxValue,
    TDesignTokensComponentsConfirmValue,
    TDesignTokensComponentsDividerValue,
    TDesignTokensComponentsSmallInputValue,
    TDesignTokensComponentsDropdownListValue,
    TDesignTokensComponentsDropdownValue,
    TDesignTokensComponentsFooterValue,
    TDesignTokensComponentsFormFieldValue,
    TDesignTokensComponentsHeaderValue,
    TDesignTokensComponentsInputValue,
    TDesignTokensComponentsLabelValue,
    TDesignTokensComponentsLightBoxValue,
    TDesignTokensComponentsLinkValue,
    TDesignTokensComponentsMarkerValue,
    TDesignTokensComponentsMarkerStatusValue,
    TDesignTokensComponentsMultiselectValue,
    TDesignTokensComponentsNotificationValue,
    TDesignTokensComponentsRadioValue,
    TDesignTokensComponentsSegmentedControlValue,
    TDesignTokensComponentsSelectValue,
    TDesignTokensComponentsSkeletonValue,
    TDesignTokensComponentsSMSInputValue,
    TDesignTokensComponentsSpinnerValue,
    TDesignTokensComponentsSpoilerValue,
    TDesignTokensComponentsStepperValue,
    TDesignTokensComponentsTableBasicValue,
    TDesignTokensComponentsTabsValue,
    TDesignTokensComponentsTabsFolderValue,
    TDesignTokensComponentsTagValue,
    TDesignTokensComponentsTextValue,
    TDesignTokensComponentsTitleValue,
    TDesignTokensComponentsTooltipValue,
    TDesignTokensComponentsTopOverlayValue,
    TDesignTokensComponentsUnorderedListValue,
    TDesignTokensComponentsUploadZoneValue,
    TDesignTokensComponentsWidgetValue,
} from '@sberbusiness/triplex/components/DesignTokens/components';

export const DesignTokensComponentsThemeDark: TDesignTokensComponents = {
    AccordionForm: GetTokensValueByTheme<TDesignTokensComponentsAccordionFormValue>(ETriplexTheme.DARK, AccordionForm_Tokens),
    AccordionView: GetTokensValueByTheme<TDesignTokensComponentsAccordionViewValue>(ETriplexTheme.DARK, AccordionView_Tokens),
    AlertContext: GetTokensValueByTheme<TDesignTokensComponentsAlertContextValue>(ETriplexTheme.DARK, AlertContext_Tokens),
    AlertProcess: GetTokensValueByTheme<TDesignTokensComponentsAlertProcessValue>(ETriplexTheme.DARK, AlertProcess_Tokens),
    backdrop: {
        background: {
            value: 'rgba(45, 45, 48, 0.8)', //     var(--triplex-backdrop-background)
        },
    },
    Body: GetTokensValueByTheme<TDesignTokensComponentsBodyValue>(ETriplexTheme.DARK, Body_Tokens),
    Button: GetTokensValueByTheme<TDesignTokensComponentsButtonValue>(ETriplexTheme.DARK, Button_Tokens),
    Calendar: GetTokensValueByTheme<TDesignTokensComponentsCalendarValue>(ETriplexTheme.DARK, Calendar_Tokens),
    Card: GetTokensValueByTheme<TDesignTokensComponentsCardValue>(ETriplexTheme.DARK, Card_Tokens),
    Checkbox: GetTokensValueByTheme<TDesignTokensComponentsCheckboxValue>(ETriplexTheme.DARK, Checkbox_Tokens),
    Confirm: GetTokensValueByTheme<TDesignTokensComponentsConfirmValue>(ETriplexTheme.DARK, Confirm_Tokens),
    Divider: GetTokensValueByTheme<TDesignTokensComponentsDividerValue>(ETriplexTheme.DARK, Divider_Tokens),
    Dropdown: GetTokensValueByTheme<TDesignTokensComponentsDropdownValue>(ETriplexTheme.DARK, Dropdown_Tokens),
    DropdownList: GetTokensValueByTheme<TDesignTokensComponentsDropdownListValue>(ETriplexTheme.DARK, DropdownList_Tokens),
    Footer: GetTokensValueByTheme<TDesignTokensComponentsFooterValue>(ETriplexTheme.DARK, Footer_Tokens),
    FormField: GetTokensValueByTheme<TDesignTokensComponentsFormFieldValue>(ETriplexTheme.DARK, FormField_Tokens),
    Header: GetTokensValueByTheme<TDesignTokensComponentsHeaderValue>(ETriplexTheme.DARK, Header_Tokens),
    Input: GetTokensValueByTheme<TDesignTokensComponentsInputValue>(ETriplexTheme.DARK, Input_Tokens),
    Label: GetTokensValueByTheme<TDesignTokensComponentsLabelValue>(ETriplexTheme.DARK, Label_Tokens),
    LightBox: GetTokensValueByTheme<TDesignTokensComponentsLightBoxValue>(ETriplexTheme.DARK, LightBox_Tokens),
    Link: GetTokensValueByTheme<TDesignTokensComponentsLinkValue>(ETriplexTheme.DARK, Link_Tokens),
    Marker: GetTokensValueByTheme<TDesignTokensComponentsMarkerValue>(ETriplexTheme.DARK, Marker_Tokens),
    MarkerStatus: GetTokensValueByTheme<TDesignTokensComponentsMarkerStatusValue>(ETriplexTheme.DARK, MarkerStatus_Tokens),
    Multiselect: GetTokensValueByTheme<TDesignTokensComponentsMultiselectValue>(ETriplexTheme.DARK, Multiselect_Tokens),
    Notification: GetTokensValueByTheme<TDesignTokensComponentsNotificationValue>(ETriplexTheme.DARK, Notification_Tokens),
    overlay: {
        maskBackground: {
            value: 'rgba(24, 24, 25, 0.8)', //     var(--triplex-overlay-maskBackground)
        },
    },
    Radio: GetTokensValueByTheme<TDesignTokensComponentsRadioValue>(ETriplexTheme.DARK, Radio_Tokens),
    SegmentedControl: GetTokensValueByTheme<TDesignTokensComponentsSegmentedControlValue>(ETriplexTheme.DARK, SegmentedControl_Tokens),
    Select: GetTokensValueByTheme<TDesignTokensComponentsSelectValue>(ETriplexTheme.DARK, Select_Tokens),
    Skeleton: GetTokensValueByTheme<TDesignTokensComponentsSkeletonValue>(ETriplexTheme.DARK, Skeleton_Tokens),
    Slider: Slider_DM,
    SmallInput: GetTokensValueByTheme<TDesignTokensComponentsSmallInputValue>(ETriplexTheme.DARK, SmallInput_Tokens),
    SMSInput: GetTokensValueByTheme<TDesignTokensComponentsSMSInputValue>(ETriplexTheme.DARK, SMSInput_Tokens),
    Spinner: GetTokensValueByTheme<TDesignTokensComponentsSpinnerValue>(ETriplexTheme.DARK, Spinner_Tokens),
    Spoiler: GetTokensValueByTheme<TDesignTokensComponentsSpoilerValue>(ETriplexTheme.DARK, Spoiler_Tokens),
    Stepper: GetTokensValueByTheme<TDesignTokensComponentsStepperValue>(ETriplexTheme.DARK, Stepper_Tokens),
    TableBasic: GetTokensValueByTheme<TDesignTokensComponentsTableBasicValue>(ETriplexTheme.DARK, TableBasic_Tokens),
    Tabs: GetTokensValueByTheme<TDesignTokensComponentsTabsValue>(ETriplexTheme.DARK, Tabs_Tokens),
    TabsFolder: GetTokensValueByTheme<TDesignTokensComponentsTabsFolderValue>(ETriplexTheme.DARK, TabsFolder_Tokens),
    Tag: GetTokensValueByTheme<TDesignTokensComponentsTagValue>(ETriplexTheme.DARK, Tag_Tokens),
    Text: GetTokensValueByTheme<TDesignTokensComponentsTextValue>(ETriplexTheme.DARK, Text_Tokens),
    Title: GetTokensValueByTheme<TDesignTokensComponentsTitleValue>(ETriplexTheme.DARK, Title_Tokens),
    Tooltip: GetTokensValueByTheme<TDesignTokensComponentsTooltipValue>(ETriplexTheme.DARK, Tooltip_Tokens),
    TopOverlay: GetTokensValueByTheme<TDesignTokensComponentsTopOverlayValue>(ETriplexTheme.DARK, TopOverlay_Tokens),
    UnorderedList: GetTokensValueByTheme<TDesignTokensComponentsUnorderedListValue>(ETriplexTheme.DARK, UnorderedList_Tokens),
    UploadZone: GetTokensValueByTheme<TDesignTokensComponentsUploadZoneValue>(ETriplexTheme.DARK, UploadZone_Tokens),
    Widget: GetTokensValueByTheme<TDesignTokensComponentsWidgetValue>(ETriplexTheme.DARK, Widget_Tokens),
};
