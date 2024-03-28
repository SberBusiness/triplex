import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {CaretdownSrvxIcon16} from '@sberbusiness/icons/CaretdownSrvxIcon16';
import {WidgetHeaderTitle} from './WidgetHeaderTitle';
import {WidgetHeaderControls} from './WidgetHeaderControls';
import {IWidgetHeaderProvideProps} from '../../types';
import {WidgetHeaderContext} from './WidgetHeaderContext';

export enum EWidgetHeaderControlsAlign {
    LEFT,
    RIGHT,
}

/** Свойства компонента WidgetHeader. */
interface IWidgetHeaderProps extends React.HTMLAttributes<HTMLDivElement>, IWidgetHeaderProvideProps {
    controlsAlign?: EWidgetHeaderControlsAlign;
}

export class WidgetHeader extends React.Component<IWidgetHeaderProps> {
    public static displayName = 'WidgetHeader';

    public static defaultProps = {
        controlsAlign: EWidgetHeaderControlsAlign.RIGHT,
    };

    public static Title = WidgetHeaderTitle;
    public static Controls = WidgetHeaderControls;

    public render(): JSX.Element {
        const {animating, ariaAttributes, children, className, controlsAlign, isOpen, isStatic, toggle, ...htmlDivAttributes} = this.props;

        return (
            <WidgetHeaderContext.Provider value={{ariaAttributes, isStatic, toggle}}>
                <div
                    role="heading"
                    aria-level={3}
                    {...htmlDivAttributes}
                    className={classnames(className, 'cssClass[widgetHeader]', {
                        'cssClass[animating]': animating,
                        'cssClass[controlsAlignLeft]': controlsAlign === EWidgetHeaderControlsAlign.LEFT,
                        'cssClass[controlsAlignRight]': controlsAlign === EWidgetHeaderControlsAlign.RIGHT,
                        'cssClass[isStatic]': isStatic,
                        'cssClass[opened]': isOpen,
                    })}
                    onClick={toggle}
                >
                    {children}
                    {!isStatic && this.renderCaretIcon()}
                </div>
            </WidgetHeaderContext.Provider>
        );
    }

    private renderCaretIcon = (): JSX.Element => {
        return (
            <div className="cssClass[widgetHeaderArrow]">
                <CaretdownSrvxIcon16 className="cssClass[caretIcon]" />
            </div>
        );
    };
}
