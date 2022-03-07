import * as React from 'react';
import { StyledInView, TransitionStyles } from './inViewComponent.styles';
import { useObserverContext } from './observer.context';

export interface IInViewComponent {
    transitionStyle?: TransitionStyles;
}

export const InViewComponent: React.FC<IInViewComponent> = props => {
    const { registerElementInView, unregisterElementInView, inViewObserver } = useObserverContext();
    const [isInView, setIsInView] = React.useState(false);
    const inViewElementRef = React.useRef<HTMLDivElement>(null);

    const inViewCallback = React.useCallback(() => {
        setIsInView(true);
    }, [setIsInView])

    React.useEffect(() => {
        !!inViewObserver && inViewElementRef.current && registerElementInView && registerElementInView(inViewElementRef.current as HTMLElement, inViewCallback);

        return () => {
            inViewElementRef.current && unregisterElementInView && unregisterElementInView(inViewElementRef.current as HTMLElement);
        };
    }, [inViewElementRef, inViewObserver]);

    return (
        <StyledInView transitionStyle={props.transitionStyle} ref={inViewElementRef} inView={isInView}>
            {props.children}
        </StyledInView>
    );
};
