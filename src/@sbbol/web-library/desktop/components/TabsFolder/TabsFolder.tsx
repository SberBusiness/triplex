import React from 'react';
import {
    CarouselExtended,
    ICarouselExtendedButtonProvideProps,
} from '@sbbol/web-library/desktop/components/CarouselExtended/CarouselExtended';
import {TabsExtended} from '@sbbol/web-library/desktop/components/TabsExtended/TabsExtended';
import {ButtonIcon} from '@sbbol/web-library/desktop/components/Button/ButtonIcon/ButtonIcon';
import {TabfoldercarouselleftSrvxIcon32} from '@sberbusiness/icons/TabfoldercarouselleftSrvxIcon32';
import {TabfoldercarouselrightSrvxIcon32} from '@sberbusiness/icons/TabfoldercarouselrightSrvxIcon32';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';

export interface ITabsFolderItem extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Уникальный идентификатор. */
    id: string;
    /** Название. */
    label: React.ReactNode;
}

interface ITabsFolderProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: never;
    /** Массив табов. */
    tabs: Array<ITabsFolderItem>;
    /** Идентификатор выбранного таба. */
    selectedTabId: string;
    /** Обработчик выбора таба. */
    onSelectTab: (id: string) => void;
}

export const TabsFolder: React.FC<ITabsFolderProps> = ({className, tabs, selectedTabId, onSelectTab, ...rest}) => {
    const renderPrevButton = ({hidden, ...rest}: ICarouselExtendedButtonProvideProps) =>
        hidden ? null : (
            <ButtonIcon className="cssClass[buttonPrev]" {...rest}>
                <TabfoldercarouselleftSrvxIcon32 />
            </ButtonIcon>
        );

    const renderNextButton = ({hidden, ...rest}: ICarouselExtendedButtonProvideProps) =>
        hidden ? null : (
            <ButtonIcon className="cssClass[buttonNext]" {...rest}>
                <TabfoldercarouselrightSrvxIcon32 />
            </ButtonIcon>
        );

    return (
        <CarouselExtended
            className={classnames('cssClass[tabsFolder]', className)}
            buttonPrev={renderPrevButton}
            buttonNext={renderNextButton}
            stepPrev={100}
            stepNext={100}
            {...rest}
        >
            <TabsExtended className="cssClass[inner]" selectedId={selectedTabId} onSelectTab={onSelectTab}>
                <TabsExtended.Content className="cssClass[content]">
                    <TabsExtended.Content.TabsWrapper>
                        {tabs.map((item, index) => (
                            <TabsExtended.Content.Tab
                                key={index}
                                id={item.id}
                                className={classnames('cssClass[tab]', {'cssClass[disabled]': !!item.disabled})}
                            >
                                {({selected}) => (
                                    <TabsExtended.Content.TabButton
                                        className={classnames('cssClass[tabButton]', {'cssClass[selected]': selected}, item.className)}
                                        selected={selected}
                                        disabled={item.disabled}
                                    >
                                        {item.label}
                                    </TabsExtended.Content.TabButton>
                                )}
                            </TabsExtended.Content.Tab>
                        ))}
                    </TabsExtended.Content.TabsWrapper>
                </TabsExtended.Content>
            </TabsExtended>
        </CarouselExtended>
    );
};

TabsFolder.displayName = 'TabsFolder';
