import { useRef, useEffect, useCallback } from "react";

export const useEventCallback = <Args extends any[]>(
    fn: (...args: Args) => void,
    dependencies: any[]) => {

    const ref = useRef<typeof fn>(() => {
        throw new Error('Cannot call an event handler while rendering.');
    });

    useEffect(() => {
        ref.current = fn;
    }, [fn, ...dependencies]);

    return useCallback(
        (...args: Args) => {
            ref.current(...args);
        },
        [ref]
    );
}