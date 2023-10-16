import React from 'react';
import {ETagSize} from '@sberbusiness/triplex/components/Tag/enums';
import {ITagProps} from '@sberbusiness/triplex/components/Tag/types';
import {mapTagSizeToCssClass} from '@sberbusiness/triplex/components/Tag/utils';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {EdittextSrvIcon16} from '@sberbusiness/icons/EdittextSrvIcon16';
import {ClosenotificationSrvxIcon16} from '@sberbusiness/icons/ClosenotificationSrvxIcon16';
import {ButtonIcon} from '@sberbusiness/triplex/components/Button/ButtonIcon';

/**
 * Компонент Тэг.
 */
export class Tag extends React.Component<ITagProps> {
    /**
     * Обработчик клика по кнопке редактирования.
     */
    private handleEdit = (): void => this.props.onEdit?.(this.props.id);

    /**
     * Обработчик клика по кнопке удаления.
     */
    private handleRemove = (): void => this.props.onRemove(this.props.id);

    render(): JSX.Element {
        const {className, size, children, onEdit, maxWidth, title, onRemove, ...props} = this.props;
        if (process.env.NODE_ENV !== 'production') {
            if (onEdit && size === ETagSize.SM) {
                throw new Error('Only MD-size tags can be editable');
            }
        }
        return (
            <div
                {...props}
                className={classnames(className, 'cssClass[tag]', mapTagSizeToCssClass[size], {'cssClass[editable]': !!onEdit})}
            >
                <div style={maxWidth ? {maxWidth: `${Math.max(64 + 20 * +!!onEdit, maxWidth)}px`} : undefined}>
                    <div className="cssClass[tagContent]">
                        <span className="cssClass[text]" title={title}>
                            {children}
                        </span>
                        {onEdit && (
                            <span className="cssClass[edit]">
                                <ButtonIcon onClick={this.handleEdit}>
                                    <EdittextSrvIcon16 />
                                </ButtonIcon>
                            </span>
                        )}
                        <span className="cssClass[remove]">
                            <ButtonIcon onClick={this.handleRemove}>
                                <ClosenotificationSrvxIcon16 />
                            </ButtonIcon>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
