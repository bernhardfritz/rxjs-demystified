import Observer from "./observer";
import Subscription from "./subscription";

export default class Subscriber<T> extends Subscription implements Observer<T> {

    constructor(private readonly _observer: Observer<T>) {
        super();
    }

    next(value: T): void {
        if (this.unsubscribed) {
            return;
        }
        this._observer.next(value);
    }
    
    error(err: Error): void {
        if (this.unsubscribed) {
            return;
        }
        this._observer.error(err);
    }

    complete(): void {
        if (this.unsubscribed) {
            return;
        }
        this._observer.complete();
        this.unsubscribe();
    }

}