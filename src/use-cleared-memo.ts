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
            return () => {
                if (!clearedValue.current) {
                    (clearFnRef.current as typeof clearFn)(value.current);
                    clearedValue.current = true;
                }
            };
        }, []);
    } else {
        React.useEffect(() => {
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
