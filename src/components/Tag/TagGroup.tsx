import React from 'react';
import {ITagGroupProps} from '@sberbusiness/triplex/components/Tag/types';
import {mapTagSizeToCssClass} from '@sberbusiness/triplex/components/Tag/utils';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/**
 * Компонент Группа тэгов.
 */
export class TagGroup extends React.PureComponent<ITagGroupProps> {
    public static displayName = 'TagGroup';

    public render(): JSX.Element {
        const {children, className, size, ...props} = this.props;
        const classNames = classnames(className, 'cssClass[tagGroup]', mapTagSizeToCssClass[size]);

        return (
            <div className={classNames} role="group" {...props}>
                {children}
            </div>
        );
    }
}
