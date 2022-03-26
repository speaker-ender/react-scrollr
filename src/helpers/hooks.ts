import { useClientHook } from "@speaker-ender/react-ssr-tools";
import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import { throttle } from "throttle-debounce";

export const usePrevious = <T>(value: T): T => {
    const ref: any = useRef<T>();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}

export const useRegisteredCallbacks = <T extends (...args: any[]) => any>(initialValue: any): [
    (callback: T) => void, (callback: T) => void, MutableRefObject<T[]>
] => {
    const callbacks = useRef<T[]>(initialValue);

    const registerCallback = useCallback(
        (callback: T) => {
            callbacks.current = ([...callbacks.current, callback]);
        },
        [callbacks.current]
    );

    const unregisterCallback = useCallback(
        (callbackToRemove: T) => {
            callbacks.current = callbacks.current.filter(callback => callback !== callbackToRemove);
        },
        [callbacks.current]
    );

    return [registerCallback, unregisterCallback, callbacks];
}
