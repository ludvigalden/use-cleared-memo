import React from "react";

/**
 * Allows for clearing a memoized value when dependencies change as well as on unmount. The code
 * below is a simplified version of the functionality, which omits the critical fact that the
 * *every value that has been retrieved will be cleared before the next one is retrieved **or** when the component unmounts*.
 * That means every retrieved value will be cleared, and only once. The most obvious use-case for this is creating subscriptions,
 * which either just needs to get unsubscribed on unmount or hydrated when a new subscription should be created (based on the deps).
 *
 * The fourth and last argument, the clearFnDeps, are only used to ensure the right clearFn is used when unmounting, which is solved by creating a ref that the unmount effect has access to.
 *
 * ```typescript
 *  React.useMemo(() => {
 *     clearFn(value);
 *     return getFn();
 *  }, deps)
 * + React.useEffect(() => clearFn, []);
 * = useClearedMemo(getFn, clearFn, deps);
 * ```
 */
export function useClearedMemo<T>(
    getFn: () => T,
    clearFn: (previousValue: T) => void,
    deps: readonly any[] = [],
    clearFnDeps?: readonly any[],
) {
    const value = React.useRef<T>(INITIAL_VALUE);
    const clearedValue = React.useRef<boolean>(true);

    React.useMemo(() => {
        if (!clearedValue.current) {
            clearFn(value.current);
        }
        value.current = getFn();
        clearedValue.current = false;
    }, deps);

    if (clearFnDeps && clearFnDeps.length > 0) {
        const clearFnRef = React.useRef<typeof clearFn>();
        clearFnRef.current = clearFn;
        React.useEffect(() => {
            /**
             * In some cases, the effect cleanup function will be called even though the component is not truly unmounted, but to perform updates.
             * That is, the value is cleared, but is not retrieved again as the React.useMemo is not updated. In short, we have a cleared value that is still in use in some cases.
             * We solve this by checking if the value has been cleared when mounting the component, which means the effect cleanup function was called just before performing the effect again.
             *
             * The obvious problem here is that even though a new value is assigned, it is not returned from the hook. Instead, we get a sort of "useClearedValueEffect" functionality.
             * I have not found a good solution to this, so it will just have to be a problem that one might have to deal with in other places. For instance, to perform component updates in the
             * "getFn" in the cases where necessary. As a relief, though, the most useful and therefore important part of `useClearedMemo` is actually
             * clearing the value, so maybe this isn't that big of a deal.
             */
            if (clearedValue.current) {
                value.current = getFn();
                clearedValue.current = false;
            }

            return () => {
                if (!clearedValue.current) {
                    (clearFnRef.current as typeof clearFn)(value.current);
                    clearedValue.current = true;
                }
            };
        }, []);
    } else {
        React.useEffect(() => {
            // see comment in effect above, same deal here
            if (clearedValue.current) {
                value.current = getFn();
                clearedValue.current = false;
            }

            return () => {
                if (!clearedValue.current) {
                    clearFn(value.current);
                    clearedValue.current = true;
                }
            };
        }, []);
    }

    return value.current;
}

const INITIAL_VALUE: never = Symbol("initial") as never;
