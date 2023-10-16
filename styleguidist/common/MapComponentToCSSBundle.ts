/**
 * Карта соответствия css бандла и desktop компонентов.
 */
export const mapCSSBundleComponents: Record<string, string[]> = {
    AccordionForm: ['AccordionForm'],
    AccordionView: ['AccordionView'],
    AlertContext: ['AlertContextBase'],
    AlertProcess: [
        'AlertProcessBasicError',
        'AlertProcessBasicInfo',
        'AlertProcessBasicWarning',
        'AlertProcessControlError',
        'AlertProcessControlInfo',
        'AlertProcessControlWarning',
        'AlertProcessLinkError',
        'AlertProcessLinkInfo',
        'AlertProcessLinkWarning',
        'AlertProcessListError',
        'AlertProcessListInfo',
        'AlertProcessListWarning',
    ],
    Amount: ['Amount'],
    AmountCurrencySelect: ['AmountCurrencySelect'],
    AmountInput: ['AmountInput'],
    Body: ['Body', 'ModalWindowBasicLG', 'ModalWindowBasicMD', 'ModalWindowBasicSM', 'Page'],
    Button: [
        'AccordionForm',
        'ButtonDangerMD',
        'ButtonDotsMD',
        'ButtonDotsSM',
        'ButtonDropdown',
        'ButtonDropdownExtended',
        'ButtonGeneralMD',
        'ButtonGeneralMDDropdown',
        'ButtonGeneralSM',
        'ButtonGeneralSMDropdown',
        'ButtonLinkMD',
        'ButtonLinkSM',
        'ButtonSecondaryMD',
        'ButtonSecondaryMDDropdown',
        'ButtonSecondarySM',
        'ButtonSecondarySMDropdown',
        'DatePicker',
        'HeaderPage',
        'HelpBoxLG',
        'HelpBoxSM',
        'LightBox',
        'ModalWindowBasicLG',
        'ModalWindowBasicMD',
        'ModalWindowBasicSM',
        'Notification',
        'Widget',
    ],
    Calendar: ['Calendar', 'DatePicker'],
    Cards: ['CardStatic', 'CardAction', 'CardTableTotal'],
    Checkbox: ['Checkbox', 'CheckboxXGroup', 'CheckboxYGroup'],
    Col: ['Col'],
    DatePicker: ['DatePicker'],
    DocumentNumberEdit: ['DocumentNumberEdit'],
    Dropdown: [
        'ButtonDotsMD',
        'ButtonDotsSM',
        'ButtonDropdown',
        'ButtonDropdownExtended',
        'ButtonGeneralSMDropdown',
        'ButtonGeneralMDDropdown',
        'ButtonSecondarySMDropdown',
        'ButtonSecondaryMDDropdown',
    ],
    Field: ['Field'],
    Footer: ['Footer', 'FooterPage', 'LightBox', 'ModalWindowBasicLG', 'ModalWindowBasicMD', 'ModalWindowBasicSM', 'Page'],
    Gap: ['Gap'],
    Header: ['Header', 'HeaderPage', 'LightBox', 'ModalWindowBasicLG', 'ModalWindowBasicMD', 'ModalWindowBasicSM', 'Page'],
    HelpBox: ['HelpBoxSM', 'HelpBoxLG'],
    Input: ['AmountInput', 'DatePicker', 'Input', 'NumberInput'],
    Label: ['Label'],
    LightBox: ['LightBox'],
    Link: ['HeaderPage', 'Notification'],
    Marker: ['Marker', 'MarkerStatus'],
    MarkerStatus: ['MarkerStatus'],
    MaskedInput: ['DatePicker', 'MaskedInput'],
    ModalWindow: ['ModalWindowBasicLG', 'ModalWindowBasicMD', 'ModalWindowBasicSM'],
    Notification: ['Notification'],
    NumberExtended: ['NumberExtended'],
    NumberInput: ['NumberInput'],
    Page: ['Page'],
    RadioGroup: ['RadioXGroup', 'RadioYGroup'],
    Row: ['Row'],
    SegmentedControl: ['SegmentedControlSingle'],
    Select: ['Select'],
    SelectDeprecated: ['SelectDeprecated'],
    Skeleton: ['Skeleton'],
    SmallInput: ['DocumentNumberEdit'],
    SMSInput: ['SMSInput'],
    Spinner: ['ModalWindowBasicLG', 'ModalWindowBasicMD', 'ModalWindowBasicSM'],
    SpinnerWidget: ['ModalWindowBasicLG', 'ModalWindowBasicMD', 'ModalWindowBasicSM'],
    Spoiler: ['Spoiler'],
    StatusTracker: ['StatusTracker'],
    Step: ['AccordionForm'],
    SubLabel: ['SubLabel'],
    SubRow: ['SubRow'],
    SubValue: ['SubValue'],
    Suggest: ['Suggest'],
    TableBasic: ['MasterTable', 'TableBasic'],
    TableFooter: ['MasterTable', 'TableFooter'],
    Tables: ['MasterTable', 'Tables'],
    Tabs: ['HeaderPage', 'Tabs'],
    TabsFolder: ['TabsFolder'],
    TextArea: ['TextArea'],
    Tooltip: ['HelpBoxSM', 'HelpBoxLG', 'SMSInput'],
    TopOverlay: ['LightBox', 'ModalWindowBasicLG', 'ModalWindowBasicMD', 'ModalWindowBasicSM'],
    Widget: ['Widget'],
};

/**
 * Объект со списком общих css бандлов desktop компонент. На текущий момент общий только один бандл.
 */
export const mapCSSBundleCommonComponents: Record<string, string[]> = {
    styles: [],
};

/**
 * Возвращает имена CSS бандлов на основании имени компонента.
 */
export const getCSSBundlesFromComponentTitle = (componentTitle: string): string[] => {
    const map = mapCSSBundleComponents;

    const arrayBundles = Object.keys(map)
        .map((cssBundleTitle) => {
            if (map[cssBundleTitle] && map[cssBundleTitle].includes(componentTitle)) {
                return `@sberbusiness/triplex/styles/components/${cssBundleTitle}.css`;
            }

            return undefined;
        })
        .filter((i) => Boolean(i));

    return arrayBundles as string[];
};
