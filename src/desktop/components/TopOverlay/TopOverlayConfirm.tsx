import {ITopOverlayProps, TopOverlay} from '@sberbusiness/triplex/desktop/components/TopOverlay/TopOverlay';
import * as React from 'react';

/**
 * Свойства компонента.
 *
 * @prop {string} [closeButtonText] Текст кнопки "Закрыть".
 * @prop {Function} closeConfirm Закрывает блок подтверждения (меняет props isOpen на false).
 * @prop {string} [continueButtonText] Текст кнопки "Продолжить".
 * @prop {Function} onClose Обработчик закрытия блока подтверждения и родителя (кнопкой "Закрыть" и уйти).
 * @prop {Function} [onContinue] Обработчик закрытия только блока подтверждения (кнопкой "Не закрывать" и продолжить редактирование).
 * @prop {string} [title] Текст заголовка.
 * @prop {string} [subTitle] Текст подзаголовка.
 */
export interface ITopOverlayConfirmProps extends ITopOverlayProps {
    closeButtonText: string;
    closeConfirm: () => void;
    continueButtonText: string;
    onClose: () => void;
    onContinue?: () => void;
    title: string;
    subTitle: string;
}

/**
 * Состояние компонента.
 *
 * @param {boolean} continueAfterCloseConfirm Флаг, при закрытии блока подтверждения вызвать onContinue или onClose.
 */
interface ITopOverlayConfirmState {
    continueAfterCloseConfirm: boolean;
}

/**
 * Компонент отображения блока подтверждения.
 */
export class TopOverlayConfirm extends React.PureComponent<ITopOverlayConfirmProps, ITopOverlayConfirmState> {
    public static displayName = 'TopOverlayConfirm';

    public state = {
        continueAfterCloseConfirm: true,
    };

    public render() {
        const {closeButtonText, continueButtonText, isOpen, onOpen, title, subTitle} = this.props;
        const htmlDivAttributes = this.getHtmlDivAttributes();

        return (
            <TopOverlay isOpen={isOpen} onClose={this.handleClose} onOpen={onOpen} {...htmlDivAttributes}>
                <TopOverlay.Content>
                    <TopOverlay.Content.Title>{title}</TopOverlay.Content.Title>
                    <TopOverlay.Content.SubTitle>{subTitle}</TopOverlay.Content.SubTitle>
                </TopOverlay.Content>
                <TopOverlay.Controls>
                    <TopOverlay.Controls.ContinueButton onClick={this.handleClickContinueButton}>
                        {continueButtonText}
                    </TopOverlay.Controls.ContinueButton>
                    <TopOverlay.Controls.CloseButton onClick={this.handleClickCloseButton}>
                        {closeButtonText}
                    </TopOverlay.Controls.CloseButton>
                </TopOverlay.Controls>
                <TopOverlay.Close onClick={this.handleClickContinueButton} />
            </TopOverlay>
        );
    }

    /**
     * Обработчик клика на кнопку 'не закрывать'.
     */
    private handleClickContinueButton = () => {
        const {closeConfirm} = this.props;

        this.setState({
            continueAfterCloseConfirm: true,
        });

        closeConfirm();
    };

    /**
     * Обработчик клика на кнопку 'закрыть'.
     */
    private handleClickCloseButton = () => {
        const {closeConfirm} = this.props;

        this.setState({
            continueAfterCloseConfirm: false,
        });

        closeConfirm();
    };

    /**
     * Обработчик закрытия блока подтверждения.
     */
    private handleClose = () => {
        const {continueAfterCloseConfirm} = this.state;
        const {onClose, onContinue} = this.props;

        if (continueAfterCloseConfirm) {
            if (onContinue) {
                onContinue();
            }
        } else {
            onClose();
        }
    };

    /**
     * Возвращает html-атрибуты SideOverlay.
     */
    private getHtmlDivAttributes = (): React.HTMLAttributes<HTMLDivElement> => {
        const {
            children,
            closeButtonText,
            closeConfirm,
            continueButtonText,
            isOpen,
            onClose,
            onContinue,
            onOpen,
            title,
            subTitle,
            ...htmlDivAttributes
        } = this.props;

        return htmlDivAttributes;
    };
}
