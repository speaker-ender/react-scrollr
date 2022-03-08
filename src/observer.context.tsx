import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

export type IObserverOptions = {
    rootMargin?: string;
    root?: Element | Document | null;
    threshold?: number[];
}

export type IObserverState = Partial<ReturnType<typeof useObserverState>>;

type IObserverContext = IObserverState & IObserverOptions;

export const ObserverContext = createContext<IObserverContext | null>(
    null
);

export type IInViewElement = {
    callback: (isIntersecting: boolean, threshold: number) => void;
    untrackOnCallback?: boolean;
    element: Element;
};

export interface IObserverContextProvider extends IObserverOptions { }

export const useObserverState = (props: IObserverOptions) => {
    const [inViewObserver, setInViewObserver] = useState<IntersectionObserver>(null!);
    const inViewElements = useRef<IInViewElement[]>([]);

    useEffect(() => {
        if (!inViewObserver) {
            const observerOptions: IntersectionObserverInit = {
                root: props.root || null,
                rootMargin: props.rootMargin || '-90px 0px -10% 0px',
                threshold: props.threshold || [0],
            };

            setInViewObserver(new IntersectionObserver(updateElementInView, observerOptions));
        }

        return () => {
            !!inViewObserver && inViewObserver.disconnect();
        };
    }, [setInViewObserver]);

    const updateElementInView = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {

        entries.forEach((entry: IntersectionObserverEntry) => {
            const inViewNode = entry.target;
            const callbackObject = inViewElements.current.find((object) => object.element == inViewNode);

            if (!!callbackObject) {
                callbackObject.callback(entry.isIntersecting, entry.intersectionRatio);

                if (entry.isIntersecting && callbackObject.untrackOnCallback) {
                    callbackObject.untrackOnCallback && unregisterInViewElement(callbackObject);
                    observer.unobserve(inViewNode);
                }
            }
        });
    };

    const registerInViewElement = useCallback(
        (inViewElement: IInViewElement) => {
            if (!!inViewObserver && !!inViewElement.element) {
                inViewObserver.observe(inViewElement.element);
                inViewElements.current = ([...inViewElements.current, inViewElement]);
            }
        },
        [inViewObserver, inViewElements.current]
    );

    const unregisterInViewElement = useCallback(
        (inViewElement: IInViewElement) => {
            !!inViewObserver && !!inViewElement.element && inViewObserver.unobserve(inViewElement.element);
            inViewElements.current = inViewElements.current.filter(element => element !== inViewElement);
        },
        [inViewObserver, inViewElements.current]
    );

    return {
        inViewObserver,
        registerInViewElement,
        unregisterInViewElement,
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
