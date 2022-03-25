import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { scrollTopDistance, hasWindow } from '@speaker-ender/js-measure';
import { throttle } from 'throttle-debounce';
import { useClientHook } from '@speaker-ender/react-ssr-tools';

const SCROLL_INTERVAL = 10;

export type IScrollOptions = {
    scrollStateInterval: number;
    scrollCallbackInterval: number;
    hasContext?: boolean;
}

export type IScrollState = ReturnType<typeof useScrollState>;

type IScrollContext = IScrollState & IScrollOptions;

export const ScrollContext = createContext<IScrollState>(null!);

export interface IScrollContextProvider extends Partial<IScrollOptions> { }


export interface ScrollState {
    currentPosition: number,
    prevPosition?: number,
}

const selectScrollState = (
    prevPosition?: number,
    element?: HTMLElement
): ScrollState | undefined =>
    hasWindow ? {
        currentPosition: element ? element.scrollTop : scrollTopDistance(),
        prevPosition,
    } : undefined;

export type ScrollCallback = (scroll?: number, lastScroll?: number) => void;

export const useScrollState = ({ scrollStateInterval, scrollCallbackInterval, hasContext }: IScrollOptions) => {
    const isClientSide = useClientHook();
    const scrollState = useRef<ScrollState | undefined>(selectScrollState());
    const scrollCallbacks = useRef<ScrollCallback[]>([]);
    const scrollingTimer = useRef<ReturnType<typeof setTimeout>>(null!);
    const [elementContext, setElementContext] = useState<HTMLElement>();


    const registerScrollCallback = useCallback(
        (scrollCallback: ScrollCallback, interval?: number) => {
            scrollCallbacks.current = ([...scrollCallbacks.current, throttle(interval || scrollCallbackInterval, scrollCallback)]);
        },
        [scrollCallbacks.current]
    );

    const unregisterScrollCallback = useCallback(
        (scrollCallback: ScrollCallback) => {
            scrollCallbacks.current = scrollCallbacks.current.filter(callback => callback !== scrollCallback);
        },
        [scrollCallbacks.current]
    );

    const throttledScrollCallback = useCallback((newScrollState) => {
        scrollState.current = newScrollState;
    }, []);

    const throttledSetScrollState = throttle(scrollStateInterval, throttledScrollCallback);

    const handleScrollEvent = useCallback(() => {
        const newScrollState = selectScrollState(
            scrollState.current && scrollState.current.currentPosition,
            elementContext
        );

        scrollCallbacks.current.map(scrollCallback =>
            scrollCallback(
                !!newScrollState ? newScrollState.currentPosition : 0,
                !!newScrollState ? newScrollState.prevPosition : 0
            )
        );
        throttledSetScrollState(newScrollState);
    }, [!!scrollState.current && scrollState.current.currentPosition, scrollCallbacks, elementContext]);

    const listenToScroll = useCallback(() => {
        clearTimeout(scrollingTimer.current);
        scrollingTimer.current = setTimeout(
            () =>
                requestAnimationFrame(() => {
                    handleScrollEvent();
                }),
            SCROLL_INTERVAL
        );
    }, [scrollingTimer, handleScrollEvent, scrollCallbacks]);

    useEffect(() => {
        const updateScrollActive = (e: Event) => {
            listenToScroll();
        }

        isClientSide && elementContext && elementContext.addEventListener('scroll', updateScrollActive);

        return () => {
            elementContext && elementContext.removeEventListener('scroll', updateScrollActive);
        };
    }, [isClientSide, elementContext]);

    useEffect(() => {
        const updateScrollActive = (e: Event) => {
            listenToScroll();
        }

        isClientSide && hasContext && window.addEventListener('scroll', updateScrollActive);

        return () => {
            window.removeEventListener('scroll', updateScrollActive);
        };
    }, [isClientSide]);

    return {
        scrollState: scrollState,
        registerScrollCallback,
        unregisterScrollCallback,
        setElementContext,
    };
};

export const useScrollContext = () => {
    const scrollContext = useContext(ScrollContext);

    if (!scrollContext) {
        throw new Error(
            'Scroll Context used outside of ScrollContext.Provider'
        );
    }

    return scrollContext;
};

export const ScrollContextProvider: React.FC<IScrollContextProvider> = (props) => {
    const scrollState = useScrollState({ scrollStateInterval: SCROLL_INTERVAL, scrollCallbackInterval: SCROLL_INTERVAL, hasContext: true, ...props });

    return (
        <ScrollContext.Provider value={scrollState}>
            {props.children}
        </ScrollContext.Provider>
    );
};
