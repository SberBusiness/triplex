import React from 'react';

/** Свойства компонента ButtonBase. */
export interface IButtonBaseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/** База для кнопок. */
export const ButtonBase = React.forwardRef<HTMLButtonElement, IButtonBaseProps>((props, ref) => {
    return <button type="button" {...props} data-tx={process.env.npm_package_version} ref={ref} />;
});

ButtonBase.displayName = 'ButtonBase';
