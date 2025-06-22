import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {Body, IBodyProps} from '@sberbusiness/triplex/components/Body/Body';

/** Свойства компонента BodyPage. */
export interface IBodyPageProps extends IBodyProps {}

/** Тело компонента Page. */
export const BodyPage = React.forwardRef<HTMLDivElement, IBodyPageProps>(({className, ...rest}, ref) => (
    <Body className={classnames('cssClass[bodyPage]', className)} {...rest} ref={ref} />
));

BodyPage.displayName = 'BodyPage';
