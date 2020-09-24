import { TeardownLogic } from "./observable";

export default class Subscription {

    protected unsubscribed = false;
    private readonly _teardowns: TeardownLogic[] = [];

    unsubscribe() {
        if (this.unsubscribed) {
            return;
        }
        this.unsubscribed = true;
        for (const teardown of this._teardowns) {
            this._execTeardown(teardown);
        }
    }

    add(teardown: TeardownLogic) {
        if (this.unsubscribed) {
            this._execTeardown(teardown);
            return;
        }
        this._teardowns.push(teardown);
    }

    private _execTeardown(teardown: TeardownLogic) {
        if (teardown instanceof Subscription) {
            teardown.unsubscribe();
        } else if (typeof teardown === 'function') {
            teardown();
        }
    }

}