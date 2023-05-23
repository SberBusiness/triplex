import * as React from 'react';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {Body, IBodyProps} from '@sberbusiness/triplex/desktop/components/Body/Body';

export interface IBodyPageProps extends IBodyProps {}

export const BodyPage: React.FC<IBodyPageProps> = ({className, ...props}) => (
    <Body {...props} className={classnames(className, 'cssClass[bodyPage]')} />
);

BodyPage.displayName = 'BodyPage';
