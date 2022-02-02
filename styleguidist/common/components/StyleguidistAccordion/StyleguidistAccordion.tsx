import React, { useState } from 'react';
import {CaretdownSrvxIcon16} from '@sberbusiness/icons/CaretdownSrvxIcon16';
import './styles.less';

export interface IStyleguidistAccordionProvideProps {
    opened: boolean;
    setOpened: (nextIsOpen: boolean) => void;
}

interface IStyleguidistAccordionProps {
    opened?: boolean;
    setOpened?: (nextIsOpen: boolean) => void;
    children: ((props: IStyleguidistAccordionProvideProps) => React.ReactNode);
    title: string | ((props: IStyleguidistAccordionProvideProps) => React.ReactNode);
}

/**
 * Accordion для скрывающихся блоков в Styleguidist.
 */
const StyleguidistAccordion: React.FC<IStyleguidistAccordionProps> = ({children, opened: controlledOpened, title, setOpened: setControlledOpened}) => {
    const [uncontrolledOpened, setUncontrolledOpened] = useState(false);
    const isControlledAccordion = controlledOpened !== undefined;
    const opened = isControlledAccordion ? controlledOpened :  uncontrolledOpened;

    const setOpened = (nextOpened: boolean) => {
        if (isControlledAccordion && setControlledOpened) {
            setControlledOpened(nextOpened)
        } else {
            setUncontrolledOpened(nextOpened)
        }
    }

    const renderHeader = () => {
        if (typeof title === 'string') {
            return (
                <div className={`styleguidist-accordion-header ${opened ? 'opened' : ''}`} onClick={() => setOpened(!opened)}>
                    <CaretdownSrvxIcon16 className="icon-caret" />
                    <div className="title">{title}</div>
                </div>
            );
        }

        return title({opened: (opened as boolean), setOpened});
    }

    return (
            <div className="styleguidist-accordion">
                <div className="styleguidist-accordion-header-wrapper">
                    {renderHeader()}
                </div>
                <div className={`styleguidist-accordion-content ${opened ? 'opened' : ''}`}>
                    {children({opened : uncontrolledOpened, setOpened})}
                </div>
            </div>
    );
}

export default StyleguidistAccordion;
