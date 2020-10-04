import React from "react";

/**
 * Allows for clearing a memoized value when dependencies change as well as on unmount.
 *
 * ```typescript
 *  React.useMemo(getFn, deps)
 * + React.useEffect(() => clearFn, deps)
 *
 * = useClearedMemo(getFn, clearFn, deps)
 * ```
 */
export default function useClearedMemo<T>(
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
