import Observable from "./observable";

export type Operator<T, U> = (o: Observable<T>) => Observable<U>;

export function map<T, U>(f: (t: T) => U): Operator<T, U> {
    return observable => new Observable(subscriber => {
        const subscription = observable.subscribe({
            next: value => subscriber.next(f(value)),
            error: err => subscriber.error(err),
            complete: () => subscriber.complete(),
        });
        return subscription;
    });
}

export function filter<T>(p: (t: T) => boolean): Operator<T, T> {
    return observable => new Observable(subscriber => {
        const subscription = observable.subscribe({
            next: value => { if (p(value)) { subscriber.next(value) } },
            error: err => subscriber.error(err),
            complete: () => subscriber.complete(),
        });
        return subscription;
    });
}