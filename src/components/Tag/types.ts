import {ETagSize} from '@sberbusiness/triplex/components/Tag/enums';

/** Свойства компонента Tag. */
export interface ITagProps extends React.HTMLAttributes<HTMLSpanElement> {
    id: string;
    size: ETagSize;
    maxWidth?: number;
    onRemove: (id: string) => void;
    onEdit?: (id: string) => void;
    editButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    removeButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

/** Свойства компонента TagGroup. */
export interface ITagGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    size: ETagSize;
}
