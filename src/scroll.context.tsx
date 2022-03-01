import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { hasWindow } from './helpers/window';
import { scrollTop } from '@speaker-ender/js-position-helpers';
import { throttle } from 'throttle-debounce';
import { useEventCallback } from './helpers/hooks';

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
            currentPosition: scrollTop(),
            prevPosition,
        }
        : undefined;

export type ScrollCallback = (scroll?: number, lastScroll?: number) => void;

export const useScrollState = () => {
    const [scrollState, setScrollState] = useState(selectScrollState);
    const [scrollCallbacks, setScrollCallbacks] = useState<
        ScrollCallback[]
    >([]);

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

    if (hasWindow) {
        const throttledSetScrollState = throttle(SCROLL_INTERVAL, setScrollState);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const handleScrollEvent = useEventCallback(() => {
            const newScrollState = selectScrollState(
                scrollState && scrollState.currentPosition
            );

            scrollCallbacks.map(scrollCallback =>
                scrollCallback(
                    newScrollState && newScrollState.currentPosition,
                    newScrollState &&
                    newScrollState.prevPosition
                )
            );

            throttledSetScrollState(newScrollState);
        }, [scrollState && scrollState.currentPosition, scrollCallbacks]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            window.addEventListener('scroll', handleScrollEvent);

            return () => {
                window.removeEventListener('scroll', handleScrollEvent);
            };
        }, [handleScrollEvent]);
    }

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
