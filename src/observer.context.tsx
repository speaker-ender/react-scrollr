import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type IObserverOptions = {
    rootMargin?: string;
    root?: Element | Document | null;
}

export type IObserverState = Partial<ReturnType<typeof useObserverState>>;

type IObserverContext = IObserverState & IObserverOptions;

export const ObserverContext = createContext<IObserverContext | null>(
    null
);

export interface IObserverContextProvider extends IObserverOptions { }

export const useObserverState = (props: IObserverOptions) => {
    const [inViewObserver, setInViewObserver] = useState<IntersectionObserver>(null!);

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
                inViewNode.classList.add('in-view--visible');
                observer.unobserve(inViewNode);
            }
        });
    };

    const registerElementInView = useCallback(
        (inViewElementRef: HTMLElement) => {
            if (!!inViewObserver && !!inViewElementRef) {
                inViewObserver.observe(inViewElementRef);
                inViewElementRef.classList.add('in-view');
            }
        },
        [inViewObserver]
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
