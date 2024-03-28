import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import StyleGuide from 'react-styleguidist/lib/client/rsg-components/StyleGuide/StyleGuide';
import {isIE} from './utils';

// Подгружаем заранее собранные стили.
import '@sberbusiness/triplex/styles/styles.css';

// Имя класса, добавляемого к body, когда styleguidist открыт в режиме просмотра из styleGuide.
const styleguidistLiveClassName = 'styleguidist-live';

// Устанавливаем российскую локаль.
moment.locale('ru');

const StyleGuideWrapper: React.FC<any> = (props) => {
    useEffect(() => {
        const {hash} = document.location;

        if (hash.includes('styleguideLive=true')) {
            document.body.classList.add(styleguidistLiveClassName);
        }
        if (!isIE && hash.includes('axe=true')) {
            // подключение библиотеки тестирования Accessibility
            const axe = require('@axe-core/react');
            axe(React, ReactDOM, 1000);
        }

        // Переменная передает окружение в GTM.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.GTM_ENV_TYPE = process.env.NODE_ENV;

        return () => {
            document.body.classList.remove(styleguidistLiveClassName);
        };
    }, []);

    return <StyleGuide {...props} />;
};

export default StyleGuideWrapper;
