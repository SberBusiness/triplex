import {ETagSize} from '@sberbusiness/triplex/components/Tag/enums';

/**
 * Свойства компонента Тэг.
 */
export interface ITagProps extends React.HTMLAttributes<HTMLSpanElement> {
    id: string;
    size: ETagSize;
    children: string;
    maxWidth?: number;
    onRemove: (id: string) => void;
    onEdit?: (id: string) => void;
}

/**
 * Свойства компонента Группа тэгов.
 */
export interface ITagGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    size: ETagSize;
}
