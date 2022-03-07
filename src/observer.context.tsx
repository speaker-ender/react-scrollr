import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

export type IObserverOptions = {
    rootMargin?: string;
    root?: Element | Document | null;
}

export type IObserverState = Partial<ReturnType<typeof useObserverState>>;

type IObserverContext = IObserverState & IObserverOptions;

export const ObserverContext = createContext<IObserverContext | null>(
    null
);

export type InViewCallback = {
    callback: () => void;
    element: Element;
};

export interface IObserverContextProvider extends IObserverOptions { }

export const useObserverState = (props: IObserverOptions) => {
    const [inViewObserver, setInViewObserver] = useState<IntersectionObserver>(null!);
    const inViewCallbacks = useRef<InViewCallback[]>([]);

    const registerInViewCallback = useCallback(
        (inViewCallback: InViewCallback) => {
            inViewCallbacks.current = ([...inViewCallbacks.current, inViewCallback]);
        },
        [inViewCallbacks.current]
    );

    const unregisterInViewCallback = useCallback(
        (inViewCallback: InViewCallback) => {
            inViewCallbacks.current = inViewCallbacks.current.filter(callback => callback !== inViewCallback);
        },
        [inViewCallbacks.current]
    );

    useEffect(() => {
        if (!inViewObserver) {
            const observerOptions: IntersectionObserverInit = {
                root: props.root || null,
                rootMargin: props.rootMargin || '-90px 0px -10% 0px',
                threshold: [0]
            };

            setInViewObserver(new IntersectionObserver(updateElementInView, observerOptions));
        }

        return () => {
            !!inViewObserver && inViewObserver.disconnect();
        };
    }, [setInViewObserver]);

    const updateElementInView = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
            if (entry.isIntersecting) {
                const inViewNode = entry.target;
                // inViewNode.classList.add('in-view--visible');
                const callbackObject = inViewCallbacks.current.find((object) => object.element == inViewNode);

                if (!!callbackObject) {
                    callbackObject.callback();
                    unregisterInViewCallback(callbackObject);
                }

                observer.unobserve(inViewNode);
            }
        });
    };

    const registerElementInView = useCallback(
        (inViewElementRef: HTMLElement, callback?: () => void) => {
            if (!!inViewObserver && !!inViewElementRef) {
                inViewObserver.observe(inViewElementRef);
                inViewElementRef.classList.add('in-view');

                callback && registerInViewCallback({ callback: callback, element: inViewElementRef });
            }
        },
        [inViewObserver, registerInViewCallback]
    );

    const unregisterElementInView = useCallback(
        (inViewElementRef: HTMLElement) => {
            !!inViewObserver && !!inViewElementRef && inViewObserver.unobserve(inViewElementRef);
        },
        [inViewObserver]
    );

    return {
        inViewObserver,
        registerElementInView,
        unregisterElementInView,
    };
}

export const useObserverContext = () => {
    const observerContext = useContext(ObserverContext);

    if (!observerContext) {
        throw new Error(
            'Observer Context used outside of ObserverContext.Provider'
        );
    }

    return observerContext;
};

export const ObserverContextProvider: React.FC<IObserverContextProvider> = (props) => {
    const observerState = useObserverState(props);

    return (
        <ObserverContext.Provider value={observerState}>
            {props.children}
        </ObserverContext.Provider>
    );
};
