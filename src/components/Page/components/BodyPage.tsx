import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {Body, IBodyProps} from '@sberbusiness/triplex/components/Body/Body';

export interface IBodyPageProps extends IBodyProps {}

export const BodyPage: React.FC<IBodyPageProps> = ({className, ...props}) => (
    <Body {...props} className={classnames(className, 'cssClass[bodyPage]')} />
);

BodyPage.displayName = 'BodyPage';
