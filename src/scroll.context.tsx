import React, { createContext, useCallback, useContext, useEffect, useRef } from 'react';
import { scrollTopDistance, hasWindow } from '@speaker-ender/js-measure';
import { throttle } from 'throttle-debounce';
import { useClientHook } from '@speaker-ender/react-ssr-tools';

const SCROLL_INTERVAL = 10;

export type IScrollState = ReturnType<typeof useScrollState>;

export const ScrollContext = createContext<IScrollState>(null!);

export interface ScrollState {
    currentPosition: number,
    prevPosition?: number,
}

const selectScrollState = (
    prevPosition?: number
): ScrollState | undefined =>
    hasWindow ? {
        currentPosition: scrollTopDistance(),
        prevPosition,
    } : undefined;

export type ScrollCallback = (scroll?: number, lastScroll?: number) => void;

export const useScrollState = () => {
    const isClientSide = useClientHook();
    const scrollState = useRef<ScrollState | undefined>(selectScrollState());
    const scrollCallbacks = useRef<ScrollCallback[]>([]);
    const scrollingTimer = useRef<ReturnType<typeof setTimeout>>(null!);


    const registerScrollCallback = useCallback(
        (scrollCallback: ScrollCallback) => {
            scrollCallbacks.current = ([...scrollCallbacks.current, scrollCallback]);
        },
        [scrollCallbacks.current]
    );

    const unregisterScrollCallback = useCallback(
        (scrollCallback: ScrollCallback) => {
            scrollCallbacks.current = scrollCallbacks.current.filter(callback => callback !== scrollCallback);
        },
        [scrollCallbacks.current]
    );

    const throttledSetScrollState = throttle(SCROLL_INTERVAL, (newScrollState) => scrollState.current = newScrollState);


    const handleScrollEvent = useCallback(() => {
        const newScrollState = selectScrollState(
            scrollState.current && scrollState.current.currentPosition
        );

        scrollCallbacks.current.map(scrollCallback =>
            scrollCallback(
                !!newScrollState ? newScrollState.currentPosition : 0,
                !!newScrollState ? newScrollState.prevPosition : 0
            )
        );

        hasWindow && throttledSetScrollState(newScrollState);
    }, [!!scrollState.current && scrollState.current.currentPosition, scrollCallbacks]);

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
        const updateScrollActive = () => {
            listenToScroll();
        }

        isClientSide && window.addEventListener('scroll', updateScrollActive);

        return () => {
            window.removeEventListener('scroll', updateScrollActive);
        };
    }, [isClientSide]);

    return {
        scrollState: scrollState,
        registerScrollCallback,
        unregisterScrollCallback,
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

export const ScrollContextProvider: React.FC = ({ children }) => {
    const scrollState = useScrollState();

    return (
        <ScrollContext.Provider value={scrollState}>
            {children}
        </ScrollContext.Provider>
    );
};
