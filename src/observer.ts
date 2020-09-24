export default interface Observer<T> {

    next(value: T): void;
    
    error(err: Error): void;
    
    complete(): void;

}

export type PartialObserver<T> =
    | []
    | [{ next?: (value: T) => void, error?: (err: Error) => void, complete?: () => void }]
    | [next: (value: T) => void]
    | [next: (value: T) => void, error: (err: Error) => void]
    | [next: (value: T) => void, error: (err: Error) => void, complete: () => void];

const _NOOP_NEXT: (value: any) => void = value => { };
const _NOOP_ERROR: (err: Error) => void = err => { };
const _NOOP_COMPLETE: () => void = () => { };
    
export function _expandPartialObserver<T>(partialObserver: PartialObserver<T>): Observer<T> {
    if (partialObserver.length === 0) {
        return { next: _NOOP_NEXT, error: _NOOP_ERROR, complete: _NOOP_COMPLETE };
    } else if (partialObserver.length === 1) {
        if (typeof partialObserver[0] === 'function') {
            const [ next ] = partialObserver;
            return { next, error: _NOOP_ERROR, complete: _NOOP_COMPLETE };
        } else {
            const { next = _NOOP_NEXT, error = _NOOP_ERROR, complete = _NOOP_COMPLETE } = partialObserver[0];
            return { next, error, complete };
        }
    } else if (partialObserver.length === 2) {
        const [ next, error ] = partialObserver;
        return { next, error, complete: _NOOP_COMPLETE };
    } else {
        const [ next, error, complete ] = partialObserver;
        return { next, error, complete };
    }
}