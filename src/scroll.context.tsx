import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { scrollTopDistance, hasWindow } from '@speaker-ender/js-measure';
import { throttle } from 'throttle-debounce';

const SCROLL_INTERVAL = 50;

export type IScrollState = Partial<ReturnType<typeof useScrollState>>;

export const ScrollContext = createContext<IScrollState | null>(
    null
);

export interface ScrollState {
    currentPosition: number,
    prevPosition?: number,
}

const selectScrollState = (
    prevPosition?: number
): ScrollState | undefined =>
    hasWindow
        ? {
            currentPosition: scrollTopDistance(),
            prevPosition,
        }
        : undefined;

export type ScrollCallback = (scroll?: number, lastScroll?: number) => void;

export const useScrollState = () => {
    const [scrollState, setScrollState] = useState(selectScrollState);
    const [scrollCallbacks, setScrollCallbacks] = useState<ScrollCallback[]>([]);

    const registerScrollCallback = useCallback(
        (scrollCallback: ScrollCallback) => {
            setScrollCallbacks([...scrollCallbacks, scrollCallback]);
        },
        [scrollCallbacks]
    );

    const unregisterScrollCallback = useCallback(
        (scrollCallback: ScrollCallback) => {
            setScrollCallbacks(
                scrollCallbacks.filter(callback => callback !== scrollCallback)
            );
        },
        [scrollCallbacks]
    );

    const throttledSetScrollState = throttle(SCROLL_INTERVAL, setScrollState, true);

    const handleScrollEvent = useCallback(() => {
        const newScrollState = selectScrollState(
            scrollState && scrollState.currentPosition
        );

        scrollCallbacks.map(scrollCallback =>
            scrollCallback(
                !!newScrollState ? newScrollState.currentPosition : 0,
                !!newScrollState ? newScrollState.prevPosition : 0
            )
        );

        hasWindow && throttledSetScrollState(newScrollState);
    }, [scrollState && scrollState.currentPosition, scrollCallbacks]);

    const scrollListener = () => requestAnimationFrame(() => handleScrollEvent());

    useEffect(() => {
        window.addEventListener('scroll', scrollListener);

        return () => {
            window.removeEventListener('scroll', scrollListener);
        };
    }, [handleScrollEvent]);

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
