//TODO: Необходимо переписать компоненты, которые завязаны на эту логику и затем удалить файл.

import {isComponentType, isReactElement, isReactText} from '@sberbusiness/triplex/desktop/utils/reactChild';
import * as React from 'react';
import {compact} from '@sberbusiness/triplex/desktop/utils/compact';

/**
 * Конфиг для проверки структуры дочерних элементов.
 *
 * @prop {IReorderConfigOrderItem[]} order Массив компонент, отражающий порядок, в котором их следует отсортировать.
 * @prop {React.ComponentType<any>} [defaultWrapper] Обёртка по умолчанию для потомков (используется только если не найдено ни одного потомка из order).
 */
export interface IReorderConfig {
    order: IReorderConfigOrderItem[];
    defaultWrapper?: React.ComponentType<any>;
}

// Тип отсортированных чилдренов.
export type TOrderedChildren = Array<React.ReactElement<any> | null>;

/**
 * Конфиг для определения обязательности элемента в разметке.
 *
 * @prop {React.ComponentType<any> | Array<React.ComponentType<any>>} type Тип или массив типов элемента.
 * @prop {boolean} required Обязательный ли.
 */
export interface IReorderConfigOrderItem {
    type: React.ComponentType<any> | Array<React.ComponentType<any>>;
    required: boolean;
}

/**
 *  Проверяет, что реакт-нода является либо текстом, либо обычным элементом.
 *
 * @param {React.ReactNode} child Дочерний элемент для проверки.
 */
const isReactChild = (child: React.ReactNode): child is React.ReactChild => isReactElement(child) || isReactText(child);

/**
 *  Проверяет, что реакт-нода является пустой.
 *
 * @param {React.ReactNode} child Дочерний элемент для проверки.
 */
const isEmptyNode = (child: React.ReactNode): child is false | null | undefined => child === false || child === null || child === undefined;

/**
 * Проверяет, что реакт-нода является массивом обычных реакт-элементов.
 *
 * @param {React.ReactNode} child Дочерний элемент для проверки.
 */
const isReactChildArray = (child: React.ReactNode): child is React.ReactChild[] => {
    if (child instanceof Array) {
        for (let i = 0, n = child.length; i < n; i++) {
            if (!isReactChild(child[i])) {
                return false;
            }
        }
        return true;
    }
    return false;
};

/**
 * Поиск индекса фильтра, в котором определён конкретный тип.
 * @param strictlyTypes Массив из фильтров по типам.
 * @param findType Тип компонента, который необходимо найти.
 */
const findIndex = (strictlyTypes: Array<Array<React.ComponentType<any>>>, findType: React.ComponentType<any>): number => {
    for (let stIndex = 0; stIndex < strictlyTypes.length; stIndex++) {
        for (const type of strictlyTypes[stIndex]) {
            if (type === findType) {
                return stIndex;
            }
        }
    }
    return -1;
};

/**
 * Проверка дочерних элементов.
 * @param {React.ReactNode} children Дочерние элементы.
 */
const getChildrenElements = (children: React.ReactNode): React.ReactChild[] => {
    if (isReactChild(children)) {
        return [children];
    } else {
        if (children instanceof Array) {
            children = compact(children);
        }
        if (isReactChildArray(children)) {
            return children;
        } else {
            throw new Error('Unexpected children');
        }
    }
};

/**
 * Отсортировать дочерние элементы в заданном порядке и проверить наличие обязательных. В случае полного отсуствия
 * элементов из кофигурации, есть возможность обернуть разметку в контейнер по умолчанию.
 *
 * @param {IReorderConfig} config Прядок, в котором следует отсортировать элементы.
 * @param {React.ReactNode} children Дочерние элементы.
 * @return {React.ReactNode} Дочерние элементы в порядке, указанном в конфиге (если это необязательный элемент
 * и его нет среди чилдов, то в этом месте в массиве будет null, то есть сделать compact - это уже на усмотрение
 * компонента, использующего данную утилиту).
 */
export const reorderAndCheckChildrenDeprecated = (config: IReorderConfig, children: React.ReactNode): TOrderedChildren => {
    const {order, defaultWrapper} = config;

    if (isEmptyNode(children)) {
        return [null];
    }

    // Массив дочерних элементов.
    const elements = getChildrenElements(children);

    let i;
    let n = order.length;
    const strictlyTypes: Array<Array<React.ComponentType<any>>> = new Array<Array<React.ComponentType<any>>>(n); // Массив по которому будем искать классы.
    const orderedResult: TOrderedChildren = new Array<React.ReactElement<any> | null>(n); // Отсортированный массив.

    // Формируем массив для поиска.
    for (i = 0; i < n; i++) {
        const type = order[i].type;
        strictlyTypes[i] = Array.isArray(type) ? type : [type];
        orderedResult[i] = null;
    }

    if (defaultWrapper) {
        // Случай, когда в компонент может передаваться как строгая, так и произвольная разметка (оборачиваемая в контейнер по умолчанию).
        let counter = 0; // Количество найденных структурных элементов.
        for (i = 0, n = elements.length; i < n; i++) {
            let idx;
            const child = elements[i];

            if (
                isReactElement(child) &&
                isComponentType(child.type) &&
                // tslint:disable-next-line
                (idx = findIndex(strictlyTypes, child.type)) !== -1
            ) {
                counter++;
                if (orderedResult[idx]) {
                    throw new Error(`You can use only one <${child.type.displayName || ''}/> element`);
                }
                orderedResult[idx] = child;
            } else if (counter) {
                // Поскольку каунтер не пустой, значит ранее был найден структурный (то есть указанный в конфиге) элемент,
                // но сейчас явно попался элемент кастомной разметки, то есть получается у нас каша из структурных
                // и не структурных элементов, а это явная ошибка.
                throw new Error(`You can use only the strong structure or only other markup, but not mixed \n ${JSON.stringify(config)}`);
            }
        }

        if (!counter) {
            // Вся разметка кастомная, не надо ничего проверять, просто оборачиваем в контейнер по умолчанию и возвращаем.
            const idx: number = findIndex(strictlyTypes, defaultWrapper);
            const wrapped = React.createElement(defaultWrapper, {}, ...elements);
            if (idx === -1) {
                // Контейнер по умолчанию не используется в строгой структуре.
                return [wrapped];
            }
            // Если контейнер по умолчанию, всё-таки является частью строгой структуры, то нужно эту структуру сохранить.
            orderedResult[idx] = wrapped; // Тут будет массив с null-ами кроме одного места, где должен быть контейнер по умолчанию.
            return orderedResult;
        }
    } else {
        // Случай, когда у нас исключительно строгая разметка.
        for (i = 0, n = elements.length; i < n; i++) {
            let idx;
            const child = elements[i];
            if (
                isReactElement(child) &&
                isComponentType(child.type) &&
                // tslint:disable-next-line
                (idx = findIndex(strictlyTypes, child.type)) !== -1
            ) {
                if (orderedResult[idx]) {
                    throw new Error(`You can use only one <${child.type.displayName || ''}/> element`);
                }
                orderedResult[idx] = child;
            } else {
                throw new Error(`You can use only the specified element types. \n ${JSON.stringify(config)}`);
            }
        }
    }

    // Итак у нас есть отсортированные дочерние элементы, теперь проверим, что обязательные присутствуют.
    for (i = 0, n = order.length; i < n; i++) {
        if (order[i].required && !orderedResult[i]) {
            const type = order[i].type;
            throw new Error(
                `Required element ${(Array.isArray(type) ? type : [type]).map((x) => `<${x.displayName || ''}/>`).toString()} not found`
            );
        }
    }

    return orderedResult;
};
