import React, {useEffect, useRef} from 'react';
import {CarouselExtended, ICarouselExtendedButtonProvideProps} from '@sberbusiness/triplex/components/CarouselExtended/CarouselExtended';
import {TabsExtended} from '@sberbusiness/triplex/components/TabsExtended/TabsExtended';
import {ButtonIcon} from '@sberbusiness/triplex/components/Button/ButtonIcon';
import {TabfoldercarouselleftSrvxIcon32} from '@sberbusiness/icons/TabfoldercarouselleftSrvxIcon32';
import {TabfoldercarouselrightSrvxIcon32} from '@sberbusiness/icons/TabfoldercarouselrightSrvxIcon32';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {scrollSmoothHorizontally} from '@sberbusiness/triplex/utils/scroll';
import {EScreenWidth} from '@sberbusiness/triplex/enums/EScreenWidth';

export interface ITabsFolderItem extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Уникальный идентификатор. */
    id: string;
    /** Название. */
    label: React.ReactNode;
}

interface ITabsFolderProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: never;
    /** Массив вкладок. */
    tabs: Array<ITabsFolderItem>;
    /** Идентификатор выбранной вкладки. */
    selectedTabId: string;
    /** Обработчик выбора таба. */
    onSelectTab: (id: string) => void;
}

export const TabsFolder: React.FC<ITabsFolderProps> = ({className, tabs, selectedTabId, onSelectTab, ...rest}) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const tabRefs = useRef<Record<string, HTMLSpanElement | null>>({});

    const renderPrevButton = ({hidden, ...rest}: ICarouselExtendedButtonProvideProps) =>
        hidden ? null : (
            <ButtonIcon className="cssClass[buttonPrev]" {...rest} aria-label="Прокрутить назад">
                <TabfoldercarouselleftSrvxIcon32 />
            </ButtonIcon>
        );

    const renderNextButton = ({hidden, ...rest}: ICarouselExtendedButtonProvideProps) =>
        hidden ? null : (
            <ButtonIcon className="cssClass[buttonNext]" {...rest} aria-label="Прокрутить вперёд">
                <TabfoldercarouselrightSrvxIcon32 />
            </ButtonIcon>
        );

    /** Выравнивание вкладки по правой части карусели. */
    const alignTabRight = (carousel: HTMLDivElement, tab: HTMLSpanElement, delta: number, tabRight: number) => {
        if (delta > 0) {
            // Текущий шаг – не последний, необходимо показать следующий шаг.
            if (tab.nextElementSibling) {
                delta -= tabRight - tab.nextElementSibling.getBoundingClientRect().right;
            }
            scrollSmoothHorizontally(carousel, Math.ceil(delta));
        }
    };

    /** Выравнивание вкладки по левой части карусели. */
    const alignTabLeft = (carousel: HTMLDivElement, tab: HTMLSpanElement, delta: number, tabLeft: number) => {
        if (delta < 0) {
            // Текущий шаг – не первый, необходимо показать предыдущий шаг.
            if (tab.previousElementSibling) {
                delta -= tabLeft - tab.previousElementSibling.getBoundingClientRect().left;
            }
            scrollSmoothHorizontally(carousel, Math.floor(delta));
        }
    };

    /** Выравнивание вкладки по центру карусели. */
    const alignTabCenter = (carousel: HTMLDivElement, delta: number) => {
        if (delta) {
            scrollSmoothHorizontally(carousel, delta);
        }
    };

    /** Выравнивание вкладки в карусели. */
    const alignTab = (carousel: HTMLDivElement, tab: HTMLSpanElement) => {
        const {left: carouselLeft, right: carouselRight, width: carouselWidth} = carousel.getBoundingClientRect();
        const {left: tabLeft, right: tabRight, width: tabWidth} = tab.getBoundingClientRect();
        const carouselCenter = carouselLeft + carouselWidth / 2;
        const tabCenter = tabLeft + tabWidth / 2;

        if (window.matchMedia(`(max-width: ${EScreenWidth.SM_MAX})`).matches) {
            alignTabCenter(carousel, tabCenter - carouselCenter);
        } else if (carouselCenter > tabCenter) {
            alignTabLeft(carousel, tab, tabLeft - carouselLeft - 32, tabLeft); // 32 - paddingLeft
        } else if (carouselCenter < tabCenter) {
            alignTabRight(carousel, tab, tabRight - carouselRight + 32, tabRight); // 32 - paddingRight
        }
    };

    useEffect(() => {
        if (selectedTabId) {
            const {current: carousel} = carouselRef;
            const tab = tabRefs.current[selectedTabId];

            if (carousel && tab) {
                alignTab(carousel, tab);
            }
        }
    }, [selectedTabId]);

    return (
        <CarouselExtended
            className={classnames('cssClass[tabsFolder]', className)}
            buttonPrev={renderPrevButton}
            buttonNext={renderNextButton}
            stepPrev={100}
            stepNext={100}
            {...rest}
            ref={carouselRef}
        >
            <TabsExtended className="cssClass[inner]" selectedId={selectedTabId} onSelectTab={onSelectTab}>
                <TabsExtended.Content className="cssClass[content]">
                    <TabsExtended.Content.TabsWrapper>
                        {tabs.map(({className: tabButtonClassName, disabled, id, label, ...tabButtonProps}, index) => (
                            <TabsExtended.Content.Tab
                                key={index}
                                id={id}
                                className={classnames('cssClass[tab]', {'cssClass[disabled]': !!disabled})}
                                ref={(instance) => (tabRefs.current[id] = instance)}
                            >
                                {({selected}) => (
                                    <TabsExtended.Content.TabButton
                                        {...tabButtonProps}
                                        id={id}
                                        className={classnames('cssClass[tabButton]', {'cssClass[selected]': selected}, tabButtonClassName)}
                                        selected={selected}
                                        disabled={disabled}
                                    >
                                        {label}
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
