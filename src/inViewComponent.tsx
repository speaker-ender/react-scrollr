import { useClientHook } from '@speaker-ender/react-ssr-tools';
import * as React from 'react';
import { useCallback, useEffect } from 'react';
import { usePrevious } from './helpers/hooks';
import { StyledInView, TransitionStyles } from './inViewComponent.styles';
import { useObserverContext } from './observer.context';

export interface IInViewComponent {
    transitionStyle?: TransitionStyles;
    untrackOnCallback?: boolean;
}

export const InViewComponent: React.FC<IInViewComponent> = props => {
    const isClient = useClientHook();
    const { registerInViewElement, unregisterInViewElement, inViewObserver } = useObserverContext();
    const [isInView, setIsInView] = React.useState(false);
    const inViewElementRef = React.useRef<HTMLDivElement>(null);
    const prevElementRef = usePrevious<HTMLDivElement | null>(inViewElementRef.current);

    const inViewCallback = React.useCallback((isIntersecting: boolean, threshold: number) => {
        setIsInView(threshold > 0.2 && isIntersecting);
    }, [setIsInView])

    useEffect(() => {
        !!isClient && !!registerInViewElement && registerInViewElement({
            element: inViewElementRef.current as HTMLElement,
            callback: inViewCallback,
            untrackOnCallback: props.untrackOnCallback
        });

    }, [isClient, inViewElementRef.current]);

    useEffect(() => {

        return () => {
            !!unregisterInViewElement && unregisterInViewElement({
                element: inViewElementRef.current || prevElementRef as HTMLElement,
                callback: inViewCallback,
                untrackOnCallback: props.untrackOnCallback
            });
        };
    }, []);

    return (
        <StyledInView transitionStyle={props.transitionStyle} ref={inViewElementRef} inView={isInView}>
            {props.children}
        </StyledInView>
    );
};
