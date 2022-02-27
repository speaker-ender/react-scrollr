import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type IObserverState = Partial<ReturnType<typeof useObserverState>>;

export const ObserverContext = createContext<IObserverState | null>(
    null
);

export const useObserverState = () => {
    const [inViewObserver, setInViewObserver] = useState<IntersectionObserver>(null!);

    useEffect(() => {
        if (!inViewObserver) {
            const observerOptions = {
                rootMargin: '-90px 0px -10% 0px',
                thresholds: [0]
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

            if (entry.isIntersecting) {
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

export const ObserverContextProvider: React.FC = ({ children }) => {
    const observerState = useObserverState();

    return (
        <ObserverContext.Provider value={observerState}>
            {children}
        </ObserverContext.Provider>
    );
};
