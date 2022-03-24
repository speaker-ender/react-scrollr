import { useClientHook } from '@speaker-ender/react-ssr-tools';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { usePrevious } from './helpers/hooks';
import { StyledInView, TransitionStyles } from './inViewComponent.styles';
import { InViewCallback, useObserverContext } from './observer.context';

export interface IInViewComponent {
    transitionStyle?: TransitionStyles;
    threshold?: number;
    callback?: InViewCallback;
    untrackOnCallback?: boolean;
}

export const InViewComponent: React.FC<IInViewComponent> = props => {
    const isClient = useClientHook();
    const threshold = props.threshold !== undefined ? props.threshold : 0.2;
    const { registerInViewElement, unregisterInViewElement } = useObserverContext();
    const [isInView, setIsInView] = useState(false);
    const inViewElementRef = useRef<HTMLDivElement>(null);
    const prevElementRef = usePrevious<HTMLDivElement | null>(inViewElementRef.current);

    const inViewCallback = React.useCallback((isIntersecting: boolean, currentThreshold: number) => {
        const newInView = currentThreshold >= threshold && isIntersecting;

        setIsInView(newInView);

        !!props.callback && props.callback(isIntersecting, currentThreshold);

        !!newInView && !!props.untrackOnCallback && !!unregisterInViewElement && unregisterInViewElement({
            element: inViewElementRef.current || prevElementRef as HTMLElement,
            callback: inViewCallback,
        })
    }, [setIsInView, isInView, unregisterInViewElement, inViewElementRef.current, prevElementRef])

    useEffect(() => {
        !!isClient && !!registerInViewElement && registerInViewElement({
            element: inViewElementRef.current as HTMLElement,
            callback: inViewCallback,
        });

    }, [isClient, inViewElementRef.current]);

    useEffect(() => {

        return () => {
            !!unregisterInViewElement && unregisterInViewElement({
                element: inViewElementRef.current || prevElementRef as HTMLElement,
                callback: inViewCallback,
            });
        };
    }, []);

    return (
        <StyledInView transitionStyle={props.transitionStyle} ref={inViewElementRef} inView={isInView}>
            {props.children}
        </StyledInView>
    );
};
