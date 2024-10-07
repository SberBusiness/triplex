import {ETriplexTheme} from '@sberbusiness/triplex/components/ThemeProvider/ETriplexTheme';
import {Observer} from './Observer';

/**
 * Используется для синхронизации темы Styleguidist и темы примера компонента.
 */
export const ThemeObserver = new Observer<ETriplexTheme>();
