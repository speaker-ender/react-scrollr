import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { scrollTopDistance, hasWindow } from '@speaker-ender/js-measure';
import { throttle } from 'throttle-debounce';
import { useClientHook } from '@speaker-ender/react-ssr-tools';
import { useRegisteredCallbacks } from './helpers/hooks';

const SCROLL_INTERVAL = 10;

export type IScrollOptions = {
    listenerInterval: number;
    stateInterval: number;
    withContext?: boolean;
}

export type IScrollState = ReturnType<typeof useScrollState>;

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

export const useScrollState = ({ listenerInterval, stateInterval, withContext }: IScrollOptions) => {
    const isClientSide = useClientHook();
    const scrollState = useRef<ScrollState | undefined>(selectScrollState());
    const [elementContext, setElementContext] = useState<HTMLElement>();
    const [registerScrollCallback, unregisterScrollCallback, scrollCallbacks] = useRegisteredCallbacks<ScrollCallback>([]);

    const throttledSetScrollState = throttle(stateInterval, (newScrollState) => scrollState.current = newScrollState);

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

    const throttledHandleScrollEvent = throttle(listenerInterval, handleScrollEvent);

    useEffect(() => {
        isClientSide && elementContext && elementContext.addEventListener('scroll', throttledHandleScrollEvent);

        return () => {
            elementContext && elementContext.removeEventListener('scroll', throttledHandleScrollEvent);
        };
    }, [isClientSide, elementContext]);

    useEffect(() => {
        isClientSide && withContext && window.addEventListener('scroll', throttledHandleScrollEvent);

        return () => {
            window.removeEventListener('scroll', throttledHandleScrollEvent);
        };
    }, [isClientSide]);

    return {
        scrollState,
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
    const scrollState = useScrollState({ listenerInterval: SCROLL_INTERVAL, stateInterval: SCROLL_INTERVAL, withContext: true, ...props });

    return (
        <ScrollContext.Provider value={scrollState}>
            {props.children}
        </ScrollContext.Provider>
    );
};
