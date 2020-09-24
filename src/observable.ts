import Observer, { _expandPartialObserver, PartialObserver } from "./observer";
import { Operator } from "./operators";
import Subscriber from "./subscriber";
import Subscription from "./subscription";

export type TeardownLogic = Subscription | (() => void) | void;

export default class Observable<T> {

    constructor(private readonly consumer: (subscriber: Observer<T>) => TeardownLogic) { }

    subscribe(...partialObserver: PartialObserver<T>): Subscription {
        let observer: Observer<T> = _expandPartialObserver(partialObserver);
        const subscriber = new Subscriber(observer);
        const teardown = this.consumer(subscriber);
        subscriber.add(teardown);
        return subscriber;
    }

    pipe(...operators: Operator<any, any>[]): Observable<unknown> {
        return operators.reduce((observable, operator) => observable = operator(observable), this as Observable<any>);
    }

}