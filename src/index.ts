import Observable from './observable';
import { filter, map } from './operators';

const observable = new Observable<Number>(subscriber => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    const handle = setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
    }, 1000);
    return () => clearTimeout(handle);
});

const subscription1 = observable
    .pipe(
        map(x => x * 2),
    )
    .subscribe(x => console.log(x));
const subscription2 = observable
    .pipe(
        map(x => x + 1),
    )
    .subscribe(x => console.log(x));
subscription1.add(subscription2);
subscription1.unsubscribe();

const subscription = observable
    .pipe(
        filter(x => x % 2 == 0),
    )
    .subscribe(x => console.log(x));
