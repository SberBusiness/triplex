import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';

/**
 * IE shim
 */
const textProperty = document.createElement('div').textContent !== undefined ? 'textContent' : 'innerText';

interface IProps extends React.HTMLProps<HTMLDivElement> {
    /** Текст который нужно свернуть в троеточие. */
    children: React.ReactText;
    /** Количество строк после которых происходит сворачивание в троеточие. */
    maxLine: number;
}

/**
 * Компонент, для обрезания текста.
 *  - проверяет, помещается ли текст, если нет, то обрезает его до нужного размера и добавляет "..."
 */
export class EllipsisForIE extends React.Component<IProps> {
    static displayName = 'EllipsisForIE';

    componentDidMount(): void {
        this.truncate();
    }

    componentDidUpdate(): void {
        this.truncate();
    }

    /**
     * Метод, обрезающий текст.
     */
    truncate = (): void => {
        const {children} = this.props;

        // eslint-disable-next-line react/no-find-dom-node
        const domElement = ReactDOM.findDOMNode(this) as HTMLDivElement;

        if (!domElement || !textProperty) {
            return;
        }

        const textContent = children.toString();
        if (domElement[textProperty] !== textContent) {
            domElement[textProperty] = textContent;
        }

        if (textContent && this.isOverflowing(domElement)) {
            let successContent = '';
            let left = 0;
            let right = textContent.length;
            let middle = Math.floor(right / 2);

            while (left !== middle) {
                const testContent = `${textContent.substring(0, middle)}...`;
                domElement[textProperty] = testContent;

                if (this.isOverflowing(domElement)) {
                    right = middle;
                } else {
                    left = middle;
                    successContent = testContent;
                }

                middle = Math.floor((left + right) / 2);
            }

            if (domElement.getAttribute(textProperty) !== successContent) {
                domElement[textProperty] = successContent;
            }
        }
    };

    /**
     * Метод, проверяющий необходимость обрезания текста
     */
    isOverflowing(domElement: HTMLDivElement): boolean {
        const {clientHeight, offsetHeight} = domElement;
        const {maxLine} = this.props;
        // Вычисляется максимально доступная высота умножением количества строк на высоту строки.
        const maxHeight = parseInt(getComputedStyle(domElement).lineHeight, 10) * maxLine;
        const visibleHeight = clientHeight || offsetHeight;
        return visibleHeight > maxHeight;
    }

    render(): JSX.Element {
        const {children, className, maxLine, ...rest} = this.props;
        const ellipsisIeClassName = classnames('cssClass[ellipsisIe]', className);

        return (
            <div className={ellipsisIeClassName} {...rest}>
                {children}
            </div>
        );
    }
}
