import React, {useRef} from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import Wrapper from 'react-styleguidist/lib/client/rsg-components/Wrapper/Wrapper';
import './styles.less';

interface ICustomWrapperProps {
    onError: () => void;
}

const CustomWrapper: React.FC<ICustomWrapperProps> = (props) => {
    const ref = useRef(null);

    return (
        <div className={classnames('custom-wrapper')} ref={ref}>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/*
          // @ts-ignore */}
          <Wrapper {...props} />
        </div>
    );
};

export default CustomWrapper;
