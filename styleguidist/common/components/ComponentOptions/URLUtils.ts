import {IComponentOptionsProps} from './ComponentOptions';
import {IStyleguidistURLOptionsProps} from '../../../../common/types/styleguidist-preview-options';

/**
 * Регулярное выражение для выбора опций из URL.
 */
const URL_OPTIONS_REGEX = /options=(.*})/;

interface IURLUtils {
    getOptionsFromURL: () => IStyleguidistURLOptionsProps | null;
    isComponentPage: () => boolean;
    isMobileComponentPage: () => boolean;
    getComponentTitle: () => string | undefined;
    hasQueryParams: () => boolean;
    updateURLOptionsFromComponent: (props: IStyleguidistURLOptionsProps) => void;
    updateComponentOptionsFromUrl: (props: IComponentOptionsProps) => void;
}

/**
 * Методы работы с URL параметрами Styleguidist.
 */
export const URLUtils: IURLUtils = {
    /**
     * Возвращает объект опций на основе текущего URL.
     */
    getOptionsFromURL: () => {
        const {hash} = document.location;
        let result = null;
        const options = URL_OPTIONS_REGEX.exec(decodeURI(hash));

        // Опции найдены.
        if (options && options[1]) {
            try {
                result = JSON.parse(options[1]) as IStyleguidistURLOptionsProps;
            } catch (err) {
                console.log(`Ошибка парсинга опций из URL - ${err as string}`);
            }
        }

        return result;
    },

    /**
     * Возвращает true, если текущая страница - страница отдельного компонента, а не список компонент. URL опции работают только на странице одного компонента.
     */
    isComponentPage: () => document.location.hash.includes('#!/'),

    /**
     * Возвращает true, если текущая страница - страница отдельного мобильного компонента, а не список компонент.
     */
    isMobileComponentPage: () => decodeURI(document.location.hash).includes('Mobile Components'),

    /**
     * Возвращает название компонента, если текущая страница - страница отдельного компонента
     */
    getComponentTitle: () => {
        if (URLUtils.isComponentPage()) {
            // Выражение для выбора названия компонента из URL.
            const regex = /#!\/(?:.*\/)?([^\?]*)/;
            const m = regex.exec(document.location.hash);

            if (m !== null && m[1]) {
                /**
                 * Вернет ButtonGeneralMD из адресов вида:
                 *  http://localhost:6060/#!/ButtonGeneralMD?options={%22checkboxOptions%22}
                 *  http://localhost:6060/#!/Mobile%20Components/ButtonGeneralMD
                 */
                return m[1];
            }
        }

        return undefined;
    },

    /**
     * Возвращает true, если в хеше есть параметры.
     */
    hasQueryParams: () => document.location.hash.includes('?'),

    /**
     * Добавляет параметры текущих опций в URL.
     */
    updateURLOptionsFromComponent: ({checkboxOptions, inputOptions}) => {
        const nextUrlOptions = {
            checkboxOptions,
            inputOptions,
        };

        let nextUrl = document.location.toString();

        if (URLUtils.getOptionsFromURL()) {
            // Опции в URL есть. Обновление текущий значений опций в URL.
            nextUrl = nextUrl.replace(URL_OPTIONS_REGEX, `options=${JSON.stringify(nextUrlOptions)}`);
        } else {
            const delimiter = URLUtils.hasQueryParams() ? '&' : '?';
            // Опций в URL нет. Добавление опций.
            nextUrl = `${nextUrl}${delimiter}options=${JSON.stringify(nextUrlOptions)}`;
        }

        history.replaceState(null, '', nextUrl);
    },

    /**
     * Обновляет опции компонента на основе данных в URL. Вызывается при загрузке страницы.
     */
    updateComponentOptionsFromUrl: ({checkboxOptions, inputOptions}) => {
        const optionsUrl = URLUtils.getOptionsFromURL();

        if (!optionsUrl) {
            return;
        }

        const {checkboxOptions: checkboxOptionsURL, inputOptions: inputOptionsURL} = optionsUrl;

        if (checkboxOptions && checkboxOptionsURL) {
            checkboxOptions.forEach((option) => {
                checkboxOptionsURL.forEach((urlOption) => {
                    if (option.id === urlOption.id && option.checked !== urlOption.checked) {
                        option.onChange(urlOption.checked);
                    }
                });
            });
        }

        if (inputOptions && inputOptionsURL) {
            inputOptions.forEach((option) => {
                inputOptionsURL.forEach((urlOption) => {
                    if (option.id === urlOption.id && option.value !== urlOption.value) {
                        option.onChange(urlOption.value);
                    }
                });
            });
        }
    },
};
