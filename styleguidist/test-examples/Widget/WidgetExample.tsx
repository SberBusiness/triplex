import React from 'react';
import {Widget} from '@sberbusiness/triplex/components/Widget/Widget';
import {
    IWidgetHeaderProvideProps,
    IWidgetFooterProvideProps,
    IWidgetBodyProvideProps,
} from '@sberbusiness/triplex/components/Widget/types';
import {Button} from '@sberbusiness/triplex/components/Button/Button';
import {EButtonTheme, EButtonSize} from '@sberbusiness/triplex/components/Button/enums';
import {EWidgetHeaderControlsAlign} from '@sberbusiness/triplex/components/Widget/components/WidgetHeader/WidgetHeader';
import {ELinkSize, ELinkType, Link} from '@sberbusiness/triplex/components/Link/Link';

interface IWidgetExampleProps {
    isOpen?: boolean;
    isStatic?: boolean;
    toggle?: (isOpen: boolean) => void;
    headerControlsAlign: EWidgetHeaderControlsAlign;
    showFooter?: boolean;
    showHeaderControls?: boolean;
}

export const WidgetExample: React.FC<IWidgetExampleProps> = ({
    headerControlsAlign,
    isOpen,
    isStatic,
    toggle,
    showFooter,
    showHeaderControls,
}) => {
    const renderBody = (props: IWidgetBodyProvideProps) => (
        <Widget.Body {...props}>
            <div style={{height: '100px'}}>Контент</div>
        </Widget.Body>
    );

    const renderFooter = (props: IWidgetFooterProvideProps) => (
        <Widget.Footer {...props}>
            <Widget.Footer.Content>
                <Link linkType={ELinkType.TEXT} size={ELinkSize.LG}>
                    Текст ссылки
                </Link>
            </Widget.Footer.Content>
            <Widget.Footer.Controls>
                <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.SM}>
                    Структура начислений
                </Button>
                <Button theme={EButtonTheme.GENERAL} size={EButtonSize.SM}>
                    Добавить начисления
                </Button>
            </Widget.Footer.Controls>
        </Widget.Footer>
    );

    const renderHeader = (props: IWidgetHeaderProvideProps) => (
        <Widget.Header {...props} controlsAlign={headerControlsAlign}>
            <Widget.Header.Title>Расчёт по коммунальным платежам и другим услугам</Widget.Header.Title>
            {showHeaderControls ? (
                <Widget.Header.Controls>
                    <Button
                        theme={EButtonTheme.GENERAL}
                        size={EButtonSize.SM}
                        onClick={() => alert('Клик по кнопке "Добавить начисления.')}
                    >
                        Добавить начисления
                    </Button>
                </Widget.Header.Controls>
            ) : null}
        </Widget.Header>
    );

    return (
        <Widget
            isOpen={isOpen}
            isStatic={isStatic}
            renderBody={renderBody}
            renderFooter={showFooter ? renderFooter : undefined}
            renderHeader={renderHeader}
            toggle={toggle}
        />
    );
};
