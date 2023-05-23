// Ref в React < 16.
type OldRef<T> = (el: T) => void;

// Ref в React > 15.
interface IRefWithCurrent<T> {
    current: T | null;
}

export type Ref<T> = OldRef<T> | IRefWithCurrent<T>;
