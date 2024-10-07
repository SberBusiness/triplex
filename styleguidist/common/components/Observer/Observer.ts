export class Observer<T = any> {
    private subs: Subscriber[] = [];

    subscribe(sub: Subscriber<T>): Unsubscribe {
        this.subs.push(sub);

        return () => {
            this.subs = this.subs.filter((item) => item !== sub);
        };
    }

    publish(...args: T[]): void {
        this.subs.forEach((sub) => {
            sub(...args);
        });
    }
}

type Subscriber<T = any> = (...args: T[]) => void;
type Unsubscribe = () => void;
