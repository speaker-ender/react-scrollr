import * as React from 'react';
import { StyledInView, TransitionStyles } from './inViewComponent.styles';
import { useObserverContext } from './observer.context';

export interface IInViewComponent {
    transitionStyle?: TransitionStyles;
    untrackOnCallback?: boolean;
}

export const InViewComponent: React.FC<IInViewComponent> = props => {
    const { registerInViewElement, unregisterInViewElement, inViewObserver } = useObserverContext();
    const [isInView, setIsInView] = React.useState(false);
    const inViewElementRef = React.useRef<HTMLDivElement>(null);

    const inViewCallback = React.useCallback((isIntersecting: boolean, threshold: number) => {
        setIsInView(threshold > 0.2 && isIntersecting);
    }, [setIsInView])

    React.useEffect(() => {
        !!inViewElementRef.current && !!registerInViewElement && registerInViewElement({
            element: inViewElementRef.current as HTMLElement,
            callback: inViewCallback,
        });

        return () => {
            !!inViewElementRef.current && !!unregisterInViewElement && unregisterInViewElement({
                element: inViewElementRef.current as HTMLElement,
                callback: inViewCallback
            });
        };
    }, [inViewElementRef, inViewObserver]);

    return (
        <StyledInView transitionStyle={props.transitionStyle} ref={inViewElementRef} inView={isInView}>
            {props.children}
        </StyledInView>
    );
};
