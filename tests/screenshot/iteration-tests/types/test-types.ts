import {IStyleguidistURLOptionsProps} from '../../../../common/types/styleguidist-preview-options';

export type TTestsSource = [string, string, IStyleguidistURLOptionsProps?, number?];

export type TComponentIterationTest = (
    componentName: string,
    cases: [string, IStyleguidistURLOptionsProps?, number?][],
    componentPath?: string
) => void;
