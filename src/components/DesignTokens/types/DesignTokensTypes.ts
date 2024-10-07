import {TDesignTokenValue} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';
import {
    TDesignTokensComponentsAccordionForm,
    TDesignTokensComponentsAccordionView,
    TDesignTokensComponentsAlertContext,
    TDesignTokensComponentsAlertProcess,
    TDesignTokensComponentsBody,
    TDesignTokensComponentsButton,
    TDesignTokensComponentsCalendar,
    TDesignTokensComponentsCard,
    TDesignTokensComponentsCheckbox,
    TDesignTokensComponentsChip,
    TDesignTokensComponentsConfirm,
    TDesignTokensComponentsDivider,
    TDesignTokensComponentsSmallInput,
    TDesignTokensComponentsDropdown,
    TDesignTokensComponentsDropdownList,
    TDesignTokensComponentsDropdownMobile,
    TDesignTokensComponentsDropdownMobileList,
    TDesignTokensComponentsFooter,
    TDesignTokensComponentsFormField,
    TDesignTokensComponentsHeader,
    TDesignTokensComponentsInput,
    TDesignTokensComponentsLabel,
    TDesignTokensComponentsLightBox,
    TDesignTokensComponentsLink,
    TDesignTokensComponentsListItem,
    TDesignTokensComponentsListItemControlsButton,
    TDesignTokensComponentsListMaster,
    TDesignTokensComponentsMarker,
    TDesignTokensComponentsMarkerStatus,
    TDesignTokensComponentsMultiselect,
    TDesignTokensComponentsNotification,
    TDesignTokensComponentsRadio,
    TDesignTokensComponentsSegmentedControl,
    TDesignTokensComponentsSelect,
    TDesignTokensComponentsSkeleton,
    TDesignTokensComponentsSlider,
    TDesignTokensComponentsSMSInput,
    TDesignTokensComponentsSpinner,
    TDesignTokensComponentsSpoiler,
    TDesignTokensComponentsStep,
    TDesignTokensComponentsStepper,
    TDesignTokensComponentsTableBasic,
    TDesignTokensComponentsTabs,
    TDesignTokensComponentsTabsFolder,
    TDesignTokensComponentsTag,
    TDesignTokensComponentsText,
    TDesignTokensComponentsTitle,
    TDesignTokensComponentsTooltip,
    TDesignTokensComponentsTopOverlay,
    TDesignTokensComponentsUnorderedList,
    TDesignTokensComponentsUploadZone,
    TDesignTokensComponentsWidget,
} from '@sberbusiness/triplex/components/DesignTokens/components';

// Название токенов группы Primary.
export const designTokensCoreGroupPrimaryKeys = ['900', '700', '500', '300', '100'] as const;
// Название токенов группы Neutral.
export const designTokensCoreGroupNeutralKeys = ['900', '700', '500', '300', '100'] as const;
// Название токенов группы Basic.
export const designTokensCoreGroupBasicKeys = ['900', '700', '500', '300', '100', '0'] as const;
// Название токенов группы Error.
export const designTokensCoreGroupErrorKeys = ['900', '700', '500', '300', '100'] as const;
// Название токенов группы Warning.
export const designTokensCoreGroupWarningKeys = ['900', '700', '500', '300', '100'] as const;
// Название токенов группы Info.
export const designTokensCoreGroupInfoKeys = ['900', '700', '500', '300', '100'] as const;
// Название токенов группы Accent.
export const designTokensCoreGroupAccentKeys = ['500'] as const;

// Название токенов компонента Backdrop.
export const designTokensComponentsBackdropKeys = ['background'] as const;
// Название токенов компонента Overlay.
export const designTokensComponentsOverlayKeys = ['maskBackground'] as const;
// Название токенов компонента TabsExtended.
export const designTokensComponentsTabsExtendedKeys = ['tabBackground', 'tabHoverBackground', 'tabSelectedBackground'] as const;

// Тип, содержащий названия токенов группы Primary.
export type TDesignTokensCoreGroupPrimaryKeys = (typeof designTokensCoreGroupPrimaryKeys)[number];
// Тип, содержащий названия токенов группы Neutral.
export type TDesignTokensCoreGroupNeutralKeys = (typeof designTokensCoreGroupNeutralKeys)[number];
// Тип, содержащий названия токенов группы Basic.
export type TDesignTokensCoreGroupBasicKeys = (typeof designTokensCoreGroupBasicKeys)[number];
// Тип, содержащий названия токенов группы Error.
export type TDesignTokensCoreGroupErrorKeys = (typeof designTokensCoreGroupErrorKeys)[number];
// Тип, содержащий названия токенов группы Warning.
export type TDesignTokensCoreGroupWarningKeys = (typeof designTokensCoreGroupWarningKeys)[number];
// Тип, содержащий названия токенов группы Info.
export type TDesignTokensCoreGroupInfoKeys = (typeof designTokensCoreGroupInfoKeys)[number];
// Тип, содержащий названия токенов группы Accent.
export type TDesignTokensCoreGroupAccentKeys = (typeof designTokensCoreGroupAccentKeys)[number];

// Тип, содержащий названия токенов компонента Backdrop.
export type TDesignTokensComponentsBackdropKeys = (typeof designTokensComponentsBackdropKeys)[number];

// Тип, содержащий названия токенов компонента Overlay.
export type TDesignTokensComponentsOverlayKeys = (typeof designTokensComponentsOverlayKeys)[number];
// Тип, содержащий названия токенов компонента TabsExtended.
export type TDesignTokensComponentsTabsExtendedKeys = (typeof designTokensComponentsTabsExtendedKeys)[number];

// Тип, содержащий названия токенов группы Primary и их значения.
export type TDesignTokensCoreGroupPrimaryValue = Record<TDesignTokensCoreGroupPrimaryKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов группы Neutral и их значения.
export type TDesignTokensCoreGroupNeutralValue = Record<TDesignTokensCoreGroupNeutralKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов группы Basic и их значения.
export type TDesignTokensCoreGroupBasicValue = Record<TDesignTokensCoreGroupBasicKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов группы Error и их значения.
export type TDesignTokensCoreGroupErrorValue = Record<TDesignTokensCoreGroupErrorKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов группы Warning и их значения.
export type TDesignTokensCoreGroupWarningValue = Record<TDesignTokensCoreGroupWarningKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов группы Info и их значения.
export type TDesignTokensCoreGroupInfoValue = Record<TDesignTokensCoreGroupInfoKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов группы Accent и их значения.
export type TDesignTokensCoreGroupAccentValue = Record<TDesignTokensCoreGroupAccentKeys, TDesignTokenValue>;

// Тип, содержащий названия токенов компонента Backdrop и их значения.
export type TDesignTokensComponentsBackdropValue = Record<TDesignTokensComponentsBackdropKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Overlay и их значения.
export type TDesignTokensComponentsOverlayValue = Record<TDesignTokensComponentsOverlayKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента TabsExtended и их значения.
export type TDesignTokensComponentsTabsExtendedValue = Record<TDesignTokensComponentsTabsExtendedKeys, TDesignTokenValue>;

// Тип токенов группы Primary.
export type TDesignTokensCoreGroupPrimary = {Primary: TDesignTokensCoreGroupPrimaryValue};
// Тип токенов группы Neutral.
export type TDesignTokensCoreGroupNeutral = {Neutral: TDesignTokensCoreGroupNeutralValue};
// Тип токенов группы Basic.
export type TDesignTokensCoreGroupBasic = {Basic: TDesignTokensCoreGroupBasicValue};
// Тип токенов группы Error.
export type TDesignTokensCoreGroupError = {Error: TDesignTokensCoreGroupErrorValue};
// Тип токенов группы Warning.
export type TDesignTokensCoreGroupWarning = {Warning: TDesignTokensCoreGroupWarningValue};
// Тип токенов группы Info.
export type TDesignTokensCoreGroupInfo = {Info: TDesignTokensCoreGroupInfoValue};
// Тип токенов группы Accent.
export type TDesignTokensCoreGroupAccent = {Accent: TDesignTokensCoreGroupAccentValue};

// Тип локальных токенов компонента Backdrop.
export type TDesignTokensComponentsBackdrop = {Backdrop: TDesignTokensComponentsBackdropValue};
// Тип локальных токенов компонента Overlay.
export type TDesignTokensComponentsOverlay = {Overlay: TDesignTokensComponentsOverlayValue};

// Тип глобальных токенов.
export type TDesignTokensCore = TDesignTokensCoreGroupPrimary &
    TDesignTokensCoreGroupNeutral &
    TDesignTokensCoreGroupBasic &
    TDesignTokensCoreGroupError &
    TDesignTokensCoreGroupWarning &
    TDesignTokensCoreGroupInfo &
    TDesignTokensCoreGroupAccent;

// Тип локальных токенов(токенов компонентов).
export type TDesignTokensComponents = TDesignTokensComponentsAccordionForm &
    TDesignTokensComponentsAccordionView &
    TDesignTokensComponentsAlertContext &
    TDesignTokensComponentsAlertProcess &
    TDesignTokensComponentsBackdrop &
    TDesignTokensComponentsBody &
    TDesignTokensComponentsButton &
    TDesignTokensComponentsCalendar &
    TDesignTokensComponentsCard &
    TDesignTokensComponentsCheckbox &
    TDesignTokensComponentsChip &
    TDesignTokensComponentsConfirm &
    TDesignTokensComponentsDivider &
    TDesignTokensComponentsDropdown &
    TDesignTokensComponentsDropdownList &
    TDesignTokensComponentsDropdownMobile &
    TDesignTokensComponentsDropdownMobileList &
    TDesignTokensComponentsFooter &
    TDesignTokensComponentsFormField &
    TDesignTokensComponentsHeader &
    TDesignTokensComponentsInput &
    TDesignTokensComponentsLabel &
    TDesignTokensComponentsLightBox &
    TDesignTokensComponentsLink &
    TDesignTokensComponentsListItem &
    TDesignTokensComponentsListItemControlsButton &
    TDesignTokensComponentsListMaster &
    TDesignTokensComponentsMarker &
    TDesignTokensComponentsMarkerStatus &
    TDesignTokensComponentsMultiselect &
    TDesignTokensComponentsNotification &
    TDesignTokensComponentsOverlay &
    TDesignTokensComponentsRadio &
    TDesignTokensComponentsSegmentedControl &
    TDesignTokensComponentsSelect &
    TDesignTokensComponentsSkeleton &
    TDesignTokensComponentsSlider &
    TDesignTokensComponentsSmallInput &
    TDesignTokensComponentsSMSInput &
    TDesignTokensComponentsSpinner &
    TDesignTokensComponentsSpoiler &
    TDesignTokensComponentsStep &
    TDesignTokensComponentsStepper &
    TDesignTokensComponentsTableBasic &
    TDesignTokensComponentsTabs &
    TDesignTokensComponentsTabsFolder &
    TDesignTokensComponentsTag &
    TDesignTokensComponentsText &
    TDesignTokensComponentsTitle &
    TDesignTokensComponentsTooltip &
    TDesignTokensComponentsTopOverlay &
    TDesignTokensComponentsUnorderedList &
    TDesignTokensComponentsUploadZone &
    TDesignTokensComponentsWidget;

// Тип токенов, включающий core токены и токены компонентов.
export type TDesignTokens = TDesignTokensCore & TDesignTokensComponents;

type TCreatePartialTokens<Type> = {
    [Property in keyof Type]?: TCreatePartialTokens<Type[Property]>;
};

// Тип токенов, включающий core токены и токены компонентов со всеми не обязательными свойствами.
export type TDesignTokensPartial = TCreatePartialTokens<TDesignTokens>;

// Тип, чтобы можно было итерировать объекты типа TDesignTokensCore;
export type TDesignTokensCoreWithIndex = TDesignTokensCore & {
    [key: string]: {
        [key: string]: TDesignTokenValue;
    };
};

// Тип, чтобы можно было итерировать объекты типа TDesignTokensComponents;
export type TDesignTokensComponentsWithIndex = TDesignTokensComponents & {
    [key: string]: {
        [key: string]: TDesignTokenValue;
    };
};

// Абстрактный тип группы токенов, не привязанный к названиям токенов.
export type TDesignTokensGroupAbstract = {
    [tokenGroup: string]: {
        [tokenTitle: string]: TDesignTokenValue;
    };
};
