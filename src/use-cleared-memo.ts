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
export default function useClearedMemo<T>(getFn: () => T, clearFn: (previousValue: T) => void, deps: readonly any[] = []) {
    const value = React.useMemo(() => ({ current: getFn(), mounted: false }), []);

    React.useEffect(() => {
        if (value.mounted) {
            value.current = getFn();
        } else {
            value.mounted = true;
        }

        return () => {
            if (value.current !== INITIAL_VALUE) {
                clearFn(value.current);
                value.current = INITIAL_VALUE;
            }
        };
    }, deps);

    return value.current;
}

const INITIAL_VALUE: never = Symbol("initial") as never;
