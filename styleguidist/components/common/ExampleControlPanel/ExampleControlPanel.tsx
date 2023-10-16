import React from 'react';
import ThemeSwitcher from './components/ThemeSwitcher';
import {isIE} from '../../../config/components/utils';
import './styles.less';

/** Свойства панели управления. */
interface IControlPanelProps {
    /** Поддержка темизации. */
    themed?: boolean;
}

/** Свойства элемента на панели управления. */
interface IControlElementProps {
    /** Информация для подписи элемента. */
    'data-label': string;
}

interface IInputControlElement extends React.ReactElement<React.InputHTMLAttributes<HTMLInputElement> & IControlElementProps> {}
interface ISelectControlElement extends React.ReactElement<React.SelectHTMLAttributes<HTMLSelectElement> & IControlElementProps> {}

type TControlElement = IInputControlElement | ISelectControlElement;

/** Панель управления для примера компонента. */
export const ExampleControlPanel: React.FC<IControlPanelProps> = ({children, themed}) => {
    const count = React.Children.count(children);

    const renderThemeSwitcher = () => {
        if (themed && !isIE) {
            return <ThemeSwitcher />;
        }
    };

    const wrapControlElement = (left: TControlElement | string, right: TControlElement | string) => (
        // eslint-disable-next-line jsx-a11y/label-has-for
        <label>
            {left}
            {right}
        </label>
    );

    const isInputElement = (element: TControlElement): element is IInputControlElement => element.type === 'input';
    const isSelectElement = (element: TControlElement): element is ISelectControlElement => element.type === 'select';

    const renderControlElement = (element: TControlElement) => {
        const {'data-label': label} = element.props;

        if (isInputElement(element)) {
            return element.props.type === 'checkbox' || element.props.type === 'radio'
                ? wrapControlElement(element, label)
                : wrapControlElement(label, element);
        }

        if (isSelectElement(element)) {
            return wrapControlElement(label, element);
        }

        return element;
    };

    const renderControlElements = () =>
        React.Children.map(children, (child, index) => {
            if (React.isValidElement(child)) {
                return (
                    <>
                        {renderControlElement(child)}
                        {index + 1 < count && <br />}
                    </>
                );
            }
        });

    return (
        <fieldset className="example-control-panel">
            <legend>Settings</legend>
            {renderThemeSwitcher()}
            {renderControlElements()}
        </fieldset>
    );
};
